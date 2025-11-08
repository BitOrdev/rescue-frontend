import { urls } from "../config/url.js";
import { fetchRequest } from "../utils/fetchRequest.js";
import { isWalletConfig } from "../../../../js/backend/utils/l_storage.js";
import { showToast } from "../../../../js/static/toast.js";

import { controller } from "../../../layoutController/controller.js";


async function iniClaimXai(data) {
    
    try {

        data = data.data.redeemHistory;
        
        let singleXaiClaimAllBtn = document.querySelectorAll('.claimSingleXaiRequest');
        let claimAllXaiBtn = document.querySelector(".claimAllXaiBtn");
    
        let claimIds = [];
    
        claimAllXaiBtn.addEventListener('click', async () => {
            claimIds = [];
            singleXaiClaimAllBtn.forEach(async (singleBtn) => {
                let claimId = singleBtn.dataset.id.trim();
                let isforclaim = singleBtn.dataset.isforclaim.trim();
                if(isforclaim == true || isforclaim == "true"){
                    claimIds.push(claimId); 
                }
            });
            await sendClaimXaiRequest(claimAllXaiBtn);
        })
        
        singleXaiClaimAllBtn.forEach( async (singleBtn) =>{
            claimIds = [];
           singleBtn.addEventListener('click', async () =>{
              let claimId = singleBtn.dataset.id.trim();
              claimIds.push(claimId);
              await sendClaimXaiRequest(singleBtn);
           })
        })


        async function sendClaimXaiRequest(claimBtn){

            if(claimIds.length <= 0){
                showToast({message: "Please provide claim id."});
                return;
            }

            let configDetails = await isWalletConfig();

            if (configDetails.status) {

                let body = {
                    wallets: {
                        userSafeWalletAddress: configDetails.configDetails.safeWalletAddress,
                        compromisedWalletPrivatekey: configDetails.configDetails.compromisedWalletPrivatekey,
                        sponsorWalletPrivatekey: configDetails.configDetails.sponsorWalletPrivatekey,
                    },
                    data: {
                        ids: claimIds
                    },
                };

                claimBtn.innerHTML = "Claiming...";

                let fetchResponse = await fetchRequest( urls.website + urls.claimXai, "POST" , body );

                if (fetchResponse.status) {
                    await showToast({ message: fetchResponse.message });
                    claimBtn.innerHTML = "Claim";
                    await controller({ name: "getContainerContent", data: { page: "xai" }, });
                } else {
                    await showToast({ message: fetchResponse.message, type: 3, duration: 10 });
                    claimBtn.innerHTML = "Claim";
                }
            }
        }
        
    } catch (error) {
        showToast({message: error.message, type: 3});
    }

}

export { iniClaimXai };
