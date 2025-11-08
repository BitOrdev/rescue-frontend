import { urls } from "../config/url.js";
import { fetchRequest } from "../utils/fetchRequest.js";
import { isWalletConfig } from "../../../../js/backend/utils/l_storage.js";
import { showToast } from "../../../../js/static/toast.js";

import { controller } from "../../../layoutController/controller.js";

async function initilizePoolsEsxaiClaim() {

  try {
    let allPoolsDetails = document.querySelectorAll(".allPoolsDetails");
    let poolsAddress = [];
    allPoolsDetails.forEach(element => {
        poolsAddress.push(element.dataset.pooladdress.trim());
    });

    let claimAllEsxaiFromPoolsBtn = document.querySelector(".claimAllEsxaiFromPoolsBtn");
    claimAllEsxaiFromPoolsBtn.addEventListener('click', async  function(){
        
      let configDetails = await isWalletConfig();
      if(configDetails.status){

        let body = {
          wallets: {
            userSafeWalletAddress: configDetails.configDetails.safeWalletAddress,
            compromisedWalletPrivatekey:
              configDetails.configDetails.compromisedWalletPrivatekey,
            sponsorWalletPrivatekey:
              configDetails.configDetails.sponsorWalletPrivatekey,
          },
          data: {
            pools: poolsAddress
          }
        };

        claimAllEsxaiFromPoolsBtn.innerHTML = "Claiming...";
        let fetchResponse = await fetchRequest(urls.website+urls.claimEsxaiFromAllPools,"POST",body);
        if(fetchResponse.status){
          await showToast({ message: fetchResponse.message});
          claimAllEsxaiFromPoolsBtn.innerHTML = "Claim All";
          await controller({ name: "getContainerContent" , data: { page: "xai" }});
        }else{
          await showToast({ message: fetchResponse.message, type: 3 , duration: 10});
          claimAllEsxaiFromPoolsBtn.innerHTML = "Claim All";
        }

      }

    });
  } catch (error) {
    showToast({message: error, type: 3});
  }
    
}

export { initilizePoolsEsxaiClaim };
