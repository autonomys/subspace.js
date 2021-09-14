// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { NextConfigDescriptor } from '@polkadot/types/interfaces/babe';
import type { Extrinsic } from '@polkadot/types/interfaces/extrinsics';
import type { EquivocationProof } from '@subspace/types/interfaces/poC';
import type { Call } from '@subspace/types/interfaces/runtime';
import type { ApiTypes, SubmittableExtrinsic } from '@polkadot/api/types';

declare module '@polkadot/api/types/submittable' {
  export interface AugmentedSubmittables<ApiType> {
    poC: {
      /**
       * Plan an epoch config change. The epoch config change is recorded and will be enacted on
       * the next call to `enact_epoch_change`. The config will be activated one epoch after.
       * Multiple calls to this method will replace any existing planned config change that had
       * not been enacted yet.
       **/
      planConfigChange: AugmentedSubmittable<(config: NextConfigDescriptor | { V0: any } | { V1: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [NextConfigDescriptor]>;
      /**
       * Report farmer equivocation/misbehavior. This method will verify
       * the equivocation proof and validate the given key ownership proof
       * against the extracted offender. If both are valid, the offence will
       * be reported.
       **/
      reportEquivocation: AugmentedSubmittable<(equivocationProof: EquivocationProof | { offender?: any; slot?: any; first_header?: any; second_header?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [EquivocationProof]>;
      /**
       * Report authority equivocation/misbehavior. This method will verify
       * the equivocation proof and validate the given key ownership proof
       * against the extracted offender. If both are valid, the offence will
       * be reported.
       * This extrinsic must be called unsigned and it is expected that only
       * block authors will call it (validated in `ValidateUnsigned`), as such
       * if the block author is defined it will be defined as the equivocation
       * reporter.
       **/
      reportEquivocationUnsigned: AugmentedSubmittable<(equivocationProof: EquivocationProof | { offender?: any; slot?: any; first_header?: any; second_header?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [EquivocationProof]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
  }

  export interface SubmittableExtrinsics<ApiType extends ApiTypes> extends AugmentedSubmittables<ApiType> {
    (extrinsic: Call | Extrinsic | Uint8Array | string): SubmittableExtrinsic<ApiType>;
    [key: string]: SubmittableModuleExtrinsics<ApiType>;
  }
}
