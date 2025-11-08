async function getHomeCards(data){

    let cards = data.cards;
    let svgs = data.svgs;

    let allCards = ``;
    for (let index = 0; index < cards.length; index++) {
       let singleCard = cards[index];

       let card = `
        <div class="trending-card rescue_cards" data-cardcontent="${singleCard.name}">
            <div class="card-header" style="background: ${singleCard.bg_color};">
                <div class="card-icon" style="background: ${singleCard.svg_icon_bg};">
                  ${svgs[singleCard.svg]}
                </div>
            </div>
            <div class="card-content">
                <div class="card-tag">${singleCard.name}</div>
                <div class="card-tag">${singleCard.network}</div>
                <h3 class="card-title">${singleCard.title}</h3>
                <p class="card-description">${singleCard.desc}</p>
            </div>
        </div>
       `;
        allCards += card;
    }

    let s_cards = `
        <style>
           .trending-card {
                background: white;
                border-radius: 12px;
                overflow: hidden;
                transition: transform 0.2s ease, box-shadow 0.2s ease;
                cursor: pointer;
                min-width: 300px;
            }

            .trending-card:hover {
                transform: translateY(-4px);
            }

            .card-header {
                height: 120px;
                position: relative;
                overflow: hidden;
            }

            .card-icon {
                position: absolute;
                top: 16px;
                left: 16px;
                width: 40px;
                height: 40px;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
            }

            .card-icon svg {
                width: 24px;
                height: 24px;
            }

            .card-content {
                padding: 20px;
            }

            .card-tag {
                background: var(--card_badge_bg);
                color: var(--card_desc_text);
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 12px;
                font-weight: 500;
                display: inline-block;
                margin-bottom: 12px;
            }

            .card-title {
                font-size: 18px;
                font-weight: 600;
                margin-bottom: 8px;
                color: #333;
            }

            .card-description {
                color: var(--card_desc_text);
                font-size: 14px;
                line-height: 1.5;

                white-space: nowrap;      
                overflow: hidden;        
                text-overflow: ellipsis; 
            }
        </style>

        ${allCards}
    
    `;

    return s_cards;

}

export { getHomeCards };