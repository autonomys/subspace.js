import {
  typesBundle as subspaceTypesBundle,
  types as subspaceTypes,
  typesAlias as subspaceTypeAlias,
  rpc as subspaceRpc
} from '@subspace/type-definitions';

import {
  OverrideBundleType,
  OverrideModuleType,
  RegistryTypes,
  DefinitionRpc,
  DefinitionRpcSub
} from '@polkadot/types/types';

import './interfaces/augment-api';
import './interfaces/augment-api-consts';
import './interfaces/augment-api-query';
import './interfaces/augment-api-rpc';
import './interfaces/augment-api-tx';
import './interfaces/augment-types';

export const types: RegistryTypes = subspaceTypes;

export const rpc: Record<string, Record<string, DefinitionRpc | DefinitionRpcSub>> = subspaceRpc;

export const typesAlias: Record<string, OverrideModuleType> = subspaceTypeAlias;

export const typesBundle = subspaceTypesBundle as unknown as OverrideBundleType;
