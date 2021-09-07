/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { OverrideVersionedType } from '@polkadot/types/types';
import { rpc as ormlRpc, types as ormlTypes, typesAlias as ormlAlias } from '@open-web3/orml-type-definitions';
import { jsonrpcFromDefs, typesAliasFromDefs, typesFromDefs } from '@open-web3/orml-type-definitions/utils';

import poC from './poC';
import offencesPoC from './offencesPoc';

import subspaceVersioned from './spec/subspace';

const subspaceDefs = {
  poC,
  offencesPoC
};

export const types = {
  ...ormlTypes,
  ...typesFromDefs(subspaceDefs)
};

export const rpc = jsonrpcFromDefs(subspaceDefs, { ...ormlRpc });
export const typesAlias = typesAliasFromDefs(subspaceDefs, { ...ormlAlias });

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
