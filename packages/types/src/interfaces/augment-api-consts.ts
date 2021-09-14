// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { u32, u64 } from '@polkadot/types';
import type { Codec, ITuple } from '@polkadot/types/types';
import type { Moment } from '@subspace/types/interfaces/runtime';
import type { ApiTypes } from '@polkadot/api/types';

declare module '@polkadot/api/types/consts' {
  export interface AugmentedConsts<ApiType> {
    poC: {
      /**
       * The amount of time, in slots, that each eon should last.
       * NOTE: Currently it is not possible to change the eon duration after
       * the chain has started. Attempting to do so will brick block production.
       **/
      eonDuration: u64 & AugmentedConst<ApiType>;
      /**
       * The amount of time, in slots, that each epoch should last.
       * NOTE: Currently it is not possible to change the epoch duration after
       * the chain has started. Attempting to do so will brick block production.
       **/
      epochDuration: u64 & AugmentedConst<ApiType>;
      /**
       * The amount of time, in blocks, that each era should last.
       * NOTE: Currently it is not possible to change the era duration after
       * the chain has started. Attempting to do so will brick block production.
       **/
      eraDuration: u32 & AugmentedConst<ApiType>;
      /**
       * The expected average block time at which PoC should be creating
       * blocks. Since PoC is probabilistic it is not trivial to figure out
       * what the expected average block time should be based on the slot
       * duration and the security parameter `c` (where `1 - c` represents
       * the probability of a slot being empty).
       **/
      expectedBlockTime: Moment & AugmentedConst<ApiType>;
      /**
       * Initial solution range used for challenges during the very first era.
       **/
      initialSolutionRange: u64 & AugmentedConst<ApiType>;
      /**
       * How often in slots slots (on average, not counting collisions) will have a block.
       * 
       * Expressed as a rational where the first member of the tuple is the
       * numerator and the second is the denominator. The rational should
       * represent a value between 0 and 1.
       **/
      slotProbability: ITuple<[u64, u64]> & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
  }

  export interface QueryableConsts<ApiType extends ApiTypes> extends AugmentedConsts<ApiType> {
    [key: string]: QueryableModuleConsts;
  }
}
