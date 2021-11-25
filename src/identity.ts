import { Keyring } from "@polkadot/api";
import { KeyringPair } from "@polkadot/keyring/types";
import { cryptoWaitReady } from "@polkadot/util-crypto";
import { Keypair, KeypairType } from "@polkadot/util-crypto/types";

export class Identity {
  public static fromUri = async (seed: string): Promise<Identity | Error> => {
    return new Promise((resolve, reject) => {
      cryptoWaitReady()
        .then(() => {
          const keyring = new Keyring({ ss58Format: 2254, type: "sr25519" });
          const keypair = keyring.addFromUri(seed, null, keyring.type);
          resolve(new Identity(keypair));
        })
        .catch((e: Error) => {
          reject(e);
        });
    });
  };

  public static fromAddress = async (
    address: string
  ): Promise<Identity | Error> => {
    return new Promise((resolve, reject) => {
      cryptoWaitReady()
        .then(() => {
          const keyring = new Keyring({ ss58Format: 2254, type: "sr25519" });
          const keypair = keyring.addFromAddress(
            address,
            null,
            null,
            keyring.type
          );
          resolve(new Identity(keypair));
        })
        .catch((e: Error) => {
          reject(e);
        });
    });
  };

  public static fromPair = async (
    pair: Keypair
  ): Promise<Identity | undefined> => {
    return new Promise((resolve, reject) => {
      cryptoWaitReady()
        .then(() => {
          const keyring = new Keyring({ ss58Format: 2254, type: "sr25519" });
          const keypair = keyring.addFromPair(pair, null, keyring.type);
          resolve(new Identity(keypair));
        })
        .catch((err) => {
          reject();
        });
    });
  };

  private constructor(private readonly keypair: KeyringPair) {}

  public publicKey(): Uint8Array {
    return this.keypair.publicKey;
  }

  public keyPair(): KeyringPair {
    console.log(this.keypair);
    return this.keypair;
  }

  public address(): string {
    console.log(this.keypair.address);
    return this.keypair.address;
  }

  public sign(data: Uint8Array): Uint8Array {
    return this.keypair.sign(data);
  }
}
