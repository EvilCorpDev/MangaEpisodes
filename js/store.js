 function addUpdateManga(mangaUrl, mangaObj) {
 	App42.initialize("d01ddd44c7b6c64faa216d96db39e3fb0cda97ee66c442fa5927a6ee30ade450",
		"cd7f10ada60d0d7585240ef6bb0684191096264efe308a3f3ebdf5c1d37772e1"); 
	var storageService  = new App42Storage();
	var dbName = "manga",  
	collectionName = "episodes";  
	var key = "title";
	var value = mangaObj.title,
	response;
	storageService.findDocumentByKeyValue(dbName, collectionName, key, value,{    
    	success: function(object) {    
	        var storageObj = JSON.parse(object);
	        response = storageObj.app42.response.storage;  
	        console.log("dbName is " + response.dbName)
	        updateManga(mangaUrl, mangaObj);
    	},    
		error: function(error) {
			var json = JSON.parse(error);
			if(json.app42Fault.httpErrorCode == 404) {
				insertManga(mangaUrl, mangaObj);
			} else {
				console.log(error);
			}
		} 
	});
 }

 function deleteManga(title, $element) {
	App42.initialize("d01ddd44c7b6c64faa216d96db39e3fb0cda97ee66c442fa5927a6ee30ade450",
		"cd7f10ada60d0d7585240ef6bb0684191096264efe308a3f3ebdf5c1d37772e1"); 
	var storageService  = new App42Storage();
	var dbName = "manga",  
	collectionName = "episodes";  
	var key = "title";
	var value = title,
	response;
	storageService.findDocumentByKeyValue(dbName, collectionName, key, value,{    
    	success: function(object) {    
	        var storageObj = JSON.parse(object);
	        response = storageObj.app42.response.storage;
	        var id = response.jsonDoc[0]._id.$oid;
	        deleteMangaById(id, $element);
    	},    
		error: function(error) {
			console.log(error);
		} 
	});
 }

 function insertManga(mangaUrl, mangaObj) {
	App42.initialize("d01ddd44c7b6c64faa216d96db39e3fb0cda97ee66c442fa5927a6ee30ade450",
		"cd7f10ada60d0d7585240ef6bb0684191096264efe308a3f3ebdf5c1d37772e1");
	var storageService  = new App42Storage();
	var dbName = "manga",
	collectionName = "episodes",
	mangaJSON =  "{ \"title\": \"" + mangaObj.title+ "\", \"url\": \"" + mangaUrl + "\", \"episode\": " + mangaObj.episode + " }";
	console.log(mangaJSON);
	var result ;    
	storageService.insertJSONDocument(dbName, collectionName, mangaJSON,{    
		success: function(object) {
			var json = JSON.parse(object);
			appendElement(json.app42.response.storage.jsonDoc);
			console.log("inserted");
		},    
		error: function(error) {  
			console.log(error);
		}    
	});  
 }

 function updateManga(mangaUrl, mangaObj, isNew, $element) {
 	App42.initialize("d01ddd44c7b6c64faa216d96db39e3fb0cda97ee66c442fa5927a6ee30ade450",
		"cd7f10ada60d0d7585240ef6bb0684191096264efe308a3f3ebdf5c1d37772e1"); 
	var storageService  = new App42Storage();
	var dbName = "manga",  
	collectionName = "episodes";
	if(isNew == undefined) {
		isNew = true;
	}
	var mangaJSON =  "{ \"title\": \"" + mangaObj.title+ "\", \"url\": \"" + mangaUrl + 
		"\", \"episode\": " + mangaObj.episode + ", \"is-new\": " + isNew + " }";
	var key = "title";
	var value = mangaObj.title;
	storageService.updateDocumentByKeyValue(dbName, collectionName, key, value, mangaJSON, {
		success: function(object) {
			console.log('update');
        	if(!isNew) {
        		$element.removeClass('list-element__new-episode');
        		$element.find('.read-btn').hide();
        		chrome.browserAction.setBadgeText({text: ""});
        	} else {
        		chrome.browserAction.setBadgeText({text: "new"});
        	}
    	},
    	error: function(error) {
    		console.log(error);
    	}
	});  
 }

 function deleteMangaById(docId, $element) {
 	App42.initialize("d01ddd44c7b6c64faa216d96db39e3fb0cda97ee66c442fa5927a6ee30ade450",
		"cd7f10ada60d0d7585240ef6bb0684191096264efe308a3f3ebdf5c1d37772e1"); 
	var storageService  = new App42Storage();
	var dbName = "manga",  
	collectionName = "episodes"; 
	storageService.deleteDocumentById(dbName, collectionName, docId, {  
		success: function(object) {
			$element.remove();
			console.log(object); 	
		},
		error: function(error) {
    		console.log(error);
    	}
	});
 }
 
 function getAllManga() {
 	App42.initialize("d01ddd44c7b6c64faa216d96db39e3fb0cda97ee66c442fa5927a6ee30ade450",
 		"cd7f10ada60d0d7585240ef6bb0684191096264efe308a3f3ebdf5c1d37772e1"); 
	var storageService  = new App42Storage();
	var dbName = "manga",  
	collectionName = "episodes";
	storageService.findAllDocuments(dbName, collectionName,{
		success: function(object) {
			var storageObj = JSON.parse(object);				
			showMangaEpisodes(storageObj.app42.response.storage.jsonDoc);
		}
	});
 }