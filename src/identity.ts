import { cryptoWaitReady } from "@polkadot/util-crypto";
import { Keyring } from "@polkadot/api";
import { KeyringPair } from "@polkadot/keyring/types";
import { Keypair } from "@polkadot/util-crypto/types";
import { appSettings, accountSettings, keyringOptions } from "./config";

/**
 * @name Identity
 * @summary Expose methods to create a keyring and keypair from different sources.
 * @description
 * Use fromWeb3 to generate an Identity from web3Accounts
 * (For web apps using Polkadot.js extension)
 * Use fromUri or fromPair to generate an Identity using given parameters.
 * (For node scripts)
 */
export class Identity {
  /**
   * @name fromWeb3
   * @summary Creates an Identity instance from web3Accounts.
   * @description Load and store injected accounts in a keyring object
   * using web3Accounts from @polkadot/extension-dapp
   * @param address? Optional.
   * If the param is present the method will set the default keypair linked to this address.
   * If is not present the method will set default keypair using the first account from web3Accounts.
   * @return Promise<Identity>
   */
  public static fromWeb3 = async (
    address?: string | Uint8Array
  ): Promise<Identity> => {
    return new Promise<Identity>(async (resolve, reject) => {
      // import polkadot extension methods only if web3 is available (use only in browser context)
      const { web3Accounts, web3Enable } = await import(
        "@polkadot/extension-dapp"
      );
      cryptoWaitReady().then(async (ready) => {
        if (ready) {
          const isWeb3Enable = await web3Enable(appSettings.APP_NAME);
          if (!isWeb3Enable) reject("Web3 not enabled or available.");

          const allWeb3Accounts = await web3Accounts(accountSettings);
          if (!allWeb3Accounts || allWeb3Accounts.length === 0)
            reject("No accounts available");

          const keyring = new Keyring(keyringOptions);
          allWeb3Accounts.forEach(({ address, meta }) => {
            keyring.addFromAddress(address, meta);
          });

          const keyringPair = address
            ? keyring.getPair(address)
            : keyring.getPairs()[0];

          resolve(new Identity(keyring, keyringPair));
        } else {
          reject("cryptoWaitReady failed");
        }
      });
    });
  };

  /**
   * @name fromUri
   * @summary Creates an Identity from a secret uri.
   * @description SURI format for specifying secret keys
   * <secret>/<soft-key>//<hard-key>///<password>`
   * `/<soft-key>` and `//<hard-key>` maybe repeated and mixed.
   * `///password` may be omitted
   * The secret can be a hex string, mnemonic phrase or a string (to be padded).
   * @param suri Example: `//Alice///password` or a mnemonic phrase.
   * @return Promise<Identity>
   */
  public static fromUri = async (suri: string): Promise<Identity> => {
    return new Promise<Identity>((resolve, reject) => {
      cryptoWaitReady()
        .then((ready) => {
          if (ready) {
            const keyring = new Keyring(keyringOptions);
            const keyringPair = keyring.addFromUri(suri, null, keyring.type);
            resolve(new Identity(keyring, keyringPair));
          } else {
            reject("cryptoWaitReady failed");
          }
        })
        .catch((e: Error) => {
          reject(e.message);
        });
    });
  };

  /**
   * @name fromKeypair
   * @summary Creates an Identity from an explicit publicKey/secreteKey combination
   * @description SURI format for specifying secret keys `
   */
  public static fromKeypair = async (keyPair: Keypair): Promise<Identity> => {
    return new Promise<Identity>((resolve, reject) => {
      cryptoWaitReady().then((ready) => {
        if (ready) {
          const keyring = new Keyring(keyringOptions);
          const keyringPair = keyring.addFromPair(keyPair, null, keyring.type);
          resolve(new Identity(keyring, keyringPair));
        } else {
          reject("cryptoWaitReady failed");
        }
      });
    });
  };

  public constructor(
    private readonly keyring: Keyring,
    private readonly keyringPair: KeyringPair
  ) {}

  public getKeyringPair(): KeyringPair {
    return this.keyringPair;
  }

  public getKeyring(): Keyring {
    return this.keyring;
  }
}
