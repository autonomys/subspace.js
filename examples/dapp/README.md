# Dapp example.

This example uses subspace.js to:

- Load Identity using **web3Accounts** (Polkadot{.js} extension).

  - Create an `Identity` from the injected account.
  - Generate a `SubspaceClient` and load the `Identity` from the extension.
  - Connects to the Subspace network.

- Put Object:

  - Load an image file from the dapp.
  - Send the image to the network calling `putObject`.
  - Receives the `objectId` from the previous call.

- Get Object:

  - Send the `objectId` to the network calling `getObject`.
  - Receives the `Object` from the previous call.
    _Note, the call will return `object not found` until the next block archive process runs. It could take some minutes to get the object from the store._

- Show the image obtained from `getObject`.

# Install

Install dependencies:

`npm ci`

# Run

Run the example:

`npm start`

## Connecting to the network

You can use the `.env` file to configure the providers endoints, if .env is not present the SubspaceClient will use the default endpoints to localhost.

```
REACT_APP_NODE_WS_PROVIDER=ws://localhost:9944
REACT_APP_FARMER_WS_PROVIDER=ws://localhost:9955
```

Or you can connect to the public test network.

```
REACT_APP_NODE_WS_PROVIDER=wss://test-rpc.subspace.network
REACT_APP_FARMER_WS_PROVIDER=wss://test-rpc.subspace.network/farmer-rpc
```
