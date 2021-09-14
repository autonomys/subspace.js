// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Bytes, Enum, Option, Struct, U8aFixed, u32, u64 } from '@polkadot/types';
import type { ITuple } from '@polkadot/types/types';
import type { Signature } from '@polkadot/types/interfaces/extrinsics';
import type { AccountId, Header, Slot } from '@subspace/types/interfaces/runtime';

/** @name ConsensusLog */
export interface ConsensusLog extends Enum {
  readonly isPhantom: boolean;
  readonly isNextEpochData: boolean;
  readonly asNextEpochData: PoCNextEpochDescriptor;
  readonly isNextConfigData: boolean;
  readonly asNextConfigData: PoCNextConfigDescriptor;
  readonly isSolutionRangeData: boolean;
  readonly asSolutionRangeData: SolutionRangeDescriptor;
  readonly isSaltData: boolean;
  readonly asSaltData: SaltDescriptor;
  readonly isNextSolutionRangeData: boolean;
  readonly asNextSolutionRangeData: NextSolutionRangeDescriptor;
  readonly isNextSaltData: boolean;
  readonly asNextSaltData: NextSaltDescriptor;
}

/** @name EquivocationProof */
export interface EquivocationProof extends Struct {
  readonly offender: FarmerId;
  readonly slot: Slot;
  readonly first_header: Header;
  readonly second_header: Header;
}

/** @name FarmerId */
export interface FarmerId extends AccountId {}

/** @name FarmerSignature */
export interface FarmerSignature extends Signature {}

/** @name NextSaltDescriptor */
export interface NextSaltDescriptor extends Struct {
  readonly salt: u64;
}

/** @name NextSolutionRangeDescriptor */
export interface NextSolutionRangeDescriptor extends Struct {
  readonly solution_range: u64;
}

/** @name PoCBlockWeight */
export interface PoCBlockWeight extends u32 {}

/** @name PoCEpochConfiguration */
export interface PoCEpochConfiguration extends Struct {
  readonly c: ITuple<[u64, u64]>;
}

/** @name PoCEquivocationOffence */
export interface PoCEquivocationOffence extends Struct {
  readonly slot: Slot;
  readonly offender: FarmerId;
}

/** @name PoCGenesisConfiguration */
export interface PoCGenesisConfiguration extends Struct {
  readonly slot_duration: u64;
  readonly epoch_length: u64;
  readonly c: ITuple<[u64, u64]>;
  readonly randomness: PoCRandomness;
}

/** @name PoCKind */
export interface PoCKind extends U8aFixed {}

/** @name PoCNextConfigDescriptor */
export interface PoCNextConfigDescriptor extends Enum {
  readonly isV0: boolean;
  readonly isV1: boolean;
  readonly asV1: PoCNextConfigDescriptorV1;
}

/** @name PoCNextConfigDescriptorV1 */
export interface PoCNextConfigDescriptorV1 extends Struct {
  readonly c: ITuple<[u64, u64]>;
}

/** @name PoCNextEpochDescriptor */
export interface PoCNextEpochDescriptor extends Struct {
  readonly randomness: PoCRandomness;
}

/** @name PoCRandomness */
export interface PoCRandomness extends U8aFixed {}

/** @name ProposedProofOfSpaceResult */
export interface ProposedProofOfSpaceResult extends Struct {
  readonly slot_number: Slot;
  readonly solution: Option<RpcSolution>;
  readonly secret_key: Bytes;
}

/** @name RawPoCPreDigest */
export interface RawPoCPreDigest extends Struct {
  readonly slot: Slot;
  readonly solution: Solution;
}

/** @name RpcNewSlotInfo */
export interface RpcNewSlotInfo extends Struct {
  readonly slot_number: Slot;
  readonly challenge: U8aFixed;
  readonly salt: U8aFixed;
  readonly next_salt: Option<U8aFixed>;
  readonly solution_range: u64;
}

/** @name RpcSolution */
export interface RpcSolution extends Struct {
  readonly public_key: U8aFixed;
  readonly nonce: u64;
  readonly encoding: Bytes;
  readonly signature: Bytes;
  readonly tag: U8aFixed;
}

/** @name SaltDescriptor */
export interface SaltDescriptor extends Struct {
  readonly salt: u64;
}

/** @name Solution */
export interface Solution extends Struct {
  readonly public_key: FarmerId;
  readonly nonce: u64;
  readonly encoding: Bytes;
  readonly signature: Bytes;
  readonly tag: U8aFixed;
}

/** @name SolutionRangeDescriptor */
export interface SolutionRangeDescriptor extends Struct {
  readonly solution_range: u64;
}

export type PHANTOM_POC = 'poC';
