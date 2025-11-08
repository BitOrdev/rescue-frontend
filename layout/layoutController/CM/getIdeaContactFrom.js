import { getIdeaContactForm } from "../../template/template.js";
import { setContent, setLoader } from "./configures.js";

import { iniIdeaContactForm } from "../../template/templateJs/site/idea_contact_form.js";

async function getIdeaContactFormTem(data) {
  setLoader(data);

  let ideaContactformContent = await getIdeaContactForm();
  data.content = ideaContactformContent;
  await setContent(data);

  await iniIdeaContactForm();
}

export { getIdeaContactFormTem };
