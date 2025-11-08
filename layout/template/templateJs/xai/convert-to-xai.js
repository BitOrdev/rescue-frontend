import { urls } from "../config/url.js";
import { fetchRequest } from "../utils/fetchRequest.js";
import { isWalletConfig } from "../../../../js/backend/utils/l_storage.js";
import { showToast } from "../../../../js/static/toast.js";

import { controller } from "../../../layoutController/controller.js";

async function initilizeEsxaiToXaiConvert(data) {

    try {
        data = data.data;

        let esxaiToXaiConvertBtn = document.querySelector(".esxai-to-xai-convert-btn");
        
        esxaiToXaiConvertBtn.addEventListener("click", async function () {

            let esXaiInput = document.querySelector("#esxai-convert-input");
            let timeInDayInput = document.querySelector("#timeperiod");

            let xaiAmount = Number(esXaiInput.value);
            if(Number(data.esXaiFormatedBalance) < xaiAmount){
                showToast({message: "Please enter valid esXai amount.", type: 2});
                return;
            }

            let timePeriod = [15,90,180];
            let period = Number(timeInDayInput.value);
            if (period != timePeriod[0] && period != timePeriod[1] && period != timePeriod[2]) {
              showToast({ message: "Please select a vlaid time period." , type: 2});
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
                        esXai: Math.floor(xaiAmount),
                        period: (period * 24 * 3600),
                    },
                };

                esxaiToXaiConvertBtn.innerHTML = "Converting...";

                let fetchResponse = await fetchRequest( urls.website + urls.convertEsxaiToXai, "POST" , body );

                if (fetchResponse.status) {
                    await showToast({ message: fetchResponse.message });
                    esxaiToXaiConvertBtn.innerHTML = "Convert";
                    await controller({ name: "getContainerContent", data: { page: "xai" }, });
                } else {
                    await showToast({ message: fetchResponse.message, type: 3, duration: 10 });
                    esxaiToXaiConvertBtn.innerHTML = "Convert";
                }
            }

        });
    } catch (error) {
        showToast({ message: error, type: 3 });
    }
   
}

export { initilizeEsxaiToXaiConvert };
