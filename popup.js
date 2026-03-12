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

const activePDMD = new PageDataMediaDownloader("", "")

//Get URLs for media upon page load
document.addEventListener('DOMContentLoaded', function(){
    console.log("DOM Content Loaded")

    // const metaTags = document.getElementsByTagName("meta")
    // const videoTags = document.getElementsByTagName("video")

    const ogImageMetaTag = document.querySelector('meta[property="og:image"]')
    const ogVideoMetaTag = document.querySelector('meta[property="og:video"]')

    if(ogImageMetaTag && ogImageMetaTag.content){
        console.log(ogImageMetaTag.content)
        activePDMD._imageMetaUrl = ogImageMetaTag.content
    }

    if(ogVideoMetaTag && ogVideoMetaTag.content){
        console.log(ogVideoMetaTag)
        activePDMD._videoMetaUrl = ogVideoMetaTag.content
    }
    
})

function mediaTypeChange(value){
    console.log(activePDMD._imageMetaUrl)
    console.log("Media Type Change to: " + value)
}

function downloadMedia(){
    const url = activePDMD._imageMetaUrl
    const status = document.getElementById("status")

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