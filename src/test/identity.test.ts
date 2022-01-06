import { Identity } from "../subspace";
import * as tap from 'tap';

const suri = "//Alice";
const aliceAddress = 'stB4S14whneyomiEa22Fu2PzVoibMB7n5PvBFUwafbCbRkC1K';

tap.test('Identity Class', (t) => {
  tap.test('fromUri method should create and return an Identity instance from a seed string.', async (t) => {
    const identity = await Identity.fromUri(suri);
    t.ok(identity.getKeyringPair().address.toString() === aliceAddress);
  })

  tap.test('getKeyringPair should return stored account in a KeyringPair object', async (t) => {
    const identity = await Identity.fromUri(suri);
    const keyPair = identity.getKeyringPair();
    t.ok(keyPair.address, "keyPair.address should be defined");
  })

  tap.test('getKeyring should return all stored accounts in a Keyring object', async (t) => {
    const identity = await Identity.fromUri(suri);
    const keyring = identity.getKeyring();
    t.ok(keyring.getPairs(), "keyring.getPairs should be defined");
  })
  t.end();
});
