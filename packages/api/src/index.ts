import {
  rpc as subspaceRpc,
  types as subspaceTypes,
  typesAlias as subspaceTypeAlias,
  typesBundle as subspaceTypesBundle
} from '@subspace/types';

import { ApiOptions } from '@polkadot/api/types';

export const defaultOptions: ApiOptions = {
  types: subspaceTypes,
  rpc: subspaceRpc
};

export const options = ({
  rpc = {},
  types = {},
  typesBundle = {},
  typesAlias = {},
  ...otherOptions
}: ApiOptions = {}): ApiOptions => ({
  rpc: {
    ...subspaceRpc,
    ...rpc
  },
  types: {
    ...subspaceTypes,
    ...types
  },
  typesAlias: {
    ...subspaceTypeAlias,
    ...typesAlias
  },
  typesBundle: {
    ...typesBundle,
    spec: {
      ...subspaceTypesBundle
    }
  },
  ...otherOptions
});
