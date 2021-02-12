(() => {
	'use strict';

	if (!!window?.App?.device) { // jshint ignore:line
		const deviceTests = [
			'iphone', 'ipad', 'ios',
			'android',
			'mobile', 'phone', 'tablet', 'touch',
			'chrome', 'firefox', 'safari', 'internetexplorer', 'edge'
		];

		deviceTests.forEach((test) => {
			if (!!window.App.device[test]) {
				document.querySelector('html').classList.add(test);
			}
		});
	}

	window.pd = (e, stopPropagation) => {
		if (!!e) {
			if (typeof e.preventDefault === 'function') {
				e.preventDefault();
			}
			if (stopPropagation !== false && typeof e.stopPropagation === 'function') {
				e.stopPropagation();
			}
		}
		return false;
	};

	const sorry = (type) => {
		const orig = window.history[type];
		return function () {
			let data = {};

			if (!!arguments.length && typeof arguments[0] === 'object') {
				data = arguments[0].data || {};
				delete(arguments[0].data);
			}

			const rv = orig.apply(this, arguments);
			const e = new window.Event(type);

			e.arguments = arguments;
			e.state = arguments[0] || undefined;
			e.data = data;
			window.dispatchEvent(e);

			return rv;
		};
	};

	window.history.pushState = sorry('pushState');
	window.history.replaceState = sorry('replaceState');
})();
