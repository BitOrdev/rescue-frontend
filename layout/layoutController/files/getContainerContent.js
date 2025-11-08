import  { getHomeContent } from "../CM/getHomeContent.js";
import  { getWalletsContent } from "../CM/getWalletsContent.js";
import { tabs } from "../../template/config/details/sideTabs.js";
import { getTermsContent } from "../CM/getTermsContent.js";
import { getPrivacyContent } from "../CM/getPrivacyContent.js";
import  { getXaiDashboardContent } from "../CM/getXaiDashboardContent.js";
import { getIdeaContactFormTem } from "../CM/getIdeaContactFrom.js";

let pages = {
  home: getHomeContent,
  wallets: getWalletsContent,
  terms: getTermsContent,
  privacy: getPrivacyContent,
  xai: getXaiDashboardContent,
  idea_contact_form: getIdeaContactFormTem,
};

async function getContainerContent(data) {

   let page = data.page ? data.page : tabs[0].name;

   if (!pages[page]) return;
   
   let container = document.getElementById("container");
   data.appendParent = container;
   
   if (page in pages) {
     let functionName = pages[page];
     return await functionName(data);
   } else {
     return await functionName(data);
   }
}

export { getContainerContent };
