/**
 * Url Changer
 * @author Deux Huit Huit
 */
((undefined) => {
	'use strict';

	const scope = document.querySelector('#site');

	const sels = {
		links: 'a[href]'
	};

	const init = function () {
		scope.addEventListener(App.device.events.click, (event) => {
			let target = event.target.matches(sels.links) ? event.target : null;
			target = target || event.target.closest(sels.links);

			if (!!target && !(event.ctrlKey || event.metaKey)) {

				// is ours ?
				if (target.origin !== window.location.origin) {
					return;
				}

				// is not in /assets
				if (target.pathname.startsWith('/assets')) {
					return;
				}

				// is not download attr
				if (target.getAttribute('download') !== null) {
					return;
				}

				// is not target _blank
				if (target.getAttribute('target') !== null &&
					target.getAttribute('target') !== 'self') {
					return;
				}

				// is not override ajax
				if (target.getAttribute('data-ajax') === 'false') {
					return;
				}

				if (target.getAttribute('data-action') === 'full') {
					return;
				}

				if (!!window.location.pathname.endsWith('/') && !target.pathname.endsWith('/')) {
					target.pathname += '/';
				}

				window.history.pushState({}, target.textContent, target.href);

				return window.pd(event);
			}
		});
	};

	App.modules.exports('url-changer', {
		init: init
	});

})();
