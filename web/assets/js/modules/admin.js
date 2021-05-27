/**
* admin
* @author Deux Huit Huit
*/
((undefined) => {
	'use strict';
	
	const useLangInUrl = true;
	const lang = document.querySelector('html').getAttribute('lang');

	const computeProperUrl = () => {
		if (!useLangInUrl || !lang) {
			return '/public/admin/';
		}
		return `/${lang}/public/admin/`;
	};

	const init = () => {
		setTimeout(() => {
			fetch(computeProperUrl())
				.then((response) => response.text())
				.then((body) => {
					window.document.getElementById('admin-menu').innerHTML = body;
				});
		}, 1000); // wait until the inital load since this is not critical
	};

	App.modules.exports('admin', {
		init: init
	});
})();
