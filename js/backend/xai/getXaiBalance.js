import { getTokenBalance } from "../utils/getTokenBalance.js";
import { rpcUrls } from "../../config/networks.js";
import { xaiConfig } from "./config.js";

async function getXaiTokenBalance(data) {

  const xaiBalance = new getTokenBalance(
    rpcUrls.arbitrum.url,
    xaiConfig.xaiTokenAddress,
    data.walletAddress
  );

  try {

    if(data.type === 1){
      const rawBalance = await xaiBalance.getTokenBalance();
      return rawBalance;
    }else{
      const formattedBalance = await xaiBalance.getFormattedBalance();
      return formattedBalance;
    }


  } catch (error) {
    console.error("Failed to fetch balance:", error);
  }
}

export { getXaiTokenBalance };
