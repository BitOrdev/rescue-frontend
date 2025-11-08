import { showToast } from "../../../../js/static/toast.js";

async function iniDonateAddressCopy() {
  let donateAddressCopyBtn = document.querySelector(".donateAddressCopyBtn");
  donateAddressCopyBtn.addEventListener("click", function () {
    let copyValue = donateAddressCopyBtn.dataset.copyvalue.trim();
    if (!copyValue) {
      return;
    } else {
      copyDonateAddress(copyValue);
    }
  });
}

function copyDonateAddress(address) {
  try {
    navigator.clipboard
      .writeText(address)
      .then(() => showToast({ message: "Donate Address Copied" }))
      .catch((err) =>
        showToast({ message: "Copy Failed: " + err.message, type: 3 })
      );
  } catch (error) {
    showToast({ message: "Unexpected error: " + error.message, type: 3 });
  }
}

export { copyDonateAddress, iniDonateAddressCopy };
