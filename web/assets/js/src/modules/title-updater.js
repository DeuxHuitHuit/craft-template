/**
 * Title Updater
 * 
 * @author Deux Huit Huit
 */
((undefined) => {

	'use strict';

	const titleList = {};

	const init = () => {
		titleList[window.location.href] = document.querySelector('title').textContent;
	};

	const onPageLoaded = (key, data) => {
		if (!!data.data) {
			const parser = new window.DOMParser();
			const doc = parser.parseFromString(data.data, 'text/html');
			const key = data.url || window.location.href;

			titleList[key] = doc.querySelector('title').textContent || 'ERROR TITLE NOT FOUND';
		}
	};

	var onEnter = () => {
		if (!!titleList[window.location.href]) {
			document.title = titleList[window.location.href];
		}
	};

	const actions = () => {
		return {
			pages: {
				loaded: onPageLoaded
			},
			page: {
				enter: onEnter
			}
		};
	};

	App.modules.exports('title-updater', {
		init: init,
		actions: actions
	});

})();
