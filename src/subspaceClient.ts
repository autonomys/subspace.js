import type { AddressOrPair } from "@polkadot/api/types";
import type { Signer } from "@polkadot/types/types";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { hexToU8a, u8aToHex } from "@polkadot/util";
import { Identity } from "./identity";
import { appSettings } from "./config";

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
    const farmerProvider = new WsProvider(
      wsRpcEndpointFarmer || appSettings.FARMER_WS_PROVIDER
    );
    const provider = new WsProvider(
      wsRpcEndpoint || appSettings.NODE_WS_PROVIDER
    );
    const api = await ApiPromise.create({
      provider,
    });

    return new SubspaceClient(api, farmerProvider, identity);
  }

  private constructor(
    private readonly api: ApiPromise,
    private readonly farmerProvider: WsProvider,
    private readonly identity: Identity
  ) {}

 /**
 * @name disconnect
 * @summary method called to disconnect from the farmer and provider
 */
  public async disconnect(): Promise<boolean> {
    await Promise.all([
      this.api.disconnect(),
      this.farmerProvider.disconnect()]);
    return true;
  }
  /**
   * @name setSigner
   * @summary Set the current api signer to use to submit extrinsics.
   * @description Set an external signer which will be used to sign extrinsic when account passed in is not KeyringPair
   * @param signer
   * @return boolean
   */
  public setSigner(signer: Signer): void {
    return this.api.setSigner(signer);
  }

  /**
   * @name putObject
   * @summary Using a keypair from Identity Object, submit an extrinsic using objectStore module.
   * @param object an Uint8Array that contains the data to store.
   * @return Promise<string> If the Object was successfully stored it return the objectId.
   * objectId can be used to retrieve the data with getObject method.
   */
  public async putObject(object: Uint8Array): Promise<string> {
    const keyPair = this.identity.getKeyringPair();
    const locked: boolean = keyPair.isLocked;
    const account: AddressOrPair = locked ? keyPair.address : keyPair;
    // Run only if the keyPair was loaded from extension
    if (keyPair.meta && keyPair.meta.source === "polkadot-js") {
      const { web3FromSource } = await import("@polkadot/extension-dapp");
      const source = keyPair.meta.source;
      const injected = await web3FromSource(source);
      this.setSigner(injected.signer);
    }
    const result = await new Promise<string>((resolve, reject) => {
      this.api.tx.objectStore
        .put(u8aToHex(object))
        .signAndSend(account, ({ status, events, isError }) => {
          if (status.isInBlock) {
            for (const { event } of events) {
              if (
                event.method === "ObjectSubmitted" &&
                event.section === "objectStore"
              ) {
                resolve(event.data[1].toString().slice(2));
              }
            }
          } else if (isError) {
            reject(new Error(`isError: ${isError}`));
          }
        });
    });
    return result;
  }

  /**
   * @name getObject
   * @summary Find an Object in the objectStore, if exists return the Object data.
   * @param objectId An objectId created from putObject used to find and return the Object data.
   * @return Promise<Uint8Array> If the Object was found it return the Object data.
   */
  public async getObject(objectId: string): Promise<Uint8Array> {
    const result = await this.farmerProvider.send("findObject", [objectId])
    if (result) return (hexToU8a(result.data));
    throw new Error(`Object with id ${objectId} not found`);
  }
}
