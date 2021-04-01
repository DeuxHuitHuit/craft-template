/**
* metas
* @author Deux Huit Huit
*/
(($, undefined) => {

	'use strict';

	const scope = $('head');

	const metas = {};

	const sels = {
		tags: `
			title,
			meta[property][content],
			meta[name][content],
			meta[theme-color],
			link[rel="canonical"],
			link[rel="icon"],
			link[rel="alternate"],
			script[type="application/ld+json"]
		`
	};

	sels.tags = sels.tags.replace(/\s/g, '');

	const onPageLoaded = (key, data) => {
		metas[data.url] = $(data.html).find('head').find(sels.tags).clone();
	};

	const onPageEnter = (key, data) => {
		if (!!metas[data.page.key()]) {
			scope.find(sels.tags).remove();
			scope.append(metas[data.page.key()]);
			App.mediator.notify('metas.updated', {
				metas: metas[data.page.key()]
			});
		}
	};

	const init = () => {
		metas[window.location.href] = scope.find(sels.tags).clone();
	};

	const actions = () => {
		return {
			pages: {
				loaded: onPageLoaded
			},
			page: {
				enter: onPageEnter
			}
		};
	};

	App.modules.exports('metas', {
		init: init,
		actions: actions
	});

})(window.jQuery);
