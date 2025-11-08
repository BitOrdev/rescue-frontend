import { setupSidebar} from "./files/setupSidebar.js";
import { getContainerContent } from "./files/getContainerContent.js";
import { setupHeader } from "./files/setupHeader.js";

let controllerList = {
  setupSidebar: setupSidebar,
  getContainerContent: getContainerContent,
  setupHeader: setupHeader,
};

async function controller(params) {
    let listName = params.name;
    let data = params.data ? params.data : {};
    if (listName in controllerList) {
        let functionName = controllerList[listName];
        return await functionName(data);
    } else {
        return "Name does not exists";
    }
}

export { controller };