browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "downloadImage") {
    fetch(request.url, {
      headers: { "User-Agent": "Mozilla/5.0" },
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        browser.downloads.download({
          url,
          filename: `downloaded-${Date.now()}.jpg`,
          saveAs: true,
        });
        sendResponse({ success: true });
      })
      .catch((err) => {
        console.error("Download failed:", err);
        sendResponse({ success: false, error: err.message });
      });

    return true; // keeps message channel open for async work
  }
});