// Get the og:image from the page
const ogImage = document.querySelector('meta[property="og:image"]')?.content;

// Listen for a request from the popup
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getOgImage") {
    sendResponse({ url: ogImage });
  }
});