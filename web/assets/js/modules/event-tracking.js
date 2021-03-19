/**
 * @author Deux Huit Huit
 *
 * User event tracking
 * Allows developer to quickly tag actions with data attributes.
 * The main attribute to hook on is `data-gtm-event` attribute.
 * The currently supported events are:
 *   - click
 */
(() => {
	'use strict';

	const sels = {
		click: '[data-gtm-event="click"]'
	};

	const gtmOptions = {
		cat: 'navigation',
		action: 'click',
		label: window.location.pathname
	};

	const track = (el, event, value) => {
		App.fx.notify('tracking.push', {
			event,
			eventCategory: el.getAttribute('data-gtm-event-cat') ||
				gtmOptions.cat,
			eventAction: el.getAttribute('data-gtm-event-action') ||
				gtmOptions.action,
			eventLabel: el.getAttribute('data-gtm-event-label') ||
				gtmOptions.label,
			eventValue: value
		});
	};

	const onClick = (e) => {
		track(e.currentTarget, 'click');
	};

	const init = () => {
		document.querySelectorAll(sels.click).forEach((el) => {
			el.addEventListener('click', onClick);
		});
	};

	App.modules.exports('event-tracking', {
		init
	});

})();