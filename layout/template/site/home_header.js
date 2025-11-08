async function getHomeHeader(data) {
    let comWallAddress = `${data.compromisedwalletaddress.slice(0, 5)}...${data.compromisedwalletaddress.slice(-4)}`;
    let header = `
        <style>

            /* Header */
            .header {
                background: var(--black);
                padding: 16px 24px;
                border-bottom: 1px solid var(--body_black);
                display: flex;
                align-items: center;
                gap: 24px;

                position: sticky;
                top: 00px;
            }

            .logo {
                font-size: 24px;
                font-weight: 700;
                color: var(--white);
            }

            .search-container {
                flex: 1;
                max-width: 400px;
                position: relative;
            }

            .search-icon {
                position: absolute;
                left: 12px;
                top: 50%;
                transform: translateY(-50%);
                width: 20px;
                height: 20px;
                color: var(--black);
            }

            .search-input {
                width: 100%;
                padding: 10px 12px 10px 44px;
                border-radius: 8px;
                font-size: 14px;
                outline: none;
                transition: border-color 0.2s ease;
                border: none;
            }

            .header-nav {
                margin-left: auto;
                display: flex;
                align-items: center;
                gap: 24px;
            }
                
            .nav-link {
                text-decoration: none;
                color: var(--nav_hover_gradient_two);
                font-weight: 500;
                position: relative;
                transition: color 0.2s ease;
                cursor: pointer;
            }

            .nav-link:hover {
                color: var(--white);
            }

            .nav-link.active {
                color: var(--white);
            }

            

            .connect-btn {
                background: var(--nav_gradient_two);
                color: var(--black);
                border: none;
                padding: 10px 20px;
                font-weight: bold;
                border-radius: 8px;
                cursor: pointer;
                transition: background-color 0.1s ease;
            }

            .connect-btn:hover {
                background: var(--banner_gradient_two);
                color: var(--white);
                box-shadow: 0 0px 5px var(--banner_gradient_two);
            }

            .three_side_open_btn{
                display:  none;
                padding: 6px 10px;
                border-radius: 5px;
                font-size: 1.1rem;
                border: none;
                cursor: pointer;
            }

            @media (max-width: 768px) {
                .nav-link{
                    display: none;
                }
                .three_side_open_btn{
                   display: block;
                }
            }
            @media (max-width: 400px) {
                .search-container{
                    display: none;
                }
            }


        </style>

        <!-- Header -->
        <div class="header">
            <div class="logo">
                <span>Tcysed</span>
            </div>

            <div class="search-container">
                <svg class="search-icon" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
                <path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="2"/>
                </svg>
                <input type="text" placeholder="Search the hub" class="search-input">
            </div>

            <nav class="header-nav">
                <a class="nav-link" data-content="terms">Terms & Conditions</a>
                <a class="nav-link" data-content="privacy">Privacy Policy</a>
              <!--  <a href="#" class="nav-link">Resources</a> -->
              <!--  <a href="#" class="nav-link">About</a> -->
                <button class="connect-btn">${comWallAddress}</button>
                <button class="three_side_open_btn">&#9776;</button>
            </nav>
        </div>

    `;

    return header;
}

export { getHomeHeader };
