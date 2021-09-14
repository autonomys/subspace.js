export default {
  rpc: {},
  types: {
    PocMoment: 'u64',
    BlockNumber: 'u32',
    Index: 'u32',
    PoCBalance: 'u128'
  },
  typesAlias: {
    runtime: {
      Balance: 'PoCBalance',
      Moment: 'PocMoment'
    }
  }
};
