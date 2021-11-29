# Node js example.

This example uses subspace.js to:

- Load Identity.

  - Create an `Identity` from a sample account.
  - Generate a `SubspaceClient` and load the `Identity` from the sample account.
  - Connects to the Subspace network.

- Put Object:

  - Load a sample `Object` data (`sample-input.jpg`) as an array of bytes.
  - Send the `Object` to the network calling `putObject`.
  - Receives the `objectId` from the previus call.

- Get Object:

  - Send the `objectId` to the network calling `getObject`.
  - Receives the `Object` from the previus call.

- Write the file to disk `sample-from-objectStore.jpg`.

# Install

Install dependencies:

`npm i`

# Build

Generate the build in `dist` folder.:

`npm run build`

# Run

Run the example:

`npm run start`

```javascript
// Generate an Identity, we create from a random account for this example.
const identity = await Identity.fromUri(mnemonic);

// Generate a SubspaceClient and connect to node and farmer rpc endpoints.
const subspaceClient = await SubspaceClient.connect(
  identity,
  NODE_WS_PROVIDER,
  FARMER_WS_PROVIDER
);

// Put the file as (Uint8Array) in to the objectStore and return the objectId
const objectId: string = await subspaceClient.putObject(objectData);
console.log("objectId", objectId);

// Using the objectId get the file as (Uint8Array) from the objectStore.
const object: Uint8Array = await subspaceClient.getObject(objectId);

// Write the file as a copy from the original
fs.writeFile("./sample-from-objectStore.png", object, {}, () => {
  console.log("writeFile ./sample-from-objectStore.jpg");
});
```
