import { getHomeHeader } from "../../template/template.js";
import { controller } from "../controller.js";

import { getHeaderBackendData } from "../../../js/backend/site/getHeaderBackend.js";

async function setupHeader() {
  let headerBackendData = await getHeaderBackendData();

  let headerContent = await getHomeHeader(headerBackendData);
  let headerElement = document.getElementById("header");
  headerElement.innerHTML = headerContent;

  await initializeHeader();
  await initializeSideBarThreeLine();
}

async function initializeHeader() {
  let allNavLinks = document.querySelectorAll(".nav-link");
  allNavLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      let contentName = link.getAttribute("data-content");
      controller({ name: "getContainerContent", data: { page: contentName } });
    });
  });
}

async function initializeSideBarThreeLine() {
  let threeLineButton = document.querySelector(".three_side_open_btn");
  threeLineButton.addEventListener("click", function () {
    let sidebar = document.querySelector(".sidebar");

    sidebar.classList.toggle("sideBar_opened");
  });
}

export { setupHeader };
