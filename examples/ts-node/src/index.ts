import { SubspaceClient, Identity } from "subspace.js";
import { mnemonicGenerate } from "@polkadot/util-crypto";
import * as fs from "fs";

const NODE_WS_PROVIDER = process.env.NODE_WS_PROVIDER;
const FARMER_WS_PROVIDER = process.env.FARMER_WS_PROVIDER;
const mnemonic = mnemonicGenerate();

fs.readFile("./sample-input.jpg", {}, async (err, data) => {
  if (err) throw err;
  await usage(new Uint8Array(data));
});

async function usage(objectData: Uint8Array) {
  try {
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
  } catch (e) {
    console.error(e);
  }
}
