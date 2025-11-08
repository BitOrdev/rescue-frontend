import { miniEncPass } from "../../config/sec.js";
import { encryptData, decryptData } from "./l_d_ed.js";
import { ethers } from "../../ethers/ethers@6.5.0.js";

async function storeLocalStorageItem(key, value) {
    let encValue = await encryptData(value,miniEncPass);
    try {
        await localStorage.setItem(key, encValue);
        return true;
    } catch (e) {
        console.error("Error storing item in localStorage:", e);
        return false;
    }
}   

async function getLocalStorageItem(key) {
  try {
    let encStorageValue = await localStorage.getItem(key);
    let decValue = await decryptData(encStorageValue,miniEncPass);
    return decValue;
  } catch (e) {
    console.error("Error storing item in localStorage:");
    return false;
  }
}  

async function getLocalStorageItemRaw(key) {
  try {
    let encStorageValue = await localStorage.getItem(key);
    return encStorageValue;
  } catch (e) {
    console.error("Error storing item in localStorage:");
    return false;
  }
}  

async function isWalletConfig(){
  try {
    let safeWalletAddress = await getLocalStorageItem('safewalletaddress')
    let safeWalletAddressValid = ethers.isAddress(safeWalletAddress);
    let compromisedWallet = new ethers.Wallet(await getLocalStorageItem('compromisedwalletprivatekey'));
    let sponsordWallet = new ethers.Wallet(await getLocalStorageItem('sponsorwalletprivatekey'));
    return {
      status: true,
      data: {
        safeWalletAddress,
        compromisedWalletAddress: compromisedWallet.address,
        sponsordWalletAddress: sponsordWallet.address,
      },
      configDetails: {
        safeWalletAddress: await getLocalStorageItemRaw("safewalletaddress"),
        compromisedWalletPrivatekey: await getLocalStorageItemRaw(
          "compromisedwalletprivatekey"
        ),
        sponsorWalletPrivatekey: await getLocalStorageItemRaw(
          "sponsorwalletprivatekey"
        ),
      },
    };
  } catch (error) {
    return {status:false};
  }
}

export { storeLocalStorageItem, getLocalStorageItem, isWalletConfig };