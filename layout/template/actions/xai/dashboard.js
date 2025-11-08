async function getXaiDashboard(data){
    data = data.data;

    function formatTimeLeft(seconds) {
        if (seconds <= 0) return "Expired";

        const days = Math.floor(seconds / 86400);
        const hours = Math.floor((seconds % 86400) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);

        let parts = [];
        if (days > 0) parts.push(`${days}d`);
        if (hours > 0) parts.push(`${hours}h`);
        if (minutes > 0) parts.push(`${minutes}m`);

        // if everything is zero but still not expired
        if (parts.length === 0) parts.push("less than 1m");

        return parts.join(" ");
    }

    // staed pool 
    let poolsHtml = ``;
    let totalUnclaimedEsxai = 0;

    try {
        for (let index = 0; index < data.pools.length; index++) {
        totalUnclaimedEsxai += Number(data.pools[index].userClaimAmount);

        poolsHtml += `
        <details class="pool allPoolsDetails" data-poolAddress="${data.pools[index].address}">
                <summary>
                <div class="name">${data.pools[index].name}</div>
                </summary>
                <div class="pool-content">
                    <div class="pool-details">
                        <div class="keystaked">Keys Staked: <b>${data.pools[index].userStakedKeyAmount}</b></div>
                        <div class="esxaistaked">ESXAI Staked: <b>${data.pools[index].userStakedEsXaiAmount}</b></div>
                    </div>
                    <div class="buttons">
                        <button class="stakeKeyButton">Stake Key</button>
                        <button class="unstakeKeyButton">Unstake Key</button>
                        <button class="stakeEsxaiButton">Stake ESXAI</button>
                        <button class="unstakeEsxaiButton">Unstake ESXAI</button>
                      <!--  <button class="claimRewardsButton">Claim Rewards</button> -->
                    </div>
                </div>
            </details>
        `;
        }
    } catch (error) {
      console.log(error)
    }

    let claimXaiAmount = 0;
    // redeem request 
    let redeemCardHtml = ``;
    try {
        for (let index = 0; index < data.redeemHistory.length; index++) {
                let singleRedeem = data.redeemHistory[index];
                
                let claimedBtnClass = "";
                let claimBtnInner = "";

                let cancleorclaimText = "";
                let cancleButton = ``;
                let isForClaim = false;

                if(singleRedeem.isClaimed){
                    if (singleRedeem.cancelled){
                        claimedBtnClass = "xaiCancled";
                        claimBtnInner = "Cancled";
                    } else{
                        claimedBtnClass = "xaiClaimed";
                        claimBtnInner = "Claimed";
                    }
                    cancleorclaimText = claimBtnInner;
                    isForClaim = false;
                }else{
                    if (singleRedeem.claimTimeLeft > 0){              
                        claimedBtnClass = "xaiCountDown";
                        claimBtnInner = formatTimeLeft(singleRedeem.claimTimeLeft);
                        cancleButton = `<button class="cancleRedeemButton" data-id="${singleRedeem.id}">Cancel</button>`;
                    } else{
                        claimedBtnClass = "";
                        claimBtnInner = "Claim";
                        isForClaim = true;
                        claimXaiAmount = singleRedeem.xaiBalance;
                    }
                }

                let cancleOrClaimedHtml = "";
                if (singleRedeem.cancelOrClaimDate){
                    cancleOrClaimedHtml = `<div class="claimOrCancledDate"><b> ${cancleorclaimText}:</b> ${singleRedeem.cancelOrClaimDate}</div>`;
                }

                redeemCardHtml += `
                    <div class="singleClais">
                        <div class="claimAmount"><b>${singleRedeem.xaiBalance}</b> XAI</div>
                        <div class="esxaiMaount">from <b>${singleRedeem.balance}</b> ESXAI</div>
                        <div class="claimDate"><b>Request:</b> ${singleRedeem.redeemRequestDate}</div>
                        ${cancleOrClaimedHtml}
                        <div class="redeemBtnsDiv">
                            <button data-id="${singleRedeem.id}" data-isforclaim="${isForClaim}" class="claimNowButton claimSingleXaiRequest ${claimedBtnClass}">${claimBtnInner}</button>
                            ${cancleButton}
                        </div>
                    </div>
                `;

        }
    } catch (error) {
        console.log(error)
    }
    
    let getXaiDashboardHtml = `
    
    <style>

        .xaiDashboard h2 {
            font-size: 1.5rem;
            color: #ff0000;
        }

        .xaiDashboard{
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            margin-bottom: 40px;
            padding: 30px 20px;
            border-radius: 16px;

            box-shadow: 0 0 25px var(--nav_gradient_one);
            color: var(--white);
        }

        @keyframes moveGradient {
            0% {
                background-position: 0% 50%;
            }
            50% {
                background-position: 100% 50%;
            }
            100% {
                background-position: 0% 50%;
            }
        }
        .xaiContent {
            width: 100%;
            margin: 0 auto;
        }

        section {
            background: var(--black);
            border-radius: 1rem;
            padding: 24px;
            margin-bottom: 24px;
        }

        section:hover {
            box-shadow: 0 8px 25px var(--card_badge_bg);
        }

        h1,
        h2,
        h3,
        h4 {
            color: var(--white);
            margin-bottom: 16px;
        }

        h1 {
            font-size: 32px;
            background: linear-gradient(135deg, var(--danger_bg), var(--danger));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            padding-bottom: 10px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        h2 {
            font-size: 22px;
            color: var(--danger);
            display: flex;
            align-items: center;
            gap: 8px;
        }

        /* Dashboard Section */
        .dashboardContent {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .balances {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
        }

        .esxai,
        .xai,
        .snl {
            background: var(--danger_tr_bg);
            padding: 20px;
            border-radius: 1rem;
            text-align: center;
            border-left: 4px solid var(--danger);
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
        }

        .esxai:hover,
        .xai:hover,
        .snl:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 15px var(--danger_tr_bg_2);
        }

        .esxai h4,
        .xai h4,
        .snl h4 {
            color: var(--white);
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }

        .esxai p,
        .xai p,
        .snl p {
            font-size: 28px;
            font-weight: bold;
            color: var(--white);
        }

        /* Claim Section */
        .claimSection {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: linear-gradient(135deg, var(--banner_gradient_one), var(--banner_gradient_two));
            padding: 20px;
            border-radius: 1rem;
            color: var(--white);
            position: relative;
            overflow: hidden;
        }

        .claimSection::before {
            content: "";
            position: absolute;
            top: -50%;
            right: -50%;
            width: 100%;
            height: 200%;
            background: var(--card_badge_bg);
            transform: rotate(30deg);
        }

        .claimBalances {
            font-size: 28px;
            font-weight: bold;
            position: relative;
            z-index: 1;
        }

        .claimAllButton {
            background: var(--white);
            color: var(--black);
            border: none;
            padding: 12px 24px;
            border-radius: 30px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            z-index: 1;
        }

        .claimAllButton:hover {
            background: transparent;
            transform: scale(1.05);
            color: var(--white);
            box-shadow: 0px 0px 5px var(--nav_hover_gradient_two_2);
            border: 1px solid var(--white);
        }

        /* Staking Section with Details/Summary */
        .pools {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 20px;
        }

        .pool {
            border: 1px solid var(--nav_hover_gradient_two);
            border-radius: 1rem;
            overflow: hidden;
            transition: all 0.3s ease;
            background: var(--body_black);
        }

        .pool:hover {
            box-shadow: 0 4px 20px var(--card_badge_bg);
        }

        .pool summary {
            padding: 20px;
            cursor: pointer;
            list-style: none;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: var(--nav_hover_gradient_one);
            transition: all 0.3s ease;
            color: var(--white);
        }

        .pool summary::-webkit-details-marker {
            display: none;
        }

        .pool summary::after {
            content: "+";
            font-size: 24px;
            font-weight: bold;
            color: var(--danger);
            transition: all 0.3s ease;
        }

        .pool[open] summary::after {
            content: "-";
            color: var(--danger);
        }

        .pool summary:hover {
            background: var(--nav_hover_gradient_two_2);
        }

        .pool summary:hover::after {
            color: var(--white);
        }

        .pool-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-bottom: 15px;
            padding: 0 20px;
        }

        .pool-details div {
            padding: 12px;
            background: var(--danger_tr_bg_2);
            border-radius: 8px;
            text-align: center;
            color: var(--white);
        }

        .pool-details b {
            color: var(--danger);
            font-size: 18px;
        }

        .buttons {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            padding: 0 20px 20px;
        }

        .buttons button {
            padding: 12px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 14px;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
        }

        .stakeKeyButton,
        .stakeEsxaiButton {
            background: var(--success);
            color: white;
        }

        .unstakeKeyButton,
        .unstakeEsxaiButton {
            background: var(--banner_gradient_two);
            color: var(--white);
        }

        .claimRewardsButton {
            background: var(--danger);
            color: white;
            grid-column: span 2;
        }

        .buttons button:hover {
            opacity: 0.9;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px var(--card_badge_bg);
        }

        /* Redeem Section */
        .redeem_section {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
        }

        .convertintoxai {
            background: var(--body_black);
            padding: 20px;
            border-radius: 1rem;
            transition: all 0.3s ease;
            border: 1px solid var(--nav_hover_gradient_two);
        }

        .convertintoxai:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px var(--card_badge_bg);
        }

        .convertintoxai h2 {
            margin-bottom: 15px;
            color: var(--danger);
        }

        .input-group {
            margin-bottom: 15px;
        }

        .input-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: 600;
            color: var(--white);
        }

        .convertintoxai input,
        .convertintoxai select {
            width: 100%;
            padding: 12px;
            border: 1px solid var(--nav_hover_gradient_two);
            border-radius: 6px;
            font-size: 16px;
            transition: all 0.3s ease;
            background: var(--black);
            color: var(--white);
        }

        .convertintoxai input:focus,
        .convertintoxai select:focus {
            outline: none;
            border-color: var(--danger);
            box-shadow: 0 0 0 2px var(--danger_tr_bg);
        }

        .convertButton {
            width: 100%;
            background: var(--danger);
            color: white;
            border: none;
            padding: 14px;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }

        .convertButton:hover {
            background: var(--danger_bg);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px var(--danger_tr_bg);
        }

        /* Claims Section */
        .claims {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 20px;
        }

        .singleClais {
            box-shadow: 0px 0px 3px var(--danger);
            border-radius: 1rem;
            padding: 20px;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            background: var(--body_black);
        }

        .singleClais::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 5px;
            height: 100%;
            background: linear-gradient(to bottom, var(--danger), var(--banner_gradient_two));
        }

        .singleClais:hover {
            box-shadow: 0 4px 20px var(--card_badge_bg);
            transform: translateY(-3px);
        }

        .claimAmount {
            font-size: 22px;
            font-weight: bold;
            color: var(--danger);
            margin-bottom: 5px;
        }

        .esxaiMaount,
        .claimDate {
            color: var(--white);
            margin-bottom: 5px;
        }

        .redeemBtnsDiv{
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.5rem;
        }

        .claimNowButton {
            width: 100%;
            background: var(--danger);
            color: white;
            border: none;
            padding: 12px;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 10px;
            font-weight: 600;
        }

        .cancleRedeemButton{
            width: 100%;
            background: var(--danger_tr_bg);
            color: white;
            border: none;
            padding: 12px;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 10px;
            font-weight: 600;
        }


        .claimNowButton:disabled {
            background: var(--nav_hover_gradient_two);
            color: var(--card_desc_text);
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }

        .pool-content{
            margin-top: 0.5rem;
        }

        .claimOrCancledDate{
           color: var(--white);
        }

        .xaiClaimed{
           background-color: var(--success_tr_bg);
        }

        .xaiCancled{
           background-color: var(--loader_shadow);
        }
        .xaiCountDown{
           background-color: var(--banner_gradient_two);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .balances {
                grid-template-columns: 1fr;
            }
            
            .claimSection {
                flex-direction: column;
                gap: 15px;
                text-align: center;
            }
            
            .pools,
            .claims {
                grid-template-columns: 1fr;
            }
            
            .redeem_section {
                grid-template-columns: 1fr;
            }
            
            .pool-details {
                grid-template-columns: 1fr;
            }
        }
        </style>

        <div class="xaiDashboard moveGradientAniClass">
            <h2 style="font-size: 1.5rem; color: #ff0000;">Xai Games [Arbitrum Network]</h2>
            <p>XAI Games – perform transactions for any XAI game smart contract.</p>
        </div>

        <div class="xaiContent">
            <section class="dashboard">
                <h1>XAI Staking Dashboard</h1>
                <div class="dashboardContent">
                <div class="availableBalanceTitle"><h3>Available Balance</h3></div>
                <div class="balances">
                    <div class="esxai">
                        <h4>ESXAI</h4>
                        <p>${Number(
                          Number(data.esXaiFormatedBalance).toFixed(3)
                        )}</p>
                    </div>
                    <div class="xai">
                        <h4>XAI</h4>
                        <p>${Number(
                          Number(data.xaiFormatedBalance).toFixed(3)
                        )}</p>
                    </div>
                    <div class="snl">
                        <h4>Sentry Key</h4>
                        <p>${Number(Number(data.snlBalance).toFixed(3))}</p>
                    </div>
                </div>
                </div>
            </section>

            <section class="claimFromAllPoolBalance">
                <h2>Claim Redemptions</h2>
                <div class="claimSection">
                    <div class="claimBalances">${claimXaiAmount} XAI</div>
                    <button class="claimAllButton claimAllXaiBtn">Claim</button>
                </div>
            </section>

            <section class="claimFromAllPoolBalance">
                <h2>Claim From All Pool Balance</h2>
                <div class="claimSection">
                    <div class="claimBalances">${totalUnclaimedEsxai} esXAI</div>
                    <button class="claimAllButton claimAllEsxaiFromPoolsBtn">Claim All</button>
                </div>
            </section>

            <section class="stakingSection">
                <h2>Staking Pools</h2>
                <div class="pools">

                    ${poolsHtml}

                </div>
            </section>

            <section class="redeem_section">
                <div class="convertintoxai">
                    <h2>Convert into XAI</h2>
                    <div class="input-group">
                        <label for="xai-amount">XAI Amount</label>
                        <input type="text" id="xai-amount" placeholder="Enter XAI amount" />
                    </div>
                    <div class="input-group">
                        <label for="esxai-amount">ESXAI Amount</label>
                        <input type="text" id="esxai-amount" placeholder="Enter ESXAI amount" />
                    </div>
                    <button class="convertButton">Convert</button>
                    </div>

                    <div class="convertintoxai">
                    <h2>ESXAI to XAI</h2>
                    <div class="input-group">
                        <label for="esxai-convert-input">ESXAI Amount</label>
                        <input
                        type="number"
                        id="esxai-convert-input"
                        placeholder="Enter ESXAI amount"
                        />
                    </div>
                    <div class="input-group">
                        <label for="timeperiod">Vesting Period</label>
                        <select name="timeperiod" id="timeperiod">
                        <option value="15">15 days</option>
                        <option value="90">90 days</option>
                        <option value="180">180 days</option>
                        </select>
                    </div>
                    <button class="convertButton esxai-to-xai-convert-btn">Convert</button>
                </div>
            </section>

            <section class="xaiclaimsection">
                <h2>XAI Claims</h2>
                <div class="claims">

                ${redeemCardHtml}

                <!--    <div class="singleClais">
                        <div class="claimAmount">10 XAI</div>
                        <div class="esxaiMaount">from 40 ESXAI</div>
                        <div class="claimDate">Date: 2024-01-02</div>
                        <button class="claimNowButton" disabled>Available: 2024-01-17</button>
                    </div>
                -->

                </div>
            </section>
        </div>
    `;

    return getXaiDashboardHtml;
}

export { getXaiDashboard }