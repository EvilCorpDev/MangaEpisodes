$(function() {
	getAllManga();
	setUpUrl();
})

var worker;

var templateManga = "<dt><div class='list-element'><div class='manga-title inline'>" +
	"<a target=\"_blank\" href=\"%url%\">%title%</a></div>" + 
	"<div class='manga-episode inline'>%episode%</div>" +
	"<img class=\"manga-btn del-btn\" src=\"images/del.ico\">" +
	"<img class=\"manga-btn read-btn\" src=\"images/read.png\"></div></dt>";

function showMangaEpisodes(mangaList) {
	var mangaListElement;
	for(var i = 0; i < mangaList.length; i++) {
		appendElement(mangaList[i]);
	}
	$('.del-btn').click(function(event) {
		delManga($(event.target).parent());
	});
	$('.read-btn').click(function(event) {
		readManga($(event.target).parent());
	});
}

function appendElement(mangaElem) {
	mangaListElement = templateManga.substr(0, templateManga.length);
	mangaListElement = mangaListElement.replace("%title%", mangaElem.title);
	mangaListElement = mangaListElement.replace("%episode%", mangaElem.episode);
	mangaListElement = mangaListElement.replace("%url%", mangaElem.url);
	var $child = $(mangaListElement);
	if(mangaElem.hasOwnProperty('is-new')) {
		if(mangaElem['is-new']) {
			$child.find('.list-element').addClass('list-element__new-episode');
			$child.find('.read-btn').show();
			chrome.browserAction.setBadgeText({text: "new"});
		}
	}
	$('.manga-container').append($child);
}

function setUpUrl() {
	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
		$('.new-manga').val(tabs[0].url);
	});
}