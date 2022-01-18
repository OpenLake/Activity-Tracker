// import { saveActivities } from '../storage/server.js';

let title = null;
let url = null;
let favicon = null;
class ActiveBrowserWatcher {
	/**
	 * @param {number} interval Polling interval
	 * @param {(activity) => void} changeCallback
	 */
	constructor(interval = 1000) {
		this.startTime = null;
		this.title = null; //Title
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

		const title = this.title;
		const url = this.url;
		const favicon = this.favicon;

		const data = {
			title,
			url,
			favicon,
			startTime,
			endTime,
		};

		fetch('http://localhost:32768/api/browseractivities', {
			method: 'POST',
			body: data,
		})
			.then(console.log('data Stored'))
			.catch(err => {
				console.log(err);
			});
		// this.changeCallback(data);
		console.log(data);
	}

	/**
	 * Checks the active window is specific time interval
	 * and whenever the active window changes stores the time difference by calling {@link ActiveWindowWatcher.storeTime} function
	 */
	tracker() {
		setInterval(() => {
			let queryOptions = { active: true, currentWindow: true }; // to get current active tab from the current window
			// eslint-disable-next-line no-undef
			chrome.tabs.query(queryOptions, function currentTab(tabs) {
				let currentTab = tabs[0]; // take the object from the returned promise
				let currentTitle = currentTab.title; // take object title
				let currentUrl = currentTab.url; // take object URL
				let currentFavIcons = currentTab.favIconUrl;
				title = currentTitle;
				url = currentUrl;
				favicon = currentFavIcons;

				// Title
				const activityTitle = document.getElementById('activityTitle');
				const activityTitleUrl = document.getElementById('activityTitle');
				activityTitle.innerHTML = 'Title: ' + currentTitle; //format it in html
				activityTitleUrl.setAttribute('href', currentUrl);
				console.log(activityTitle);

				// URl
				const activityUrl = document.getElementById('activityUrl');
				const activityLink = document.getElementById('activityUrl');
				activityUrl.innerHTML = 'URL: ' + currentUrl; //format it in html
				activityLink.setAttribute('href', currentUrl);

				// Favicon
				const activityFavicon = document.getElementById('activityFavicon');
				activityFavicon.setAttribute('src', currentFavIcons); //format Favicon in html
			});

			if (title === undefined) {
				this.title = null;
				this.url = null;
				this.favicon = null;
				return;
			}

			if (!this.title) {
				this.startTime = Date.now();
				this.title = title;
				this.url = url;
				this.favicon = favicon;
			}

			//If the active window is changed store the used time data.
			if (title !== this.title) {
				this.storeTime();
				this.title = null;
				this.url = null;
				this.favicon = null;
			}
			console.log(title, url, favicon, this.startTime);
		}, this.interval);
	}

	initialize() {
		this.tracker();
	}
}

// const activityTracker = new ActiveBrowserWatcher(1000);

const activityTracker = new ActiveBrowserWatcher(1000, activity => {
	fetch('http://localhost:32768/api/browseractivities', {
		method: 'POST',
		body: activity,
	})
		.then(console.log('done'))
		.catch(err => {
			console.log(err);
		});
});

activityTracker.initialize();
