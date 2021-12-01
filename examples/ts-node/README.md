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
