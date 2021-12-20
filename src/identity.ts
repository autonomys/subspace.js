import { cryptoWaitReady } from "@polkadot/util-crypto";
import { Keyring } from "@polkadot/api";
import { KeyringPair } from "@polkadot/keyring/types";
import { appSettings, accountSettings, keyringOptions } from "./config";

/**
 * @name Identity
 * @summary The Identity class is used to create a keyring and keypair from different sources.
 * @example
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
   * using web3Accounts from `@polkadot/extension-dapp`.
   * @param address Optional.
   * If the param is present, the method will set the default keypair linked to this address.
   * If it is not present, the method will set default keypair using the first account from web3Accounts.
   * @return Promise<Identity>
   */
  public static async fromWeb3(address?: string | Uint8Array): Promise<Identity> {
    if (await cryptoWaitReady()) {
      // import polkadot extension methods only if web3 is available (use only in browser context)
      const { web3Accounts, web3Enable } = await import(
        "@polkadot/extension-dapp"
      );
      const isWeb3Enable = await web3Enable(appSettings.APP_NAME,
        // In case the extension is still not injected in the window object.
        // we add compatInit array to await the extension.
        [() => new Promise<boolean>(resolve => setTimeout(() => resolve(true), 500))]);
      if (!isWeb3Enable) throw new Error("Web3 not enabled or available.");

      const allWeb3Accounts = await web3Accounts(accountSettings);
      if (!allWeb3Accounts || allWeb3Accounts.length === 0) throw new Error("No accounts available.");

      const keyring = new Keyring(keyringOptions);
      allWeb3Accounts.forEach(({ address, meta }) => {
        keyring.addFromAddress(address, meta);
      });

      const keyringPair = address
        ? keyring.getPair(address)
        : keyring.getPairs()[0];

      return new Identity(keyring, keyringPair);
    } else {
      throw new Error("Crypto wait ready failed.");
    }
  }
  /**
   * @name fromUri
   * @summary Creates an Identity from a secret uri.
   * @description SURI format for specifying secret keys `<secret>/<soft-key>//<hard-key>///<password>` (the `///password` may be omitted, and `/<soft-key>` and `//<hard-key>` maybe repeated and mixed).
   * The secret can be a hex string, mnemonic phrase or a string (to be padded)
   * @param suri Example: `//Alice///password` or a mnemonic phrase.
   * @return Promise<Identity>
   */
  public static async fromUri(suri: string): Promise<Identity> {
    if (await cryptoWaitReady()) {
      const keyring = new Keyring(keyringOptions);
      const keyringPair = keyring.addFromUri(suri, undefined, keyring.type);
      return new Identity(keyring, keyringPair);
    } else {
      throw new Error("Crypto wait ready failed");
    }
  }

  /**
   * @name constructor
   * @summary Creates an Identity instance.
   * @description Load and store injected accounts in a keyring object.
   * @param keyring  Keyring object.
   * @param keyringPair  KeyringPair object.
   * @return Identity
   */
  private constructor(
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
