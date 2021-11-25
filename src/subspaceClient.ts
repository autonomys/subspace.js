import { ApiPromise, WsProvider } from "@polkadot/api";
import { Identity } from "./identity";
import { Signer } from "@polkadot/types/types";

type Brand<K, T> = K & { __brand: T };
export type ObjectId = Brand<Uint8Array, "ObjectId">;

export class SubspaceClient {
  public static async connect(
    wsRpcEndpoint: string,
    farmerRpcEndpoint: string,
    identity: Identity
  ): Promise<SubspaceClient> {
    const provider = new WsProvider(wsRpcEndpoint);
    const farmerProvider = new WsProvider(farmerRpcEndpoint);
    const api = await ApiPromise.create({ provider });

    return new SubspaceClient(api, farmerProvider, identity);
  }

  private constructor(
    private readonly api: ApiPromise,
    private readonly farmerProvider: WsProvider,
    private readonly identity: Identity
  ) {}

  public setSigner(signer: Signer): void {
    this.api.setSigner(signer);
    return;
  }

  public async getRaw(objectId: Uint8Array): Promise<any | Error> {
    return new Promise<any>((resolve, reject) => {
      this.farmerProvider
        .send("findObject", [objectId.toString()])
        .then((result) => {
          if (result) resolve(result);
          else reject(new Error("Object not found"));
        })
        .catch((e: Error) => {
          console.log("error", e);
          reject(e);
        });
    });
  }

  public async putRaw(data: Uint8Array): Promise<any | Error> {
    return new Promise<any>((resolve, reject) => {
      let unsub: () => void;
      const locked = this.identity.keyPair().isLocked;

      this.api.tx.objectStore
        .put(data.toString())
        .signAndSend(
          locked ? this.identity.address() : this.identity.keyPair(),
          (result) => {
            if (result.isError) {
              reject(new Error(result.status.toString()));
              unsub();
            } else if (result.status.isInBlock) {
              result.events.forEach(({ event }) => {
                if (
                  event.method === "DataSubmitted" &&
                  event.section === "objectStore"
                ) {
                  resolve(event.data[1].toString());
                }
              });
              unsub();
            }
          }
        )
        .then((unsubLocal) => {
          unsub = unsubLocal;
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
}
