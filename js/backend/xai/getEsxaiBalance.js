import { getTokenBalance } from "../utils/getTokenBalance.js";
import { rpcUrls } from "../../config/networks.js";
import { xaiConfig } from "./config.js";

async function getEsxaiTokenBalance(data) {
  const esxaiBalance = new getTokenBalance(
    rpcUrls.arbitrum.url,
    xaiConfig.esXaiAddress,
    data.walletAddress
  );

  try {
    if (data.type === 1) {
      const rawBalance = await esxaiBalance.getTokenBalance();
      return rawBalance;
    } else {
      const formattedBalance = await esxaiBalance.getFormattedBalance();
      return formattedBalance;
    }
  } catch (error) {
    console.error("Failed to fetch balance:", error);
  }
}

export { getEsxaiTokenBalance };
