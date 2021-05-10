/**
* admin
* @author Deux Huit Huit
*/
((undefined) => {
	'use strict';

	const init = () => {
		setTimeout(() => {
			fetch('/public/admin/')
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
