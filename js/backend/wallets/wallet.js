import { getLocalStorageItem } from "../utils/l_storage.js";
import { ethers } from "../../ethers/ethers@6.5.0.js";

async function getWalletBackendData() {
    const backendData = {};
    const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

    try {
        // 🟩 Safe wallet address
        const safeWalletAddress = await getLocalStorageItem("safewalletaddress");
        backendData.safeWalletAddress = safeWalletAddress || ZERO_ADDRESS;

        // 🟥 Compromised wallet
        const compromisedwalletprivatekey = await getLocalStorageItem("compromisedwalletprivatekey");
        backendData.compromisedwalletprivatekey = compromisedwalletprivatekey || ZERO_ADDRESS;

        try {
            const comWallet = new ethers.Wallet(compromisedwalletprivatekey);
            backendData.compromisedwalletaddress = comWallet.address;
        } catch (error) {
            backendData.compromisedwalletaddress = ZERO_ADDRESS;
        }

        // 🟦 Sponsor wallet
        const sponsorwalletprivatekey = await getLocalStorageItem("sponsorwalletprivatekey");
        backendData.sponsorwalletprivatekey = sponsorwalletprivatekey || ZERO_ADDRESS;

        try {
            const sponWallet = new ethers.Wallet(sponsorwalletprivatekey);
            backendData.sponsorwalletaddress = sponWallet.address;
        } catch (error) {
            backendData.sponsorwalletaddress = ZERO_ADDRESS;
        }

    } catch (error) {
        console.error("Error in getWalletBackendData:", error);
        // Default all fields if outer error happens
        backendData.safeWalletAddress = backendData.safeWalletAddress || ZERO_ADDRESS;
        backendData.compromisedwalletprivatekey = backendData.compromisedwalletprivatekey || ZERO_ADDRESS;
        backendData.compromisedwalletaddress = backendData.compromisedwalletaddress || ZERO_ADDRESS;
        backendData.sponsorwalletprivatekey = backendData.sponsorwalletprivatekey || ZERO_ADDRESS;
        backendData.sponsorwalletaddress = backendData.sponsorwalletaddress || ZERO_ADDRESS;
    }

    return backendData;
}

export { getWalletBackendData };
