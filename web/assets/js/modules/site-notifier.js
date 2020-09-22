/**
 * Site notifier
 * @author Deux Huit Huit
 */
(function ($, undefined) {

	'use strict';

	var win = $(window);
	var doc = $(document);

	var notify = function (key, e) {
		App.mediator.notify('site.' + key, { event: e });
	};

	var resizeHandler = function (e) {
		notify('resize', e);
	};

	var orientationHandler = function (e) {
		notify('orientation', e);
		resizeHandler();
	};

	var scrollHandler = function (e) {
		notify('scroll', e);
		notify('postscroll', e);
	};

	var loadHandler = function (e) {
		notify('loaded', e);
	};

	var visibilityHandler = function (e) {
		notify('visibilitychange', e);
	};

	var readyHandler = function (e) {
		notify('ready', e);
	};

	var init = function () {
		$(readyHandler);

		win.on('load', loadHandler);
		win.on('scroll', scrollHandler);
		win.on('orientationchange', orientationHandler);

		if (!App.device.ios) {
			win.resize(resizeHandler);
		}

		doc.on('visibilitychange webkitvisibilitychange', visibilityHandler);
	};

	App.modules.exports('site-notifier', {
		init: init
	});

})(jQuery);
