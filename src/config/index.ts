import { Web3AccountsOptions } from "@polkadot/extension-inject/types";
import { KeyringOptions } from "@polkadot/keyring/types";

// Default settings
// NODE_WS_PROVIDER and FARMER_WS_PROVIDER are overridden from the SubspaceClient.connect method
const appSettings = {
  APP_NAME: "Subspace.js | Storage API",
  NODE_WS_PROVIDER: "ws://localhost:9944",
  FARMER_WS_PROVIDER: "ws://localhost:9955",
};

const accountSettings: Web3AccountsOptions = {
  ss58Format: 2254,
  accountType: ["sr25519"],
};

const keyringOptions: KeyringOptions = {
  ss58Format: 2254,
  type: "sr25519",
};

export { appSettings, accountSettings, keyringOptions };
