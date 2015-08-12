 function checkForNewEpisodes() {
 	console.log('tick');
	App42.initialize("d01ddd44c7b6c64faa216d96db39e3fb0cda97ee66c442fa5927a6ee30ade450",
		"cd7f10ada60d0d7585240ef6bb0684191096264efe308a3f3ebdf5c1d37772e1"); 
	var storageService  = new App42Storage();
	var dbName = "manga",  
	collectionName = "episodes";
	storageService.findAllDocuments(dbName, collectionName,{
		success: function(object) {
			checkForUpdates(object);
		}
	});
}

function checkForUpdates(storage) {
	var storageObj = JSON.parse(storage);
	var allManga = storageObj.app42.response.storage.jsonDoc;
	for(var i = 0; i < allManga.length; i++) {
		getLastEpisode(allManga[i].url, allManga[i]);
	}
}

chrome.alarms.onAlarm.addListener(function(alarm) {
	console.log('adsasdad', alarm);
	checkForNewEpisodes();
});