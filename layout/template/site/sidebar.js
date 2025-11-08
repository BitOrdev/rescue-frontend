
async function getSidebar(data){

  let navs = data.tabs;
  let svgs = data.svgs;

  let allNavs = ``;
  for (let index = 0; index < navs.length; index++) {
    let singleNav = navs[index];

    let nav = `
      <div class="nav-item" id="${singleNav.id}" data-content="${singleNav.name}">
        ${svgs[singleNav.svg]}
        <span>${singleNav.label}</span>
      </div>
    `;
    allNavs += nav;
  }

  let aside = `
      <style>
        /* Sidebar */
        .sidebar {
            width: 20%;
            background: black;
            display: flex;
            flex-direction: column;
            padding: 20px 0;
            max-height: 100vh;
        }
  
        .sideBar_opened{
          left: 00px !important;
          z-index: +9999;
          min-height: 100%;
          transition: 0.2s ease;
        }
          
        .sidebar-content {
            flex: 1;
            padding: 0 20px;
            display: flex;
            flex-direction: column;
        }
  
        .nav-item {
            display: flex;
            align-items: center;
            padding: 12px 16px;
            margin-bottom: 4px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s ease;
            color:var(--white);
            font-weight: bold;
        }
  
        .nav-item:hover {
            background: linear-gradient(104deg, var(--nav_hover_gradient_one), var(--nav_hover_gradient_two));
        }
  
        .nav-item.active {
            background: linear-gradient(104deg, var(--nav_gradient_one), var(--nav_gradient_two));
            color: white;
        }
  
        .nav-icon {
            width: 20px;
            height: 20px;
            margin-right: 12px;
        }

        .list-app-btn {
            margin: 20px;
            padding: 12px 16px;
            border: 2px solid var(--white);
            border-radius: 8px;
            display: flex;
            align-items: center;
            cursor: pointer;
            transition: all 0.2s ease;
            color: var(--white);
            font-weight: 500;
            margin-top: auto;
        }
  
        .list-app-btn:hover {
            background: linear-gradient(134deg, var(--white), var(--nav_hover_gradient_two));
            color: var(--black);
        }
  
        .list-icon {
            width: 20px;
            height: 20px;
            margin-right: 8px;
        }


        .social-link {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            transition: all 0.3s ease;
            text-decoration: none;
            position: relative;
            overflow: hidden;
        }
        .social-link svg {
            width: 20px;
            height: 20px;
            fill: white;
        }
        .telegram {
            background: var(--telegram_bg);
        }
        .discord {
            background: var(--discord_bg);
        }
        
        .twitter {
            background: var(--twitter_bg);
        }


        @media (max-width: 768px) {
          .sidebar{
            position: absolute;
            left: -400px;
            width: auto !important;
          }
        }
          
      </style>
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-content">

        ${allNavs}
  
        <!-- List your app button -->
        <div class="list-app-btn idea-contact-form-div">
          <svg class="list-icon" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
            <line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" stroke-width="2"/>
            <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" stroke-width="2"/>
          </svg>
          <span>Request Your Idea</span>
        </div>

        <div style="display: flex; gap: 1rem; justify-content: center;">

          <a href="https://t.me/evm_recover" class="social-link telegram" target="_blank">
            ${svgs.telegram}
          </a>

          <a href="#" class="social-link discord" target="_blank">
            ${svgs.discord}
          </a>
          
          <a href="https://x.com/ncrypcode" class="social-link twitter" target="_blank">
            ${svgs.twitter}
          </a>

        </div>

        <div style="color: var(--white); display: flex; justify-content: center; align-items: center; gap: 8px; margin-top: 1rem;">
          <p style="margin: 0;">
            Donate: 
            <b id="shortAddress">0xd4dd...ea04</b>
          </p>
          &nbsp;&nbsp;
          <button 
            class="donateAddressCopyBtn"
            data-copyvalue="0xd4dd8a3b822df088a3a58d5dadacb4c7d09cea04"
            style="background: var(--primary, #1e90ff); color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer;">
            Copy
          </button>
        </div>
        
      </aside>
  `;

  return aside;

}

function setUpActiveNavItem(data) {

  let activeNav = data.activeNavBar;

  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((element) => {

    element.classList.remove("active");

    let elementName = element.dataset.content.trim();
    if(elementName.toLowerCase() == activeNav.toLowerCase()){
      element.classList.add("active");
    }

  });

}


export { getSidebar, setUpActiveNavItem };