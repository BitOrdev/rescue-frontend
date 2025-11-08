import { getCompromisedAndSponsorWallets } from "../../template/template.js";
import { setContent, setLoader } from "./configures.js";

import { getWalletBackendData } from "../../../js/backend/wallets/wallet.js";
import { initilizeEditButtons } from "../../template/templateJs/site/wallets.js";

async function getWalletsContent(data) {
    setLoader(data);

    let backenddata = await getWalletBackendData();

    let walletsContent = await getCompromisedAndSponsorWallets(backenddata);
    data.content = walletsContent;
    await setContent(data);

    await initilizeEditButtons();
}

export { getWalletsContent };