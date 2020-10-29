/**
 * Window events
 * @author Deux Huit Huit
 */
(function () {
	'use strict';

	const listeners = {};

	const handleEvents = (event) => {
		const handlers = listeners[event.type];
		handlers.forEach((handler) => {
			handler(event);
		});
	};

	const on = ({ event, handler }) => {
		const evt = listeners[event];
		if (!!evt) {
			evt.push(handler);
			return;
		}
		listeners[event] = [handler];
		window.addEventListener(event, handleEvents);
	};

	const actions = () => {
		return {
			window: {
				on
			}
		};
	};

	App.modules.exports('window-events', {
		actions
	});
})();
