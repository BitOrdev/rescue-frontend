import { getSidebar, setUpActiveNavItem} from "../../template/template.js";
import { tabs } from "../../template/config/details/sideTabs.js";
import { svgs } from "../../template/config/svg/svg.js";

import { getContainerContent } from "./getContainerContent.js";
import { iniDonateAddressCopy } from "../../template/templateJs/site/sidebar.js";

async function setupSidebar(data) {
  // Append the sidebar to the container
  const container = document.querySelector("#body");
  let sidebar = await getSidebar({ tabs , svgs});
  container.insertAdjacentHTML("afterbegin", sidebar);

  let activeNavBar = tabs[0].name;
  setUpActiveNavItem({ activeNavBar });

  await enableSideBarLinks();
  await setUpTabSwitching();
  await setupContactFormSwitch();
  await iniDonateAddressCopy();
}

async function enableSideBarLinks(data){
    const AllnavItems = document.querySelectorAll(".nav-item");
    AllnavItems.forEach((element) => {
        element.addEventListener("click", async function () {
            let elementName = element.dataset.content.trim();
            setUpActiveNavItem({ activeNavBar: elementName });
        });
    });
}

async function setUpTabSwitching(data) {
    let AllnavItems = document.querySelectorAll(".nav-item");
    AllnavItems.forEach((element) => {
        element.addEventListener("click", async function () {
            let container = document.getElementById("container");
            getContainerContent({ page: element.dataset.content , appendParent: container });
        });
    });
}

async function setupContactFormSwitch(){
    let idea_contact_form_div = document.querySelector('.idea-contact-form-div');
    idea_contact_form_div.addEventListener('click',function(){
        getContainerContent({ page: "idea_contact_form" });
    })
}

export { setupSidebar, enableSideBarLinks, setUpTabSwitching };