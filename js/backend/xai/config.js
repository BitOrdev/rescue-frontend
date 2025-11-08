let xaiConfig = {
  xaiTokenAddress: "0x4Cb9a7AE498CEDcBb5EAe9f25736aE7d428C9D66",
  esXaiAddress: "0x4c749d097832de2fecc989ce18fdc5f1bd76700c",
  snlAddress: "0xbc14d8563b248B79689ECbc43bBa53290e0b6b66",

  xaiPoolList: "0xF9E08660223E2dbb1c0b28c82942aB6B5E38b8E5",
  xaiRedeemHistoryCa: "0x4C749d097832DE2FEcc989ce18fDc5f1BD76700c",

  xaiPoolAbi: [
    {
      inputs: [{ internalType: "address", name: "user", type: "address" }],
      name: "getUserPoolData",
      outputs: [
        {
          internalType: "uint256",
          name: "userStakedEsXaiAmount",
          type: "uint256",
        },
        { internalType: "uint256", name: "userClaimAmount", type: "uint256" },
        {
          internalType: "uint256",
          name: "userStakedKeyAmount",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "unstakeRequestkeyAmount",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "unstakeRequestesXaiAmount",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getPoolInfo",
      outputs: [
        {
          components: [
            { internalType: "address", name: "poolAddress", type: "address" },
            { internalType: "address", name: "owner", type: "address" },
            {
              internalType: "address",
              name: "keyBucketTracker",
              type: "address",
            },
            {
              internalType: "address",
              name: "esXaiBucketTracker",
              type: "address",
            },
            { internalType: "uint256", name: "keyCount", type: "uint256" },
            {
              internalType: "uint256",
              name: "totalStakedAmount",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "updateSharesTimestamp",
              type: "uint256",
            },
            { internalType: "uint32", name: "ownerShare", type: "uint32" },
            { internalType: "uint32", name: "keyBucketShare", type: "uint32" },
            {
              internalType: "uint32",
              name: "stakedBucketShare",
              type: "uint32",
            },
          ],
          internalType: "struct StakingPool3.PoolBaseInfo",
          name: "baseInfo",
          type: "tuple",
        },
        { internalType: "string", name: "_name", type: "string" },
        { internalType: "string", name: "_description", type: "string" },
        { internalType: "string", name: "_logo", type: "string" },
        { internalType: "string[]", name: "_socials", type: "string[]" },
        { internalType: "uint32[]", name: "_pendingShares", type: "uint32[]" },
        { internalType: "uint256", name: "_ownerStakedKeys", type: "uint256" },
        {
          internalType: "uint256",
          name: "_ownerRequestedUnstakeKeyAmount",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_ownerLatestUnstakeRequestLockTime",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
  xaiRedeemHistoryAbi: [
    {
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "getRedemptionRequestCount",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "account", type: "address" },
        { internalType: "uint256", name: "maxQty", type: "uint256" },
        { internalType: "uint256", name: "offset", type: "uint256" },
      ],
      name: "getRedemptionsByUser",
      outputs: [
        {
          components: [
            { internalType: "uint256", name: "amount", type: "uint256" },
            {
              internalType: "uint256",
              name: "startTime",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "duration",
              type: "uint256",
            },
            { internalType: "uint256", name: "endTime", type: "uint256" },
            { internalType: "bool", name: "completed", type: "bool" },
            { internalType: "bool", name: "cancelled", type: "bool" },
            {
              internalType: "uint256[5]",
              name: "__gap",
              type: "uint256[5]",
            },
          ],
          internalType: "struct esXai4.RedemptionRequestExt[]",
          name: "redemptions",
          type: "tuple[]",
        },
        {
          internalType: "uint256",
          name: "totalRedemptions",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
  
};

export { xaiConfig };