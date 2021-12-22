async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true}; // to get current active tab

    // https://developer.chrome.com/docs/extensions/reference/tabs/#get-the-current-tab
    chrome.tabs.query(queryOptions,function currentTab(tabs){ 
      
      let currentTab = tabs[0]; // take the object from the returned promise
      let currentTitle = currentTab.title; // take object title
      let currentUrl = currentTab.url; // take object URL
      let hostName = currentUrl //store url string
      let currentFaviconUrl = currentTab.favIconUrl

      // Title
      const activityTitle = document.getElementById('activityTitle');
      const activityTitleUrl = document.getElementById('activityTitle');
      activityTitle.innerHTML = "Title: "+currentTitle; //format it in html
      activityTitleUrl.setAttribute("href",currentUrl)



      // URl
      const activityUrl = document.getElementById('activityUrl');
      const activityLink = document.getElementById('activityUrl');

      try{
        let urlObject = new URL(currentUrl);
        hostName = urlObject.hostname; //store only host name
      }catch{
        console.log(`couldn't construct url from ${currentUrl}`)
      }

      activityUrl.innerHTML = "URL: "+hostName; //format it in html
      activityLink.setAttribute("href",hostName);

      // Favicon
      const activityFavicon = document.getElementById("activityFavicon");
      activityFavicon.setAttribute("src",currentFaviconUrl); //format Favicon in html

    // active time
    let timeActive = new Date().getTime();
    // let timeMil = timeActive.getSeconds()
    const timeElement = document.getElementById('activetime');
    timeElement.innerHTML = timeActive;
    
    

    });
  }

getCurrentTab();

console.log(chrome.tabs.onCreated.addListener(function timeCur(){
  let timeActive = new Date();
  return timeActive.setSeconds()
}))