import { getLocalStorageItem } from "../utils/l_storage.js";
import { ethers } from "../../ethers/ethers@6.5.0.js";

async function getHeaderBackendData() {
    const backendData = {};
    const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

    try {
        // 🟥 Compromised wallet
        const compromisedwalletprivatekey = await getLocalStorageItem("compromisedwalletprivatekey");
        backendData.compromisedwalletprivatekey = compromisedwalletprivatekey || ZERO_ADDRESS;

        try {
            const comWallet = new ethers.Wallet(compromisedwalletprivatekey);
            backendData.compromisedwalletaddress = comWallet.address;
        } catch (error) {
            backendData.compromisedwalletaddress = ZERO_ADDRESS;
        }

    } catch (error) {
        console.error("Error in getWalletBackendData:", error);
        backendData.compromisedwalletaddress = backendData.compromisedwalletaddress || ZERO_ADDRESS;
    }

    return backendData;
}

export { getHeaderBackendData };
