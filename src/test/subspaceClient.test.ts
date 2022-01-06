import { SubspaceClient, Identity } from "../subspace";
import * as fsp from 'fs/promises';
import * as tap from 'tap';

const NODE_WS_PROVIDER = "ws://localhost:9944";
const FARMER_WS_PROVIDER = "ws://localhost:9955";
const suri = "//Alice";

tap.test('SubspaceClient Class', async (t) => {
  const data = await fsp.readFile("./examples/ts-node/sample-input.jpg");
  const objectData = new Uint8Array(data);
  const identity = await Identity.fromUri(suri);

  tap.test('connect method should create a SubspaceClient instance.', async (t) => {
    const subspaceClient = await SubspaceClient.connect(
      identity,
      NODE_WS_PROVIDER,
      FARMER_WS_PROVIDER
    );
    await subspaceClient.disconnect();
    t.ok(subspaceClient, "SubspaceClient instance connected");
    t.end();
  })

  tap.test('putObject should return objectId', async (t) => {
    const subspaceClient = await SubspaceClient.connect(
      identity,
      NODE_WS_PROVIDER,
      FARMER_WS_PROVIDER
    );

    const objectId: string = await subspaceClient.putObject(objectData);
    t.ok(objectId, "objectId");

    tap.test('getObject should return object data for objectId', async (t) => {
      const object: Uint8Array = await subspaceClient.getObject(objectId);
      await subspaceClient.disconnect();
      t.ok(object, "object found");
      t.same(object, objectData, "both objects are the same");
      t.end();
    })
    t.end();
  })

  tap.test('getObject should reject if object is not found');
  
  t.end();
})

