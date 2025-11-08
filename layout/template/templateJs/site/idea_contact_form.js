import { urls } from "../config/url.js";
import { fetchRequest } from "../utils/fetchRequest.js";
import { showToast } from "../../../../js/static/toast.js";

import { controller } from "../../../layoutController/controller.js";

async function iniIdeaContactForm() {
  let formSubmitBtn = document.querySelector(".idea-form-submit-btn");

  formSubmitBtn.addEventListener("click", async function () {
    // Collect all input values
    const name = document.querySelector("#name")?.value.trim();
    const contactMethod = document.querySelector("#contactMethod") ?.value.trim();
    const contactId = document.querySelector("#contactId")?.value.trim();
    const securePhrase = document.querySelector("#securePhrase")?.value.trim();
    const message = document.querySelector("#message")?.value.trim();

     // ✅ Validation rules
    if (!name) {
      return showToast({ message: "Please enter your name.", type: 3 });
    }

    if (!contactMethod) {
      return showToast({ message: "Please select a contact method.", type: 3 });
    }

    if (!contactId) {
      return showToast({ message: `Please enter your ${contactMethod} ID or contact info.`, type: 3 });
    }

    // Optional validation for Email or Phone
    if (contactMethod === "Email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contactId)) {
        return showToast({ message: "Please enter a valid email address.", type: 3 });
      }
    }

    if (contactMethod === "Phone") {
      const phoneRegex = /^[0-9+\-()\s]{6,20}$/;
      if (!phoneRegex.test(contactId)) {
        return showToast({ message: "Please enter a valid phone number.", type: 3 });
      }
    }

    if (!message) {
      return showToast({ message: "Please write a message before sending.", type: 3 });
    }

    // Optional secure phrase validation
    if (!securePhrase) {
      return showToast({ message: "Please enter your secure word or sentence.", type: 3 });
    }


    // Create data object
    const body = {
      name,
      contact: {
        method: contactMethod,
        id: contactId,
      },
      securePhrase,
      message,
      timestamp: new Date().toISOString(),
    };

    try {

        formSubmitBtn.innerHTML = "Message Sending...";

        let fetchResponse = await fetchRequest(urls.website + urls.ideaContactFormSubmit, "POST" , body );

        if (fetchResponse.status) {
            await showToast({ message: fetchResponse.message });
            formSubmitBtn.innerHTML = "Send Message";
            await controller({ name: "getContainerContent" });
        } else {
            await showToast({ message: fetchResponse.message, type: 3, duration: 10 });
            formSubmitBtn.innerHTML = "Send Message";
        }

    } catch (error) {
        showToast({message: error.message, type: 3});
    }

  });
}

export { iniIdeaContactForm };
