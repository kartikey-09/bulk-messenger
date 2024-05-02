const findElement = (selector) => document.querySelector(selector);

const awaitFor = (selector) => {
  console.log("I have been called");
  return new Promise((resolve, reject) => {
    const readyToSend = findElement(selector);

    const invalid = readyToSend
      ? readyToSend.ariaLabel.includes("Voice message")
      : false;

    if (!invalid) {
      resolve();
    }
    setTimeout(() => {
      awaitFor(selector).then(resolve);
    }, 100);
  });
};

async function clickToSend() {
  try {
    await awaitFor("[data-tab='11']");
    document.querySelectorAll("footer button")[4].click();
  } catch (e) {
    console.log("Error: ", e);
  }
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === "send_message") {
    const { numbers, message } = request;

    await clickToSend();

    for (let i = 0; i < numbers.length; i++) {
      const url = `https://web.whatsapp.com/send/?phone=${numbers[i]}&text=${encodeURIComponent(message)}&type=phone_number`;

      window.location.href = url;
    }

    // Send a response back to the popup script
    sendResponse({ received: true });
  }
});
