import { SubspaceClient, Identity } from "subspace.js";
import { promises as fs } from "fs";

const NODE_WS_PROVIDER = "ws://localhost:9944";
const FARMER_WS_PROVIDER = "ws://localhost:9955";
const suri = "//Alice";

(async () => {
  const data = await fs.readFile("./sample-input.jpg");
  await usage(new Uint8Array(data));
  process.exit(1);
})();

async function usage(objectData: Uint8Array) {
  // Generate an Identity, we create from a random account for this example.
  const identity = await Identity.fromUri(suri);

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
  await fs.writeFile("./sample-from-objectStore.jpg", object, {});
  console.log("writeFile ./sample-from-objectStore.jpg");
}
