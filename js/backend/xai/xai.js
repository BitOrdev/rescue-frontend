import { getXaiTokenBalance } from "./getXaiBalance.js";
import { getEsxaiTokenBalance } from "./getEsxaiBalance.js";
import { isWalletConfig } from "../utils/l_storage.js";
import { getSnlBalance } from "./getSnlBalance.js";
import { getAllPools } from "./getAllPools.js";
import { getRedeemHistory } from "./getRedeemHistory.js";
import { formatRedeemList } from "./formatRH.js";

async function getXaiDashboardData(){
   let data = {};

   let isWalletConfigRes = await isWalletConfig();
   if(!isWalletConfigRes.status){
      return { status: false, data: { message: "Please configure your wallets before continuing.", type: 2 , duration: 10} };
   }

   let userAddress = isWalletConfigRes.data.compromisedWalletAddress;

   let xai = await getXaiTokenBalance({walletAddress: userAddress});
   data.xaiBalance = xai.balance;
   data.xaiFormatedBalance = xai.formattedBalance;

   let esxai = await getEsxaiTokenBalance({walletAddress: userAddress});
   data.esXaiBalance = esxai.balance;
   data.esXaiFormatedBalance = esxai.formattedBalance;

   let snl = await getSnlBalance({walletAddress: userAddress});
   data.snlBalance = snl.balance;

   let xaiPools = await getAllPools({ walletAddress: userAddress });
   data.pools = xaiPools;

   let redeemHistory = await getRedeemHistory({ walletAddress: userAddress });
   if(redeemHistory){
      let histories = redeemHistory[0];
      data.redeemHistory = await formatRedeemList(histories);
   }


   return { status: true, data };
}

export { getXaiTokenBalance, getXaiDashboardData };