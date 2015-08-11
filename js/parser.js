$(function() {
	$('.add-btn').click(function() {
		addManga();
	});
})

function addManga() {
	var url = $('.new-manga').val();
	if(url.length > 0) {
		getLastEpisode(url);
		$('.new-manga').val('');
		$('.new-manga').removeClass('empty-input');
	} else {
		$('.new-manga').addClass('empty-input');
	}
}

function delManga($link) {
	console.log('deleting', $link);
}

function getLastEpisode(url) {
	$.ajaxPrefilter( function (options) {
		if (options.crossDomain && jQuery.support.cors) {
			var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
			options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
			//options.url = "http://cors.corsproxy.io/url=" + options.url;
		}
	});
	$.get(url, function(data) {
		var mangaObj = callParser(url, $(data));
		addUpdateManga(url, mangaObj);
	});
}

function callParser(url, $data) {
	var mangaFox = 'http://mangafox.me/';
	var mangaReader = 'http://www.mangareader.net/';
	var readManga = 'http://readmanga.me/';
	if(url.indexOf(mangaFox) === 0) {
		return getMangaObjMangaFox($data);
	} else if(url.indexOf(mangaReader) === 0) {
		return getMangaObjMangaReader($data);
	} else if(url.indexOf(readManga) === 0) {
		return getMangaObjReadManga($data);
	}
}

function getMangaObjReadManga($data) {	
	var manga = {};
	manga.episode = getEpisodeReadManga($data);
	manga.title = getTitleReadManga($data);
	return manga;
}

function getMangaObjMangaFox($data) {	
	var manga = {};
	manga.episode = getEpisodeMangaFox($data);
	manga.title = getTitleMangaFox($data);
	return manga;
}

function getMangaObjMangaReader($data) {	
	var manga = {};
	manga.episode = getEpisodeMangaReader($data);
	manga.title = getTitleMangaReader($data);
	return manga;
}

function getEpisodeReadManga($data) {
	var $link = $($data.find('.read-last').find('a')[0]);
	var href = $link.attr('href');
	return href.substr(href.lastIndexOf('/') + 1, href.number);
}

function getTitleReadManga($data) {
	var title = $($data.find('.name')[0]).text();
	title = title + ' | ';
	title += $($data.find('.eng-name')[0]).text();
	return title;
}

function getEpisodeMangaFox($data) {
	var $chList = $($data.find('.chlist')[0]);
	var $link = $($chList.find('h3')[0]).find('a');
	var href = $link.attr('href');
	href = href.substr(0, href.lastIndexOf('/'));
	return href.substr(href.lastIndexOf('/') + 2, href.number);
}

function getTitleMangaFox($data) {
	return $data.find('#title').find('h1').text();
}

function getEpisodeMangaReader($data) {
	var $chList = $($data.find('#latestchapters')[0]);
	var href = $($chList.find('a')[0]).attr('href');
	return href.substr(href.lastIndexOf('/') + 1, href.number);
}

function getTitleMangaReader($data) {
	return $data.find('#mangaproperties').find('h1').text();	
}