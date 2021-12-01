# Html-js example

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

# Install dependencies.

Install `http-server` globally.

- `npm i -g http-server`

Check the main [README.md](/README.md) to build the library.

- The `build script` will generate and copy the `subspace.browser.js` file to the `./examples/html-js/src` folder.

# Run.

With the previous steps done, you can run the example:

From `./examples/html-js` folder run the following command:

- `http-server ./src -a localhost -p 3000`

This will start a `http://localhost:3000` to load the `index.html` and `subspace.browser.js` files.
