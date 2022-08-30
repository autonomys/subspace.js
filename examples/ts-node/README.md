# Node js example.

This example uses subspace.js to:

- Load Identity.

  - Create an `Identity` from a sample account.
  - Generate a `SubspaceClient` and load the `Identity` from the sample account.
  - Connects to the Subspace network.

- Put Object:

  - Load a sample `Object` data (`sample-input.jpg`) as an array of bytes.
  - Send the `Object` to the network calling `putObject`.
  - Receives the `objectId` from the previous call.

- Get Object:

  - Send the `objectId` to the network calling `getObject`.
  - Receives the `Object` from the previous call.
    _Note, the call will return `object not found` until the next block archive process runs. It could take some minutes to get the object from the store._
- Write the file to disk `sample-from-objectStore.jpg`.

# Install

Install dependencies:

`npm ci`

# Build

Generate the build in `dist` folder.:

`npm run build`

# Run

Run the example:

`npm run start`

> Please, note: Archiving takes 100-120 blocks to complete, the object is not retrievable right away

## Connecting to the network

You can edit the `./scr/index.ts` file to configure the providers endoints.

```
const NODE_WS_PROVIDER = 'ws://localhost:9944'
const FARMER_WS_PROVIDER = 'ws://localhost:9944'
```

Or you can connect to the public test network.

```
const NODE_WS_PROVIDER = 'wss://test-rpc.subspace.network'
const FARMER_WS_PROVIDER = 'wss://test-rpc.subspace.network/farmer-rpc'
```
