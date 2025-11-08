import { getTerms } from "../../template/template.js";
import { setContent, setLoader } from "./configures.js";

async function getTermsContent(data) { 
  setLoader(data);

  let termsContent = await getTerms();
  data.content = termsContent;
  await setContent(data);

}

export { getTermsContent };
