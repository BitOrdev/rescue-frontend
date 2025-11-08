import { shortNameValue } from "../../config/details/l_s_k_n.js";

import {  storeLocalStorageItem , getLocalStorageItem} from "../../../../js/backend/utils/l_storage.js";
import { showToast } from "../../../../js/static/toast.js";

import { ethers } from "../../../../js/ethers/ethers@6.5.0.js";

import { controller } from "../../../layoutController/controller.js";
 
async function initilizeEditButtons(data){

    let editButtons = document.querySelectorAll(".wallet_edit_buttons");
    editButtons.forEach((button) => {

        let names = shortNameValue;

       button.addEventListener("click", async (e) => {

            let buttonEditName = button.dataset.editname.trim().toLowerCase();

            if (!(buttonEditName in names)) return;

            let newValue = prompt("Enter new value for " + names[buttonEditName].message + ":");

            if (newValue === "") {
                await showToast({message: "Value cannot be empty." , type: 3, duration: 5});
                return;
            }

            if (newValue !== null) {
                newValue = newValue.trim();

                let walletPrivatekeyValidateResult;

                if(names[buttonEditName].type == "address"){

                    try {
                        let addressValidateResult = ethers.isAddress(newValue);
                    } catch (error) {                        
                        await showToast({message: names[buttonEditName].message + " Invalid!" , type: 2, duration: 5});
                        return;
                    }
                }else{
                    try {
                        walletPrivatekeyValidateResult = await new ethers.Wallet(newValue);
                    } catch (error) {                        
                        await showToast({message: names[buttonEditName].message + " Invalid!" , type: 2, duration: 5});
                        return;
                    }
                }
                
                let storeResult = await storeLocalStorageItem(buttonEditName, newValue);

                if (storeResult) {
                    await showToast({message: names[buttonEditName].message + " updated successfully." , type: 1, duration: 5});
                    
                    let thisValueTag = document.querySelector('.'+buttonEditName+"_p");
                    let newValue =  await getLocalStorageItem(buttonEditName);
                    thisValueTag.innerHTML = newValue;

                    let nextPriButton = thisValueTag.nextElementSibling;
                    if (nextPriButton && nextPriButton.classList.contains('copyBtn')) {
                        nextPriButton.dataset.copyvalue = newValue;
                    }

                    if (names[buttonEditName].type == "privatekey") {
                        let thisValueAddressTag = document.querySelector('.'+buttonEditName+"_p_a");
                        thisValueAddressTag.innerHTML = walletPrivatekeyValidateResult.address;

                        let nextButton = thisValueAddressTag.nextElementSibling;
                        if (nextButton && nextButton.classList.contains('copyBtn')) {
                            nextButton.dataset.copyvalue = walletPrivatekeyValidateResult.address;
                        }
                    }

                    controller({ name: "setupHeader" });

                    return true;

                } else {
                    alert("Failed to update " + names[buttonEditName].message + ".");
                }
                
            }

       });
    });

    let allCopyButtons = document.querySelectorAll(".copyBtnValue");
    allCopyButtons.forEach(element => {
        element.addEventListener('click', async () => {
            let copyValue = element.dataset.copyvalue.trim();
            if(!copyValue){
                return;
            }else{
               try {
                 navigator.clipboard.writeText(copyValue);
                 showToast({ message: "Copy successfull."});
               } catch (error) {
                 showToast({message: "Clipboard copy failed!", type: 2});
               }
            }
        })
    });

    let create_sponsor_walletBtn = document.querySelector('.create_sponsor_walletBtn');
    create_sponsor_walletBtn.addEventListener('click', async function () {
        try {

            // Check if sponsor wallet already exists
            const existingPrivateKey = await getLocalStorageItem("sponsorwalletprivatekey");
            if(existingPrivateKey){
                let existingAddress =( new ethers.Wallet(existingPrivateKey)).address;
    
                if (existingPrivateKey && existingAddress) {
    
                    const confirmReplace = confirm(
                        "A sponsor wallet already exists:\n\n" +
                        existingAddress +
                        "\n\nDo you want to remove it and create a new one?"
                    );
    
                    if (!confirmReplace) {
                        await showToast({ message: "Wallet creation canceled.", type: 3, duration: 5 });
                        return;
                    }
    
                }
            }

            const newWallet = ethers.Wallet.createRandom();
            const privateKey = newWallet.privateKey;
            const address = newWallet.address;

            // Store both in localStorage
            await storeLocalStorageItem(create_sponsor_walletBtn.dataset.keyname, privateKey);

            // Show success message
            await showToast({ message: "New wallet created successfully.", type: 1, duration: 5 });

            // Update the UI (if you have elements to show wallet details)
            const pkTag = document.querySelector(".sponsorwalletprivatekey_p");
            const addressTag = document.querySelector('.sponsorwalletprivatekey_p_a');

            if (pkTag) pkTag.innerHTML = privateKey;
            if (addressTag) addressTag.innerHTML = address;

            let pkTagCopyBtn = pkTag.nextElementSibling;
            if (pkTagCopyBtn && pkTagCopyBtn.classList.contains('copyBtn')) {
                pkTagCopyBtn.dataset.copyvalue = privateKey;
            }

            let addressTagCopyBtn = addressTag.nextElementSibling;
            if (addressTagCopyBtn && addressTagCopyBtn.classList.contains('copyBtn')) {
                addressTagCopyBtn.dataset.copyvalue = address;
            }

            controller({ name: "setupHeader" });

        } catch (error) {
            console.error(error);
            await showToast({ message: "Failed to create wallet!", type: 2, duration: 5 });
        }
    });

    let delete_compromisedWallet_privatekey = document.querySelector('.delete_compromisedWallet_privatekey');

    delete_compromisedWallet_privatekey.addEventListener('click', async function () {
        try {
            const existingPrivateKey = await getLocalStorageItem("compromisedwalletprivatekey");

            if (!existingPrivateKey) {
                await showToast({ message: "No compromised wallet found to delete.", type: 3, duration: 5 });
                return;
            }
            const confirmDelete = confirm("Are you sure you want to delete the compromised wallet private key?\n\nThis action cannot be undone.");

            if (!confirmDelete) {
                await showToast({ message: "Deletion canceled.", type: 3, duration: 5 });
                return;
            }

            localStorage.removeItem("compromisedwalletprivatekey");

            const keyTag = document.querySelector('.compromisedwalletprivatekey_p');
            const addressTag = document.querySelector('.compromisedwalletprivatekey_p_a');
            keyTag.innerHTML = "0x0000000000000000000000000000000000000000";
            addressTag.innerHTML = "0x0000000000000000000000000000000000000000";

            let keyTagCopyBtn = keyTag.nextElementSibling;
            if (keyTagCopyBtn && keyTagCopyBtn.classList.contains('copyBtn')) {
                keyTagCopyBtn.dataset.copyvalue = "0x0000000000000000000000000000000000000000";
            }

            let addressTagCopyBtn = addressTag.nextElementSibling;
            if (addressTagCopyBtn && addressTagCopyBtn.classList.contains('copyBtn')) {
                addressTagCopyBtn.dataset.copyvalue = "0x0000000000000000000000000000000000000000";
            }

            // Show success toast
            await showToast({ message: "Compromised wallet private key deleted successfully.", type: 1, duration: 5 });

            controller({ name: "setupHeader" });

        } catch (error) {
            console.error(error);
            await showToast({ message: "Failed to delete compromised wallet!", type: 2, duration: 5 });
        }
    });


}

export { initilizeEditButtons }