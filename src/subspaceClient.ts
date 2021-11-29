import type { AddressOrPair } from "@polkadot/api/types";
import type { Signer } from "@polkadot/types/types";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { hexToU8a, u8aToHex } from "@polkadot/util";
import { Identity } from "./identity";
import { appSettings } from "./config";
import { web3FromSource } from "@polkadot/extension-dapp";

/**
 * @name SubspaceClient
 * @summary  The SubspaceClient class expose methods to
 * Put and Get an Object from Subspace network using the Storage API.
 */
export class SubspaceClient {
  /**
   * @name connect
   * @summary Connect to Subspace network RPC nodes to put and get objects using the Subspace Storage API.
   * @param identity A previously created Identity Object.
   * @param wsRpcEndpoint Optional, by default it will connect to a public Subspace client rpc node.
   * @param wsRpcEndpointFarmer Optional, by default it will connect to a public Subspace farmer rpc node.
   * @return Promise<SubspaceClient>
   */
  public static async connect(
    identity: Identity,
    wsRpcEndpoint?: string,
    wsRpcEndpointFarmer?: string
  ): Promise<SubspaceClient> {
    return new Promise<SubspaceClient>(async (resolve, reject) => {
      try {
        const farmerProvider = new WsProvider(
          wsRpcEndpointFarmer || appSettings.FARMER_PROVIDER_SOCKET
        );
        const provider = new WsProvider(
          wsRpcEndpoint || appSettings.PROVIDER_SOCKET
        );
        const api = await ApiPromise.create({
          provider,
        });

        resolve(new SubspaceClient(api, farmerProvider, identity));
      } catch (e) {
        reject(e.message);
      }
    });
  }

  private constructor(
    private readonly api: ApiPromise,
    private readonly farmerProvider: WsProvider,
    private readonly identity: Identity
  ) {}

  /**
   * @name setSigner
   * @summary Set the current api signer to use to submit extrinsics.
   * @description Set an external signer which will be used to sign extrinsic when account passed in is not KeyringPair
   * @param signer
   * @return boolean | any
   */
  public setSigner(signer: Signer): boolean | any {
    try {
      this.api.setSigner(signer);
      return true;
    } catch (e: any) {
      return e;
    }
  }

  /**
   * @name putObject
   * @summary Using a keypair from Identity Object, submit an extrinsic using objectStore module.
   * @param object an 8 bytes array that contains the data to store.
   * @return Promise<string> If the Object was successfully stored it return the objectId.
   * objectId can be used to retrieve the data with getObject method.
   */
  public async putObject(object: Uint8Array): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      const keyPair = this.identity.getKeyringPair();
      const locked: boolean = keyPair.isLocked;
      const account: AddressOrPair = locked ? keyPair.address : keyPair;

      if (keyPair.meta.source === "polkadot-js") {
        const source = keyPair.meta.source;
        const injected = await web3FromSource(source);
        this.setSigner(injected.signer);
      }

      this.api.tx.objectStore
        .put(u8aToHex(object))
        .signAndSend(account, ({ status, events, isError }) => {
          if (status.isInBlock) {
            for (const { event } of events) {
              if (
                event.method === "DataSubmitted" &&
                event.section === "objectStore"
              ) {
                resolve(event.data[1].toString().slice(2));
              }
            }
          } else if (isError) {
            reject(`isError: ${isError} isInBlock ${status.isInBlock}`);
          }
        });
    });
  }

  /**
   * @name getObject
   * @summary Find an Object in the objectStore, if exists return the Object data.
   * @param objectId An objectId created from putObject used to find and return the Object data.
   * @return Promise<Uint8Array> If the Object was found it return the Object data.
   */
  public async getObject(objectId: string): Promise<Uint8Array> {
    return new Promise<Uint8Array>(async (resolve, reject) => {
      this.farmerProvider.send("findObject", [objectId]).then(
        (result) => {
          if (result) {
            resolve(hexToU8a(result.data));
          } else {
            reject("Object not found");
          }
        },
        (reason) => {
          reject(reason);
        }
      );
    });
  }
}
