import { getPrivacy } from "../../template/site/static/privacy.js";
import { setContent, setLoader } from "./configures.js";

async function getPrivacyContent(data) {
   setLoader(data);
   
   let privacyContent = await getPrivacy(data);
   data.content = privacyContent;
   await setContent(data);
}

export { getPrivacyContent };