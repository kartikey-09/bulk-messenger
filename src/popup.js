document.addEventListener("DOMContentLoaded", function () {
    chrome.tabs.query({ url: "https://web.whatsapp.com/*" }, function (tabs) {
        if (tabs.length === 0) {
            chrome.tabs.create({ url: "https://web.whatsapp.com/" });
        }
    });
});

const button = document.querySelector("#btn");

button.addEventListener("click", async () => {
    const numbers = document.querySelector("#number").value.split(",");
    const message = document.querySelector("#message").value;

    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
        const response = await chrome.tabs.sendMessage(tabs[0].id, {
            action: "send_message",
            numbers,
            message,
        });

        console.log(response);
    });
});
