chrome.browserAction.onClicked.addListener(function () {
    chrome.tabs.create({
		url: chrome.extension.getURL('./www/index.html'),
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

// DEPRECATED
/*
chrome.app.runtime.onLaunched.addListener(function() {
	chrome.app.window.create('./www/index.html', {
		'outerBounds': {
			'width': 775,
			'height': 600,
			'minWidth': 400,
			'minHeight': 400
		},
		'frame': {
			'type': 'none'
		}
	});
});
*/