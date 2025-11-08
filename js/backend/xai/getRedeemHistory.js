import { readContract } from "../utils/readContract.js";
import { xaiConfig } from "./config.js";
import { rpcUrls } from "../../config/networks.js";

async function getRedeemHistory(data) {

    let redeemHistory = [];

    // get history count
    let userRedeemHistoryTxCount = {
      to: xaiConfig.xaiRedeemHistoryCa,
      data: {
        functionName: "getRedemptionRequestCount",
        abi: xaiConfig.xaiRedeemHistoryAbi,
        args: [data.walletAddress],
      },
    };
    let userRedeemHistoryCount = await readContract({ rpcUrl: rpcUrls.arbitrum.url }, userRedeemHistoryTxCount);


    // get history
    let userRedeemHistoryTx = {
      to: xaiConfig.xaiRedeemHistoryCa,
      data: {
        functionName: "getRedemptionsByUser",
        abi: xaiConfig.xaiRedeemHistoryAbi,
        args: [data.walletAddress, Number(userRedeemHistoryCount.data), 0],
      },
    };
    let userRedeemHistory = await readContract({ rpcUrl: rpcUrls.arbitrum.url }, userRedeemHistoryTx);

    if(userRedeemHistory.status){
        return userRedeemHistory.data;
    }else{
        return false;
    }

}

export { getRedeemHistory };
