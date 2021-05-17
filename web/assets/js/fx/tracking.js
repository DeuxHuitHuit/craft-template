/**
 * @author Deux Huit Huit
 *
 * Tracking functions: Google Tag Manager wrapper
 */
(() => {
	'use strict';

	const html = document.querySelector('html');
	const lang = html.getAttribute('lang');
	const defaults = {
		event: 'event',
		page: {
			requestURI: window.location.toString(),
			language: lang,
			referer: document.referrer,
			title: document.title
		}
	};

	const log = (options) => {
		options = JSON.stringify(options, null, 2);
		App.log({
			me: 'Tracking',
			args: ['%cpush(' + options + ');', 'color:cornflowerblue']
		});
	};

	const push = (options) => {
		if (!window.dataLayer || !window.dataLayer.push) {
			return;
		}
		window.dataLayer.push({
			...defaults,
			...options
		});
	};

	/**
	 * Export fx
	 */
	App.fx.exports('tracking.push', (key, options) => {
		// Distinguish between simple array and loaded gtm container
		if (!window.dataLayer || !window.dataLayer.hasOwnProperty('push')) {
			log(options);
		}
		push(options);
	});

})();

