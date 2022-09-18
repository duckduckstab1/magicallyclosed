var isChromeApp = true;
var isMobileApp = false;
var isApp = true;
var isDesktop = true;

var urlGPlay = "https://play.google.com/store/apps/details?id=com.jojudge.bonziworld";

$(function() {

	w.onMaximized.addListener(function() {
		$("#maximize").addClass("restore");
	});

	w.onRestored.addListener(function() {
		$("#maximize").removeClass("restore");
	});


	$("a").attr("target", "_blank");

	$("#readme").attr("target", "");

	$("#readme").click(function() {
		chrome.tabs.create({
			url: chrome.extension.getURL('./www/readme/index.html'),
			active: false
		}, function(tab) {
			chrome.windows.create({
				tabId: tab.id,
				type: 'popup',
				focused: true
			});
			chrome.windows.update(tab.id, { width: 775, height: 600 });
		});
	});

	$("#rules").click(function() {
		chrome.tabs.create({
			url: chrome.extension.getURL('./www/rules/index.html'),
			active: false
		}, function(tab) {
			chrome.windows.create({
				tabId: tab.id,
				type: 'popup',
				focused: true
			});
			chrome.windows.update(tab.id, { width: 775, height: 600 });
		});
	});

	$(".app_showcase").append(
		'<a class="app_android" href="' + urlGPlay + '">' +
			'<img src="./img/app/google-play-badge.png" alt="Get it on Google Play." />' +
		'</a>'
	);
});