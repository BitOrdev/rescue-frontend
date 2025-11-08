import { getLoader } from "../../template/template.js";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function setLoader(data) {
  let container = data.appendParent;

  let loader = await getLoader();
  container.innerHTML = loader;
}

async function setContent(data) {

  let walletsContent = data.content;

  await delay(500);

  container.innerHTML = walletsContent;
  return true;
}
export { setContent, setLoader };
