class PageDataMediaDownloader{
    constructor(imageMetaUrl, videoMetaUrl){
        this._imageMetaUrl = imageMetaUrl
        this._videoMetaUrl = videoMetaUrl
    }
    //Getters
    get imageMetaUrl(){
        return this._imageMetaUrl
    }
    get videoMetaUrl(){
        return this._videoMetaUrl
    }
    //Setters
    set imageMetaUrl(url){
        this._imageMetaUrl = url
    }
    set videoMetaUrl(url){
        this._videoMetaUrl = url
    }
}

//const activePDMD = new PageDataMediaDownloader("", "")

//Setup event handlers & get meta URLs for media upon page load
document.addEventListener('DOMContentLoaded', function(){
    console.log("DOM Content Loaded")

    // const videoTags = document.getElementsByTagName("video")

    const ogImageMetaTag = document.querySelector('meta[property="og:image"]')
    const ogVideoMetaTag = document.querySelector('meta[property="og:video"]')

    if(ogImageMetaTag && ogImageMetaTag.content){
        //console.log(ogImageMetaTag.content)
        //activePDMD._imageMetaUrl = ogImageMetaTag.content
    }

    if(ogVideoMetaTag && ogVideoMetaTag.content){
        //console.log(ogVideoMetaTag)
        //activePDMD._videoMetaUrl = ogVideoMetaTag.content
    }

    document.getElementById('mediaTypes').addEventListener('change', function(){
        mediaTypeChange(this.value)
    })
    document.getElementById('downloadMediaBtn').addEventListener('click', downloadMedia)
    
})



async function getOgImageFromPage() {
  // Get the active tab first
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  
  // Send message to the content script running on that tab
  const response = await browser.tabs.sendMessage(
    tab.id,  // target the specific tab
    { action: "getOgImage" }
  );
  
  return response?.url;
}

// Usage
// document.getElementById("downloadBtn").addEventListener("click", async () => {
//   const imageUrl = await getOgImageFromPage();
  
//   if (!imageUrl) {
//     console.error("No og:image found on this page");
//     return;
//   }

//   browser.runtime.sendMessage({ action: "downloadImage", url: imageUrl });
// });




function mediaTypeChange(value){
    //console.log(activePDMD._imageMetaUrl)
    console.log("Media Type Change to: " + value)
}

async function downloadMedia(){
    //const url = activePDMD._imageMetaUrl
    const status = document.getElementById("status")

    // let thisPagesMetaImage = document.querySelector('meta[property="og:image"]').content
    // console.log("This should be this pages og image")
    // console.log(thisPagesMetaImage)

    // let url = thisPagesMetaImage

    const url = await getOgImageFromPage();
  
    if (!url) {
        console.log(url)
        console.error("No og:image found on this page");
        return;
    }

    browser.runtime.sendMessage(
    { action: "downloadImage", url: url },
    (response) => {
      if (response?.success) {
        status.textContent = "Download started!";
      } else {
        status.textContent = "Download failed.";
      }
    }
  );
}