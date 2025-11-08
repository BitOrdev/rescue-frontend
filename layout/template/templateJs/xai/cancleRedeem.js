import { urls } from "../config/url.js";
import { fetchRequest } from "../utils/fetchRequest.js";
import { isWalletConfig } from "../../../../js/backend/utils/l_storage.js";
import { showToast } from "../../../../js/static/toast.js";

import { controller } from "../../../layoutController/controller.js";

async function initilizeCancleRedeemRequest() {

    try {

        let cancleRedeemBtnAll = document.querySelectorAll(".cancleRedeemButton");

        cancleRedeemBtnAll.forEach( async (cancleRedeemBtn) => {
            cancleRedeemBtn.addEventListener("click", async function () {

                let cancleId = cancleRedeemBtn.dataset.id;
                if(Number(cancleId)<=0){
                   showToast({message: "Cancle request id invlaid.", type: 2});
                   return;
                }

                if(!confirm("Do you want to cancel this redeem request.")){
                    showToast({message: "cancel failed.", type:2});
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
                            cancleId,
                        },
                    };
    
                    cancleRedeemBtn.innerHTML = "Canceling...";
    
                    let fetchResponse = await fetchRequest(urls.website + urls.cancleRedeem, "POST" , body );
    
                    if (fetchResponse.status) {
                        await showToast({ message: fetchResponse.message });
                        cancleRedeemBtn.innerHTML = "Cancel";
                        await controller({ name: "getContainerContent", data: { page: "xai" }, });
                    } else {
                        await showToast({ message: fetchResponse.message, type: 3, duration: 10 });
                        cancleRedeemBtn.innerHTML = "Cancel";
                    }
                }
    
            });
        })
        
        
    } catch (error) {
        showToast({ message: error, type: 3 });
    }
   
}

export { initilizeCancleRedeemRequest };
