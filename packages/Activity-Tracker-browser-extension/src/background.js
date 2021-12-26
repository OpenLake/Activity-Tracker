let tab=null;
let url=null;
let favicon=null;
class ActiveWindowWatcher {
	/**
	 * @param {number} interval Polling interval
	 * @param {(activity) => void} changeCallback
	 */
	constructor(interval = 1000) {
		this.startTime = null;
		this.tab = null; //Title
		this.url = null;
		this.favicon = null;
		// this.changeCallback = changeCallback;
		this.interval = interval;
	}

	/**
	 * Storing the start time of the active window
	 * Collecting data of the window which will be active
	 */
	storeTime() {
		const endTime = Date.now();
		const startTime = this.startTime;

		const title = this.tab;
		const url = this.url;
		const favicon = this.favicon;


		const data = {
			title,
			url,
			favicon,
			startTime,
			endTime,
		};

		// this.changeCallback(data);
    console.log(data)
	}

	/**
	 * Checks the active window is specific time interval
	 * and whenever the active window changes stores the time difference by calling {@link ActiveWindowWatcher.storeTime} function
	 */
	tracker() {
		setInterval(() => {
			let queryOptions = { active: true, currentWindow: true}; // to get current active tab
			chrome.tabs.query(queryOptions,function currentTab(tabs){
				let currentTab = tabs[0]; // take the object from the returned promise
				let currentTitle = currentTab.title; // take object title
				let currentUrl = currentTab.url; // take object URL
				let currentFavIcons = currentTab.favIconUrl
    			tab = currentTitle;
				url = currentUrl;
				favicon = currentFavIcons;  
		
    			// Title
    			// const activityTitle = document.getElementById('activityTitle');
    			// const activityTitleUrl = document.getElementById('activityTitle');
    			// activityTitle.innerHTML = "Title: "+currentTitle; //format it in html
    			// activityTitleUrl.setAttribute("href",currentUrl);
    			// console.log(activityTitle)
		
				
    		});

			if (tab === undefined) return;

			if (!this.tab) {
				this.startTime = Date.now();
				this.tab = tab;
				this.url = url;
				this.favicon = favicon;
			}

			//If the active window is changed store the used time data.
			if (tab !== this.tab) {
				this.storeTime();
				this.tab = null;
				this.url = null;
				this.favicon = null;
			}
			console.log(tab,url,favicon, this.startTime);

		}, this.interval);
	}

	initialize() {
		this.tracker();
	}
}

const activityTracker = new ActiveWindowWatcher(1000);
activityTracker.initialize();