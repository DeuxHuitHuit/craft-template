/**
* language-links
* @author Deux Huit Huit
*/
(($, undefined) => {

	'use strict';

	const scope = $('#site');

	const sels = {
		item: '.js-language-link',
		metas: 'link[rel="alternate"]'
	};

	const updated = (key, data) => {
		const altLanguages = scope.find(sels.metas);
		scope.find(sels.item).each((element) => {
			element = $(element);
			const linkLanguage = altLanguages.filter(`[hreflang="${element.attr('data-lang')}"]`);
			if (!!linkLanguage.length) {
				linkLanguage.attr('href', linkLanguage.first().attr('href'));
			}
		});
	};

	const actions = () => {
		return {
			metas: {
				updated
			}
		};
	};

	App.modules.exports('language-links', {
		actions: actions
	});
	
})(window.jQuery);
