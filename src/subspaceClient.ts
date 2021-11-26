import type { AddressOrPair } from "@polkadot/api/types";
import type { Signer } from "@polkadot/types/types";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { hexToU8a, u8aToHex } from "@polkadot/util";
import { Identity } from "./identity";
import { appSettings } from "./config";

/**
 * @name SubspaceClient
 * @summary Expose methods to Put and Get an Object from Subspace network using the Storage API.
 */
export class SubspaceClient {
  /**
   * @name connect
   * @summary Connect to Subspace network rpc nodes to put and get objects using the Subspace Storage API.
   * @param identity an already generated Identity object containing a keyring and keypair.
   * @param wsRpcEndpoint optional, by default it will connect to a public Subspace client rpc node.
   * @param wsRpcEndpointFarmer optional, by default it will connect to a public Subspace farmer rpc node.
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

  public setSigner(signer: Signer): boolean | string {
    try {
      this.api.setSigner(signer);
      return true;
    } catch (e) {
      return e.message;
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
    return new Promise<string>((resolve, reject) => {
      const locked: boolean = this.identity.getKeyringPair().isLocked;
      const account: AddressOrPair = locked
        ? this.identity.getKeyringPair().address
        : this.identity.getKeyringPair();

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
