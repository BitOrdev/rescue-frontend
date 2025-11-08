import { getHomeCards } from "./site/home_cards.js";
import { getHomeHeader } from "./site/home_header.js";
import { getHomeMain } from "./site/home_main.js";
import { getSidebar, setUpActiveNavItem } from "./site/sidebar.js";
import { getLoader } from "./site/loader.js";

import { getCompromisedAndSponsorWallets } from "./site/wallet/wallets.js";
import { getTerms } from "./site/static/terms.js";
import { getPrivacy } from "./site/static/privacy.js";

import { getXaiDashboard } from "./actions/xai/dashboard.js";

import { getIdeaContactForm } from "./site/static/idea-contact-form.js";

export {
  getHomeCards,
  getHomeMain,
  getHomeHeader,
  getSidebar,
  setUpActiveNavItem,
  getLoader,
  getCompromisedAndSponsorWallets,
  getTerms,
  getPrivacy,
  getXaiDashboard,
  getIdeaContactForm,
};
