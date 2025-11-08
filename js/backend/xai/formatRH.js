import { formatUnits } from "../../ethers/ethers@6.5.0.js";

function formatRedeemData(data, decimals = 18, id = null ) {

  let rawBalance = data[0];
  let redeemRequestTimestamp = Number(data[1]);
  let timePeriod = Number(data[2]);
  let cancelOrClaimTimestamp = Number(data[3]);
  let isClaimed = data[4];
  let cancelled = data[5];

  
  const balance = formatUnits(rawBalance, decimals);
  
  const redeemRequestDate = redeemRequestTimestamp > 0 ? new Date(redeemRequestTimestamp * 1000).toLocaleString("sv-SE").replace("T", " ")  : null;

  const cancelOrClaimDate = cancelOrClaimTimestamp > 0? new Date(cancelOrClaimTimestamp * 1000).toLocaleString("sv-SE").replace("T", " ") : null;
  
  const expiryDate =redeemRequestTimestamp > 0? new Date((redeemRequestTimestamp + timePeriod) * 1000).toLocaleString("sv-SE").replace("T", " ") : null;


  // calculate  the xai  balnce
    // Calculate XAI balance based on timePeriod
  const SECONDS_IN_DAY = 24 * 60 * 60;
  const days = timePeriod / SECONDS_IN_DAY;

  let xaiMultiplier = 0;
  if (days === 15) {
    xaiMultiplier = 0.25;
  } else if (days === 90) {
    xaiMultiplier = 0.62;
  } else if (days === 180) {
    xaiMultiplier = 1.0;
  }

  let xaiBalance = (balance * xaiMultiplier).toFixed(2);

  // time left calculation
  const liveTimestamp = Math.floor(Date.now() / 1000);
  const claimTimeLeft = redeemRequestTimestamp + timePeriod - liveTimestamp;

  return {
    id,
    balance,
    xaiBalance,
    redeemRequestTimestamp,
    redeemRequestDate,
    timePeriod,
    expiryDate,
    cancelOrClaimTimestamp,
    cancelOrClaimDate,
    isClaimed,
    cancelled,
    claimTimeLeft,
  };

}

function formatRedeemList(list) {

  const formatted = list.map((item, index) => formatRedeemData(item, 18, index));

  // Separate into groups
  const unclaimed = formatted.filter(i => !i.isClaimed && !i.cancelled);
  const others = formatted.filter(i => i.isClaimed || i.cancelled);

  // Sort unclaimed by time left ascending (less time first)
  const unclaimedSorted = [...unclaimed].sort((a, b) => a.claimTimeLeft - b.claimTimeLeft);

  // Sort others in descending order (Z → A) by cancelOrClaimTimestamp
  const othersSorted = [...others].sort((a, b) => b.cancelOrClaimTimestamp - a.cancelOrClaimTimestamp);

  // Combine final list
  return [
    ...unclaimedSorted,
    ...othersSorted,
  ];
}

export { formatRedeemData, formatRedeemList };