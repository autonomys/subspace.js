import { cryptoWaitReady } from "@polkadot/util-crypto";
import { Keyring } from "@polkadot/api";
import { KeyringPair } from "@polkadot/keyring/types";
import { Keypair } from "@polkadot/util-crypto/types";
import { appSettings, accountSettings, keyringOptions } from "./config";
import { NO_WEB3, CRYPTO_LOAD_FAIL, NO_ACCOUNT } from "./constants";

/**
 * @name Identity
 * @summary The Identity class is used to create a keyring and keypair from different sources.
 * @description
 * - Use fromWeb3 to generate an Identity from web3Accounts.
 *    For web apps using Polkadot.js extension.
 * - Use fromUri or fromPair to generate an Identity using given parameters.
 *    For node js scripts.
 */
export class Identity {
  /**
   * @name fromWeb3
   * @summary Creates an Identity instance from web3Accounts.
   * @description Load and store injected accounts in a keyring object.
   * using web3Accounts from @polkadot/extension-dapp.
   * @param address? Optional.
   * If the param is present, the method will set the default keypair linked to this address.
   * If it is not present, the method will set default keypair using the first account from web3Accounts.
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
      cryptoWaitReady()
        .then(async (ready) => {
          if (ready) {
            const isWeb3Enable = await web3Enable(appSettings.APP_NAME);
            if (!isWeb3Enable) reject(NO_WEB3);

            const allWeb3Accounts = await web3Accounts(accountSettings);
            if (!allWeb3Accounts || allWeb3Accounts.length === 0)
              reject(NO_ACCOUNT);

            const keyring = new Keyring(keyringOptions);
            allWeb3Accounts.forEach(({ address, meta }) => {
              keyring.addFromAddress(address, meta);
            });

            const keyringPair = address
              ? keyring.getPair(address)
              : keyring.getPairs()[0];

            resolve(new Identity(keyring, keyringPair));
          } else {
            reject(CRYPTO_LOAD_FAIL);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  /**
   * @name fromUri
   * @summary Creates an Identity from a secret uri.
   * @description SURI format for specifying secret keys.
   * <secret>/<soft-key>//<hard-key>///<password>`
   * `/<soft-key>` and `//<hard-key>` maybe repeated and mixed.
   * `///password` may be omitted.
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
            reject(CRYPTO_LOAD_FAIL);
          }
        })
        .catch((e: Error) => {
          reject(e.message);
        });
    });
  };

  /**
   * @name fromKeypair
   * @summary Creates an Identity from an explicit publicKey/secreteKey combination.
   * @description `
   * @param keyPair  an explicit publicKey/secreteKey combination.
   * KeyPair: `{ publicKey: '0x...', secretKey: '0x...' }`
   * @return Promise<Identity>
   */
  public static fromKeypair = async (keyPair: Keypair): Promise<Identity> => {
    return new Promise<Identity>((resolve, reject) => {
      cryptoWaitReady().then((ready) => {
        if (ready) {
          const keyring = new Keyring(keyringOptions);
          const keyringPair = keyring.addFromPair(keyPair, null, keyring.type);
          resolve(new Identity(keyring, keyringPair));
        } else {
          reject(CRYPTO_LOAD_FAIL);
        }
      });
    });
  };

  /**
   * @name constructor
   * @summary Creates an Identity instance.
   * @description Load and store injected accounts in a keyring object.
   * @param keyring  Keyring object.
   * @param keyringPair  KeyringPair object.
   * @return Identity
   */
  public constructor(
    private readonly keyring: Keyring,
    private readonly keyringPair: KeyringPair
  ) {}

  /**
   * @name getKeyringPair
   * @summary Returns the keyringPair object.
   * @return KeyringPair
   */
  public getKeyringPair(): KeyringPair {
    return this.keyringPair;
  }
  /**
   * @name getKeyring
   * @summary Returns the keyring object.
   * @return Keyring
   */
  public getKeyring(): Keyring {
    return this.keyring;
  }
}
