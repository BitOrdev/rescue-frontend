import { getXaiDashboard } from "../../template/template.js";
import { setContent, setLoader } from "./configures.js";

import { getXaiDashboardData } from "../../../js/backend/xai/xai.js";
import { showToast } from "../../../js/static/toast.js";

import { controller } from "../controller.js";

import { initilizePoolsEsxaiClaim } from "../../template/templateJs/xai/c_esxai_f_a_p.js";
import  { initilizeEsxaiToXaiConvert } from "../../template/templateJs/xai/convert-to-xai.js";
import { initilizeCancleRedeemRequest } from "../../template/templateJs/xai/cancleRedeem.js";
import { iniClaimXai } from "../../template/templateJs/xai/claimXai.js";

async function getXaiDashboardContent(data) {

  setLoader(data);

  let xaiData = await getXaiDashboardData();
  if(!xaiData.status){
    showToast(xaiData.data);
    await controller({name: "getContainerContent" });
    return;
  }

  let XaiDashboard = await getXaiDashboard(xaiData);
  data.content = XaiDashboard;
  await setContent(data);

  await initilizePoolsEsxaiClaim();
  await initilizeEsxaiToXaiConvert(xaiData);
  await initilizeCancleRedeemRequest();
  await iniClaimXai(xaiData);
  
}

export { getXaiDashboardContent };
