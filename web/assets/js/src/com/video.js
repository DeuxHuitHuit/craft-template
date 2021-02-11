/**
 * @author Deux Huit Huit
 */

(function ($, w, win, undefined) {
	
	'use strict';

	var defaultOptions = {
		ctn: $(),
		video: null,
		videoSelector: '.js-video',
		onTimeUpdate: $.noop,
		onCanPlay: $.noop,
		onPlaying: $.noop,
		onLoaded: $.noop,
		onEnded: $.noop
	};

	var RESET_ON_END_ATTR = 'data-video-reset-on-end';

	// jQuery fun
	(function ($) {
		var factory = function (fx) {
			return function () {
				var args = Array.prototype.slice.call(arguments);
				return $(this).each(function (i, e) {
					if (!!e && $.isFunction(e[fx])) {
						e[fx].apply(e, args);
					}
				});
			};
		};
		var factoryProp = function (prop) {
			return function (value) {
				if (value === undefined) {
					var domElement = $(this).get(0);
					return !domElement ? 0 : (domElement[prop] || 0);
				}
				return $(this).each(function (i, e) {
					if (!!e) {
						$(e).get(0)[prop] = value;
					}
				});
			};
		};
		$.fn.mediaPlay = factory('play');
		$.fn.mediaPause = factory('pause');
		$.fn.mediaLoad = factory('load');
		
		$.fn.mediaCurrentTime = factoryProp('currentTime');
		$.fn.mediaPaused = factoryProp('paused');
		$.fn.mediaMuted = factoryProp('muted');
		$.fn.mediaHeight = factoryProp('videoHeight');
		$.fn.mediaWidth = factoryProp('videoWidth');
	})($);
	
	App.components.exports('video', function (options) {
		var o = $.extend({}, defaultOptions, options);

		// EVENTS
		var onTimeUpdate = function (e) {
			if (!!status.currentTime) {
				App.mediator.notify('video.timeupdate', {
					video: o.video,
					e: e
				});
			}
			
			App.callback(o.onTimeupdate, [o.video]);
		};

		var onPlaying = function (e) {
			App.fx.notify('changeState.update', {
				item: o.ctn,
				state: 'paused',
				action: 'off'
			});

			App.fx.notify('changeState.update', {
				item: o.ctn,
				state: 'playing',
				action: 'on'
			});

			App.callback(o.onPlaying, [o.ctn, o.video]);
		};

		var onCanPlay = function (e) {
			App.fx.notify('changeState.update', {
				item: o.ctn,
				state: 'paused',
				action: 'off'
			});

			App.fx.notify('changeState.update', {
				item: o.ctn,
				state: 'video-loaded',
				action: 'on'
			});

			App.callback(o.onCanPlay, [o.ctn, o.video]);
		};
		
		var onLoaded = function (e) {
			App.callback(o.onLoaded, [o.ctn, o.video]);
		};

		var onEnded = function () {
			if (o.video.filter('[' + RESET_ON_END_ATTR + ']').length) {
				App.fx.notify('changeState.update', {
					item: o.ctn,
					state: 'playing',
					action: 'off'
				});
			}
			App.callback(o.onEnded, [o.ctn, o.video]);
		};

		// METHODS
		var loadVideo = function () {
			o.video.mediaLoad();
			o.video.mediaPlay();
		};

		var playVideo = function () {
			o.video.mediaPlay();
		};

		var pauseVideo = function () {
			App.fx.notify('changeState.update', {
				item: o.ctn,
				state: 'paused',
				action: 'on'
			});

			o.video.mediaPause();
		};

		var seekVideo = function (time) {
			o.video.mediaCurrentTime(time);
		};

		var toggleMute = function () {
			o.video.mediaMuted(!o.video.mediaMuted());
		};

		var togglePlayVideo = function () {
			if (!o.video.mediaPaused()) {
				pauseVideo();
			} else {
				playVideo();
			}
		};

		var fullscreen = function (e) {
			var elem = o.video[0];
			if (!elem) {
				return false;
			}

			if (elem.requestFullscreen) {
				elem.requestFullscreen();
			} else if (elem.mozRequestFullScreen) { /* Firefox */
				elem.mozRequestFullScreen();
			} else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
				elem.webkitRequestFullscreen();
			} else if (elem.msRequestFullscreen) { /* IE/Edge */
				elem.msRequestFullscreen();
			} else {
				App.log('full screen not available');
			}
		};

		var destroy = function () {
			o.video.off('timeUpdate', onTimeUpdate)
				.off('canplay', onCanPlay)
				.off('playing', onPlaying)
				.off('ended', onEnded)
				.off('loadedmetadata', onLoaded);

			loadVideo();
			o.video = null;
			o = {};
		};

		var init = function (ctn, options) {
			o = $.extend({}, o, options);

			o.ctn = $(ctn);
			o.video = ctn.find(o.videoSelector);

			// attach events
			o.video.on('timeupdate', onTimeUpdate)
				.on('canplay', onCanPlay)
				.on('playing', onPlaying)
				.on('ended', onEnded)
				.on('loadedmetadata', onLoaded);
		};
		
		return {
			init: init,
			destroy: destroy,
			load: loadVideo,
			play: playVideo,
			togglePlay: togglePlayVideo,
			pause: pauseVideo,
			seek: seekVideo,
			toggleMute: toggleMute,
			fullscreen: fullscreen
		};
	});
	
})(jQuery, window, jQuery(window));
