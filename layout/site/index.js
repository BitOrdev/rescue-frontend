import { controller } from "../layoutController/controller.js";

(async () => {

  let setupSidebar_result = await controller({ name: "setupSidebar" });
  let setupHeader_result = await controller({ name: "setupHeader" });

  let HomeContentResult = await controller({ name: "getContainerContent"});

})();
