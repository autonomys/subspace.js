import { SubspaceClient, Identity } from "@subspace/subspace";
import { promises as fs } from "fs";

const NODE_WS_PROVIDER = "ws://localhost:9944";
const FARMER_WS_PROVIDER = "ws://localhost:9955";
const suri = "//Alice";

const data = await fs.readFile("./sample-input.jpg");
const objectData = new Uint8Array(data);

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
// Please, note: Archivation takes 100-120 blocks to complete, the object is not retrievable right away
const object: Uint8Array = await subspaceClient.getObject(objectId);

// Write the file as a copy from the original
await fs.writeFile("./sample-from-objectStore.jpg", object, {});
console.log("writeFile ./sample-from-objectStore.jpg");
