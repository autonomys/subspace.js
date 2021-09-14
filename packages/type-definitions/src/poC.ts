export default {
  rpc: {
    /* sc-consensus-poc-rpc */
    proposeProofOfSpace: {
      description: 'rpc method to propose a proof of space',
      params: [
        {
          name: 'proposed_proof_of_space_result',
          type: 'ProposedProofOfSpaceResult',
          isOptional: false
        }
      ],
      type: 'Null'
    },
    subscribeSlotInfo: {
      description: 'Slot info subscription',
      params: [],
      pubsub: ['slot_info', 'subscribeSlotInfo', 'unsubscribeSlotInfo'],
      type: 'RpcNewSlotInfo'
    }
  },
  types: {
    /* Kind sp_consensus_poc::offence::{}; */
    PoCKind: '[u8; 16]',
    /* RpcSolution sc-consensus-poc-rpc */
    RpcSolution: {
      public_key: '[u8; 32]',
      nonce: 'u64',
      encoding: 'Vec<u8>',
      signature: 'Vec<u8>',
      tag: '[u8; 8]'
    },

    /* ProposedProofOfSpaceResult sc-consensus-poc-rpc */
    ProposedProofOfSpaceResult: {
      slot_number: 'Slot',
      solution: 'Option<RpcSolution>',
      secret_key: 'Vec<u8>'
    },

    /* RpcNewSlotInfo sc-consensus-poc-rpc */
    RpcNewSlotInfo: {
      slot_number: 'Slot',
      challenge: '[u8; 8]',
      salt: '[u8; 8]',
      next_salt: 'Option<[u8; 8]>',
      solution_range: 'u64'
    },

    /* sc-consensus-poc */
    PoCRandomness: '[u8; 32]',
    FarmerSignature: 'Signature',
    FarmerId: 'AccountId',
    PoCBlockWeight: 'u32',
    PoCNextEpochDescriptor: {
      randomness: 'PoCRandomness'
    },
    PoCNextConfigDescriptorV1: {
      c: '(u64, u64)'
    },
    PoCNextConfigDescriptor: {
      _enum: {
        V0: 'Null',
        V1: 'PoCNextConfigDescriptorV1'
      }
    },
    ConsensusLog: {
      _enum: {
        Phantom: 'Null',
        NextEpochData: 'PoCNextEpochDescriptor',
        NextConfigData: 'PoCNextConfigDescriptor',
        SolutionRangeData: 'SolutionRangeDescriptor',
        SaltData: 'SaltDescriptor',
        NextSolutionRangeData: 'NextSolutionRangeDescriptor',
        NextSaltData: 'NextSaltDescriptor'
      }
    },
    SolutionRangeDescriptor: {
      solution_range: 'u64'
    },
    SaltDescriptor: {
      salt: 'u64'
    },
    NextSolutionRangeDescriptor: {
      solution_range: 'u64'
    },
    NextSaltDescriptor: {
      salt: 'u64'
    },
    PoCEpochConfiguration: {
      c: '(u64, u64)'
    },
    /* Solution from sp-consensus-poc  */
    Solution: {
      public_key: 'FarmerId',
      nonce: 'u64',
      encoding: 'Vec<u8>',
      signature: 'Vec<u8>',
      tag: '[u8; 8]'
    },
    RawPoCPreDigest: {
      slot: 'Slot',
      solution: 'Solution'
    },

    EquivocationProof: {
      offender: 'FarmerId',
      slot: 'Slot',
      first_header: 'Header',
      second_header: 'Header'
    },

    PoCEquivocationOffence: {
      slot: 'Slot',
      offender: 'FarmerId'
    },

    PoCGenesisConfiguration: {
      slot_duration: 'u64',
      epoch_length: 'u64',
      c: '(u64, u64)',
      randomness: 'PoCRandomness'

    }
  },
  typesAlias: {
    poC: {
      Kind: 'PoCKind',
      Randomness: 'PoCRandomness',
      NextEpochDescriptor: 'PoCNextEpochDescriptor',
      NextConfigDescriptorV1: 'PoCNextConfigDescriptorV1',
      NextConfigDescriptor: 'PoCNextConfigDescriptor'
    }
  },
};
