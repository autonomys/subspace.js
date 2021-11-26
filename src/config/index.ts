import * as dotenv from "dotenv";
import { Web3AccountsOptions } from "@polkadot/extension-inject/types";
import { KeyringOptions } from "@polkadot/ui-keyring/types";
dotenv.config();

const appSettings = {
  APP_NAME: "Subspace.js | Storage API",
  PROVIDER_SOCKET: process.env.PROVIDER_SOCKET || "ws://localhost:9944",
  FARMER_PROVIDER_SOCKET:
    process.env.FARMER_PROVIDER_SOCKET || "ws://localhost:9955",
};

const accountSettings: Web3AccountsOptions = {
  ss58Format: 2254,
  accountType: ["sr25519"],
};

const keyringOptions: KeyringOptions = {
  isDevelopment: true,
  ss58Format: 2254,
  type: "sr25519",
};

export { appSettings, accountSettings, keyringOptions };
