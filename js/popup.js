$(function() {
	getAllManga();
})

var templateManga = "<dt><div class='list-element'><div class='manga-title inline'>" +
	"<a target=\"_blank\" href=\"%url%\">%title%</a></div>" + 
	"<div class='manga-episode inline'>%episode%</div>" +
	"<img class=\"manga-btn del-btn\" src=\"images/del.ico\"></div></dt>";

function showMangaEpisodes(mangaList) {
	var mangaListElement;
	for(var i = 0; i < mangaList.length; i++) {
		appendElement(mangaList[i]);
	}
	$('.del-btn').click(function(event) {
		console.log($(event.target).parent());
		delManga();
	});
}

function appendElement(mangaElem) {
	mangaListElement = templateManga.substr(0, templateManga.length);
	mangaListElement = mangaListElement.replace("%title%", mangaElem.title);
	mangaListElement = mangaListElement.replace("%episode%", mangaElem.episode);
	mangaListElement = mangaListElement.replace("%url%", mangaElem.url);
	$('.manga-container').append($(mangaListElement));
}