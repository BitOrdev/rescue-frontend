import { readContract } from "../utils/readContract.js";
import { xaiConfig } from "./config.js";
import { rpcUrls } from "../../config/networks.js";

import { formatUnits } from "../../ethers/ethers@6.5.0.js";

let decimals = 18;
async function getAllPools(data) {

  let userAddress = data.walletAddress;

  let poolListTx = {
    to: xaiConfig.xaiPoolList,
    data: {
      args: [userAddress],
      functionName: "getPoolIndicesOfUser",
      abi: [
        {
          inputs: [{ internalType: "address", name: "user", type: "address" }],
          name: "getPoolIndicesOfUser",
          outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
          stateMutability: "view",
          type: "function",
        },
      ],
    },
  };

  let allPoolsList = (await readContract({ rpcUrl: rpcUrls.arbitrum.url }, poolListTx)).data[0];
  
  let xaiPoolAbi = xaiConfig.xaiPoolAbi;

  const poolPromises = allPoolsList.map(async (poolAddr) => {
    let poolData = { address: poolAddr };

    // Prepare both readContract calls
    const poolInfoTx = {
      to: poolAddr,
      data: {
        functionName: "getPoolInfo",
        abi: xaiPoolAbi,
        args: [],
      },
    };

    const userPoolDataTx = {
      to: poolAddr,
      data: {
        functionName: "getUserPoolData",
        abi: xaiPoolAbi,
        args: [userAddress],
      },
    };

    // Run both calls concurrently
    const [poolInfo, userPoolData] = await Promise.all([
      readContract({ rpcUrl: rpcUrls.arbitrum.url }, poolInfoTx),
      readContract({ rpcUrl: rpcUrls.arbitrum.url }, userPoolDataTx),
    ]);

    // Format and assign
    poolData.name = poolInfo.data[1];
    poolData.userClaimAmount = formatUnits(userPoolData.data[1], decimals);
    poolData.userStakedEsXaiAmount = formatUnits(userPoolData.data[0], decimals);
    poolData.userStakedKeyAmount = userPoolData.data[2];

    return poolData;
  });

  const pools = await Promise.all(poolPromises);

  return pools;

}

export { getAllPools };
