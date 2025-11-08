
async function getCompromisedAndSponsorWallets(data) {
    let html = `
    
        <style>

            .walletContainer {
                width: 100%;
            }

            .walletManageHeader {
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
                margin-bottom: 40px;
                padding: 30px 20px;
                border-radius: 16px;

                box-shadow: 0 0 25px var(--nav_gradient_one);
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

            .walletManageHeader h2 {
                font-size: 2.25rem;
                font-weight: 700;
                color: var(--white);
                margin-bottom: 12px;
            }

            .walletManageHeader p {
                font-size: 1.125rem;
                color: var(--nav_hover_gradient_two);
                max-width: 600px;
            }

            .wallets {
                display: grid;
                grid-template-columns: 1fr;
                gap: 30px;
            }

            @media (min-width: 768px) {
                .wallets {
                    grid-template-columns: 1fr 1fr;
                }
            }

            .walletCard {
                background: var(--black);
                border-radius: 8px;
                overflow: hidden;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
                box-shadow: 0px 0px 5px var(--card_badge_bg);
            }

            .walletCard:hover {
                transform: translateY(-5px);
            }

            .walletHeader {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 24px;
                border-bottom: 1px solid var(--body_black);
            }

            .walletHeader h3 {
                font-size: 1.5rem;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 10px;
                color: var(--white);
            }

            .walletHeader h3 i {
                font-size: 1.25rem;
            }

            .compromisedWalletDiv .walletHeader {
                background-color: var(--danger_tr_bg_2);
                border-left: 4px solid var(--danger);
            }

            .sponsorWalletDiv .walletHeader {
                background-color: var(--success_tr_bg_2);
                border-left: 4px solid var(--success);
            }

            .btn {
                padding: 8px 16px;
                border-radius: 6px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
                border: none;
                display: inline-flex;
                align-items: center;
                gap: 6px;
                font-size: 0.875rem;
            }

            .btn-primary {
                background-color: var(--nav_gradient_two);
                color: var(--black);
            }

            .btn-primary:hover {
                background-color: var(--banner_gradient_one);
                color: var(--white);
            }

            .btn-danger {
                background-color: var(--danger);
                color: var(--black);
            }

            .btn-danger:hover {
                background-color: var(--danger_bg);
                color: var(--white);
            }

            .walletBody {
                padding: 24px;
            }

            .walletInfoItem {
                display: flex;
                flex-direction: column;
                margin-bottom: 20px;
            }

            .walletInfoItem label {
                font-size: 0.875rem;
                font-weight: 500;
                color: var(--nav_hover_gradient_two);
                margin-bottom: 6px;
            }

            .walletInfoValue {
                display: flex;
                align-items: center;
                gap: 12px;
            }

            .walletInfoValue p {
                background-color: var(--nav_hover_gradient_two_2);
                padding: 10px 14px;
                border-radius: 6px;
                font-family: 'Courier New', monospace;
                font-size: 0.875rem;
                flex: 1;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                color: var(--white);
            }

            .copyBtn {
                background-color: var(--nav_hover_gradient_two_2);
                color: var(--white);
                border: none;
                border-radius: 6px;
                padding: 8px 12px;
                cursor: pointer;
                transition: background-color 0.2s;
                display: flex;
                align-items: center;
                gap: 6px;
            }

            .copyBtn:hover {
                background-color: var(--nav_hover_gradient_two);
            }

            .balanceItem {
                background-color: var(--nav_hover_gradient_two_2);
                border-radius: 8px;
                padding: 5px;
                text-align: center;
                text-align: left;
                padding-left: 1rem;
                margin: 5px;
                color: var(--white);
            }

            .refreshBtn {
                width: 100%;
                margin-top: 16px;
                padding: 12px;
                background-color: var(--nav_gradient_two);
                color: var(--black);
                border: none;
                border-radius: 6px;
                font-weight: 600;
                cursor: pointer;
                transition: background-color 0.2s;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 8px;
            }

            .refreshBtn:hover {
                background-color: var(--banner_gradient_one);
                color: var(--white);
            }

            .statusBadge {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                padding: 4px 10px;
                border-radius: 20px;
                font-size: 0.75rem;
                font-weight: 500;
            }

            .statusBadge.danger {
                background-color: var(--danger_tr_bg);
                color: var(--danger);
            }

            .statusBadge.success {
                background-color: var(--success_tr_bg);
                color: var(--success);
            }

            .walletActions {
                display: flex;
                gap: 12px;
                margin-top: 20px;
            }

            .walletActions .btn {
                flex: 1;
                justify-content: center;
            }

            .safeWalletAddress{
              padding: 1rem;
              margin-bottom: 1rem;
              border-radius: 10px;
              background-color: var(--black);
              box-shadow: 0px 0px 5px var(--card_badge_bg);
            }
            .safeWalletAddInpDiv{
               display: flex;
               align-items: center;
               gap: 1rem;
               background-color: var(--nav_hover_gradient_two_2);
               border-radius: 5px;
               color: var(--white);
               padding: 10px;
               justify-content: space-between;
            }
            .safeWallCopyBtn{
               background-color: var(--nav_gradient_two);
               color: var(--black);
            }
            .safeWallCopyBtn:hover{
               background-color: var(--banner_gradient_one);
               color: var(--white);
            }
            .safeWalletBtns{
              display: flex;
              align-items:center;
              gap: 1rem;
            }
        </style>
        
        <div class="walletContainer">
            
            <div class="walletManageHeader moveGradientAniClass">
                <h2>Wallet Management</h2>
                <p>Manage your wallet settings and preferences here. Securely view and manage your wallet details.</p>
            </div>

            <h1 style="color:var(--white); margin-bottom: 0.5rem;">Safe Wallet</h1>

            <div class="safeWalletAddress">
                <div class="walletInfoItem">
                        <h3 style="color:var(--white); font-weight: bold;">Your Safe Wallet Address</h3>
                        <br>
                        <div class="safeWalletAddInpDiv">
                            <p class="safewalletaddress_p">${data.safeWalletAddress}</p>
                            <div class="safeWalletBtns">
                              <button class="copyBtn copyBtnValue" data-copyvalue="${data.safeWalletAddress}">Copy</button>
                              <button class="copyBtn safeWallCopyBtn wallet_edit_buttons" data-editname="safeWalletAddress">Edit</button>
                            </div>
                        </div>
                </div>
            </div>


            <h1 style="color:var(--white); margin-bottom: 0.5rem;">Wallets</h1>

            <div class="wallets">
                <div class="walletCard compromisedWalletDiv">
                    <div class="walletHeader">
                        <h3>Compromised Wallet</h3>
                        <span class="statusBadge danger"> Compromised</span>
                    </div>
                    <div class="walletBody">
                    <div class="walletInfoItem">
                            <label>Wallet Private Key</label>
                            <div class="walletInfoValue">
                                <p class="compromisedwalletprivatekey_p">${data.compromisedwalletprivatekey}</p>
                                <button class="copyBtn copyBtnValue" data-copyvalue="${data.compromisedwalletprivatekey}">
                                    Copy
                                </button>
                            </div>
                    </div>
                    <div class="walletInfoItem">
                            <label>Wallet Address</label>
                            <div class="walletInfoValue">
                                <p class="compromisedwalletprivatekey_p_a">${data.compromisedwalletaddress}</p>
                                <button class="copyBtn copyBtnValue" data-copyvalue="${data.compromisedwalletaddress}">
                                     Copy
                                </button>
                            </div>
                    </div>
                    <div class="walletActions">
                            <button class="btn btn-primary wallet_edit_buttons" data-editname="compromisedWalletPrivatekey">Edit</button>
                            <button class="btn btn-danger delete_compromisedWallet_privatekey">Delete</button>
                    </div>
                    </div>
                </div>
                
                <div class="walletCard sponsorWalletDiv">
                    <div class="walletHeader">
                        <h3>Sponsor Wallet</h3>
                        <span class="statusBadge success">Active</span>
                    </div>
                    <div class="walletBody">
                        <div class="walletInfoItem">
                            <label>Wallet Private Key</label>
                            <div class="walletInfoValue">
                                <p class="sponsorwalletprivatekey_p">${data.sponsorwalletprivatekey}</p>
                                <button class="copyBtn copyBtnValue" data-copyvalue="${data.sponsorwalletprivatekey}">
                                   Copy
                                </button>
                            </div>
                        </div>
                        <div class="walletInfoItem">
                            <label>Wallet Address</label>
                            <div class="walletInfoValue">
                                <p class="sponsorwalletprivatekey_p_a">${data.sponsorwalletaddress}</p>
                                <button class="copyBtn copyBtnValue" data-copyvalue="${data.sponsorwalletaddress}">
                                 Copy
                                </button>
                            </div>
                        </div>

                        <div class="walletActions">
                            <button class="btn btn-primary wallet_edit_buttons" data-editname="sponsorWalletPrivatekey">Edit</button>
                        </div>
                        <div class="walletActions">
                            <button class="btn btn-primary create_sponsor_walletBtn" data-keyname="sponsorwalletprivatekey">Create</button>
                        </div>

                         <br>

                 <!--   <div class="sponsorWalletBalances">
                            <div class="balanceItem">
                                <b>Ethereum: </b><span>00</span><span> Eth</span>
                            </div>
                    </div> 

                    <button class="refreshBtn" id="refreshBalance">
                            Refresh Balance
                    </button>
                -->
                    
                </div>
            </div>

        </div>
        
    `;

    return html;
}
export { getCompromisedAndSponsorWallets };