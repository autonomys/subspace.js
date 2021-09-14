// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { Bytes, Option, Vec, u32, u64 } from '@polkadot/types';
import type { AnyNumber, ITuple, Observable } from '@polkadot/types/types';
import type { MaybeRandomness, NextConfigDescriptor, Randomness } from '@polkadot/types/interfaces/babe';
import type { Kind, OffenceDetails, OpaqueTimeSlot, ReportIdOf } from '@polkadot/types/interfaces/offences';
import type { FarmerId, PoCEpochConfiguration } from '@subspace/types/interfaces/poC';
import type { BlockNumber, Slot } from '@subspace/types/interfaces/runtime';
import type { ApiTypes } from '@polkadot/api/types';

declare module '@polkadot/api/types/storage' {
  export interface AugmentedQueries<ApiType> {
    offencesPoC: {
      /**
       * A vector of reports of the same kind that happened at the same time slot.
       **/
      concurrentReportsIndex: AugmentedQuery<ApiType, (arg1: Kind | string | Uint8Array, arg2: OpaqueTimeSlot | string | Uint8Array) => Observable<Vec<ReportIdOf>>, [Kind, OpaqueTimeSlot]> & QueryableStorageEntry<ApiType, [Kind, OpaqueTimeSlot]>;
      /**
       * The primary structure that holds all offence records keyed by report identifiers.
       **/
      reports: AugmentedQuery<ApiType, (arg: ReportIdOf | string | Uint8Array) => Observable<Option<OffenceDetails>>, [ReportIdOf]> & QueryableStorageEntry<ApiType, [ReportIdOf]>;
      /**
       * Enumerates all reports of a kind along with the time they happened.
       * 
       * All reports are sorted by the time of offence.
       * 
       * Note that the actual type of this mapping is `Vec<u8>`, this is because values of
       * different types are not supported at the moment so we are doing the manual serialization.
       **/
      reportsByKindIndex: AugmentedQuery<ApiType, (arg: Kind | string | Uint8Array) => Observable<Bytes>, [Kind]> & QueryableStorageEntry<ApiType, [Kind]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    poC: {
      /**
       * This field should always be populated during block processing.
       * 
       * It is set in `on_initialize`, before it will contain the value from the last block.
       **/
      authorPorRandomness: AugmentedQuery<ApiType, () => Observable<MaybeRandomness>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * A set of blocked farmers keyed by their public key.
       **/
      blockList: AugmentedQuery<ApiType, (arg: FarmerId | string | Uint8Array) => Observable<Option<ITuple<[]>>>, [FarmerId]> & QueryableStorageEntry<ApiType, [FarmerId]>;
      /**
       * Current slot number.
       **/
      currentSlot: AugmentedQuery<ApiType, () => Observable<Slot>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Current eon index.
       **/
      eonIndex: AugmentedQuery<ApiType, () => Observable<u64>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The configuration for the current epoch. Should never be `None` as it is initialized in genesis.
       **/
      epochConfig: AugmentedQuery<ApiType, () => Observable<Option<PoCEpochConfiguration>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Current epoch index.
       **/
      epochIndex: AugmentedQuery<ApiType, () => Observable<u64>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The block numbers when the last and current epoch have started, respectively `N-1` and
       * `N`.
       * NOTE: We track this is in order to annotate the block number when a given pool of
       * entropy was fixed (i.e. it was known to chain observers). Since epochs are defined in
       * slots, which may be skipped, the block numbers may not line up with the slot numbers.
       **/
      epochStart: AugmentedQuery<ApiType, () => Observable<ITuple<[BlockNumber, BlockNumber]>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The solution range for *current* era.
       **/
      eraStartSlot: AugmentedQuery<ApiType, () => Observable<Option<Slot>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The slot at which the first epoch actually started. This is 0
       * until the first block of the chain.
       **/
      genesisSlot: AugmentedQuery<ApiType, () => Observable<Slot>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Temporary value (cleared at block finalization) which is `Some`
       * if per-block initialization has already been called for current block.
       **/
      initialized: AugmentedQuery<ApiType, () => Observable<Option<MaybeRandomness>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * How late the current block is compared to its parent.
       * 
       * This entry is populated as part of block execution and is cleaned up
       * on block finalization. Querying this storage entry outside of block
       * execution context should always yield zero.
       **/
      lateness: AugmentedQuery<ApiType, () => Observable<BlockNumber>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The configuration for the next epoch, `None` if the config will not change
       * (you can fallback to `EpochConfig` instead in that case).
       **/
      nextEpochConfig: AugmentedQuery<ApiType, () => Observable<Option<PoCEpochConfiguration>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Next epoch randomness.
       **/
      nextRandomness: AugmentedQuery<ApiType, () => Observable<Randomness>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Pending epoch configuration change that will be applied when the next epoch is enacted.
       **/
      pendingEpochConfigChange: AugmentedQuery<ApiType, () => Observable<Option<NextConfigDescriptor>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The epoch randomness for the *current* epoch.
       * 
       * # Security
       * 
       * This MUST NOT be used for gambling, as it can be influenced by a
       * malicious validator in the short term. It MAY be used in many
       * cryptographic protocols, however, so long as one remembers that this
       * (like everything else on-chain) it is public. For example, it can be
       * used where a number is needed that cannot have been chosen by an
       * adversary, for purposes such as public-coin zero-knowledge proofs.
       **/
      randomness: AugmentedQuery<ApiType, () => Observable<Randomness>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Salt for *current* eon.
       **/
      salt: AugmentedQuery<ApiType, () => Observable<u64>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Randomness under construction.
       * 
       * We make a tradeoff between storage accesses and list length.
       * We store the under-construction randomness in segments of up to
       * `UNDER_CONSTRUCTION_SEGMENT_LENGTH`.
       * 
       * Once a segment reaches this length, we begin the next one.
       * We reset all segments and return to `0` at the beginning of every
       * epoch.
       **/
      segmentIndex: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The solution range for *current* era.
       **/
      solutionRange: AugmentedQuery<ApiType, () => Observable<Option<u64>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * TWOX-NOTE: `SegmentIndex` is an increasing integer, so this is okay.
       **/
      underConstruction: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Vec<Randomness>>, [u32]> & QueryableStorageEntry<ApiType, [u32]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
  }

  export interface QueryableStorage<ApiType extends ApiTypes> extends AugmentedQueries<ApiType> {
    [key: string]: QueryableModuleStorage<ApiType>;
  }
}
