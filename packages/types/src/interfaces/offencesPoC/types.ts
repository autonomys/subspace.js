// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Struct } from '@polkadot/types';
import type { Offender } from '@polkadot/types/interfaces/offences';

/** @name PoCOffenceDetails */
export interface PoCOffenceDetails extends Struct {
  readonly offender: Offender;
}

export type PHANTOM_OFFENCESPOC = 'offencesPoC';
