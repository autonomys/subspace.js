import type { OverrideVersionedType } from '@polkadot/types/types';
import { jsonrpcFromDefs, typesAliasFromDefs, typesFromDefs } from '@open-web3/orml-type-definitions/utils';

import poC from './poC';
import offencesPoC from './offencesPoc';
import runtime from './runtime';

import subspaceVersioned from './spec/subspace';

/* TODO: Add Session Keys
const additionalOverride = {
  Keys: 'SessionKeys1'
};
*/

const subspaceDefs = {
  poC,
  offencesPoC,
  runtime
};

export const types = {
  ...typesFromDefs(subspaceDefs)
  // ...additionalOverride
};

export const rpc = jsonrpcFromDefs(subspaceDefs);
export const typesAlias = typesAliasFromDefs(subspaceDefs);

function getBundle(versioned: OverrideVersionedType[]) {
  return {
    rpc,
    types: [...versioned].map((version) => {
      return {
        minmax: version.minmax,
        types: {
          ...types,
          ...version.types
        }
      };
    }),
    alias: typesAlias
  };
}

export const typesBundle = {
  spec: {
    subspace: getBundle(subspaceVersioned)
  }
};

// Type overrides have priority issues
export const typesBundleForPolkadot = {
  spec: {
    subspace: getBundle(subspaceVersioned)
  }
};
