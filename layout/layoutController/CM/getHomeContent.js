import { getHomeCards, getHomeMain, } from "../../template/template.js";
import { svgs } from "../../template/config/svg/svg.js";
import { cards } from "../../template/config/details/cards.js";

import { controller } from "../controller.js";

import { setContent, setLoader } from "./configures.js";

async function getHomeContent(data) {
    setLoader(data);

    let homeContent = await getHomeMain({ cards: await getHomeCards( {svgs, cards} ) });
    data.content = homeContent;
    await setContent(data);

    initializeCardContent();
}

async function initializeCardContent(){
    let allRescueCards = document.querySelectorAll(".rescue_cards");
    allRescueCards.forEach( async (singleRescueCards) => {
        singleRescueCards.addEventListener('click',  async function(){
            let cardContentName = singleRescueCards.dataset.cardcontent.toLowerCase();
            if(cardContentName == "" || cardContentName == undefined || cardContentName == null){
                return;
            }
            await controller({ name: "getContainerContent" , data: { page: cardContentName } }); 
        })
    });
}

export { getHomeContent };
