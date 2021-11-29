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

- Show the image obtained from `getObject`.

# Install

Install dependencies:

`npm ci`

# Run

Run the example:

`npm start`
