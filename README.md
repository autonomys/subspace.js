# Subspace.js

This JavaScript library provides a simple API to submit and retrieve user data to the [Subspace network](https://subspace.network/). The project is in active development with a [live test network](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Ftest-rpc.subspace.network#/explorer). The network is designed to provide scalable and distributed archival storage.

# Storage API.

The Storage API exposes a simple way to consume _put_, and _get_ methods from a Subspace node feature called [pallet-object-store](https://github.com/subspace/subspace/tree/main/crates/pallet-object-store)
This pallet implements a simple object-store and two public RPC methods described in the next section.

## pallet-object-store.

Implements RPC methods to store an **Object** from user-provided **data**. The user can send a simple text or even a file; the `pallet-object-store` receives an **Object** to store and generate an **objectId**.

- **put**: Receive a signed transaction containing **data** as an array of bytes. If an **Object** is stored, a `data submitted event` will emit to the network message with **objectId** to get the **Object** from the **findObject** RPC method.

- **findObject**: A farmer node rpc call that will return an stored **Object** using and **objectId**.

## Polkadot.js and Subspace.js.

To communicate with any substrate-based chain, at least **two** components are required.

1. `WSPovider and ApiPromise`: RPC client to connect to the network. The **@polkadot/api** package exposes an entirely promise-based implementation of RPC methods for any substrate-based chain.

2. `KeyPair`: Public and private key pairs can to **sign** and **send** transactions to the network.
   There are two different use cases to load a **keyPair**: a **Dapp** (User Interface) and a backend service like \*_Node.js._

- 2.1 `@polkadot/extension-dapp and @polkadot/ui-keyring`

  Load a **keyPair** to be used on a Dapp using an injected **web3Account\*.
  The app user can sign and securely send transactions using for example, a browser extension like **[Polkadot{.js} extension](https://github.com/polkadot-js/extension)**. **[@polkadot/extension-dapp] and [@polkadot/ui-keyring]\*\* packages are used to integrate a dapp with the extension.

- 2.2 `@polkadot/keyring@`

  A **KeyPair** can be used from a node.js server to sign and send transactions with no human interaction **@polkadot/keyring** package allows to load and store **keyPairs**.
  The user will need to load an account from a mnemonic phrase or seed.

## Subspace.js

This project uses these **Polkadot.js** libraries to wrap and **expose** specific methods related to the _Storage API._

- **Identity**: Expose a simple way to create a **keyPair** from different sources. We need this to create a **SubspaceClient**.

  - `fromWeb3`: Creates an **Identity** instance from `web3Accounts` using @polkadot/extension-dapp.

  - `fromUri`: Creates an **Identity** from a secret URI, Example: `//Alice///password` or a `mnemonic phrase`.

  - `fromKeyPair`: Creates an **Identity** from an explicit `publicKey/secreteKey` combination

- **SubspaceClient**: Expose methods connect to the network and call **put** and **findObject** functionalities for the [pallet-object-store](https://github.com/subspace/subspace/tree/main/crates/pallet-object-store).

  - `connect`: Create an `apiPromise` instance connected to a `client node` and a `WsProvider` instance to the `farmer node,` returning a **SubspaceClient** instance to call:

  - `putObject`: Receives **Object** data creating a message (**put**) to be signed and sent to the `client node`. Return an **objectId**.

  - `getObject`: Receives an **objectId** calling findObject rpc method to the `farmer node`. Return the **Object** data.

# Run this project.

Clone this repository: `git clone https://github.com/subspace/subspace.js.git`

Install dependencies

- `npm install`

Build the lib.

- `npm run build`

Run the examples.

- Check the examples folder for node.js and browser examples.
