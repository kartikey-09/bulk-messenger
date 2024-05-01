chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "send_message") {
        const { numbers, message } = request;

        numbers.forEach((number) => {
            const url = `https://web.whatsapp.com/send/?phone=${number}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=1`;

            window.location.href = url;
        });

        // Send a response back to the popup script
        sendResponse({ received: true });
    }
});
