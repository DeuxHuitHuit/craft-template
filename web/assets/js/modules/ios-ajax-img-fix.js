/**
 * Images with srcset and height set to 'auto' will break on iOS when loaded via ajax.
 * This workaround provokes a re-render on ios devices to make sure images display properly.
 * https://stackoverflow.com/questions/45487105/ajax-loaded-images-in-safari-not-respecting-srcset
 * @author Deux Huit Huit
 *
 */
(function () {
	'use strict';

	const onPageEnter = () => {
		document.querySelectorAll('img').forEach((img) => {
			img.outerHTML = img.outerHTML;
		});
	};

	const actions = () => {
		const { ios, ipad, iphone } = App.device;
		if (ios || ipad || iphone) {
			return {
				page: {
					enter: onPageEnter,
				},
			};
		}
		return {};
	};

	App.modules.exports('ios-ajax-img-fix', {
		actions,
	});
})();
