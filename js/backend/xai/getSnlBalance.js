import { getNFTBalance } from "../utils/getNftBalance.js";
import { rpcUrls } from "../../config/networks.js";
import { xaiConfig } from "./config.js";

async function getSnlBalance(data) {
  let nftBalance = await getNFTBalance({ rpcUrl: rpcUrls.arbitrum.url }, xaiConfig.snlAddress, data.walletAddress);
  return nftBalance;
}

export { getSnlBalance };
