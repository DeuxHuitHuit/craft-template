/**
 * Watermark
 * @author Deux Huit Huit
 */
(function ($, undefined) {

	'use strict';

	const site = $('#site');

	const sels = {
		ctn: '.js-watermark-ctn'
	};

	const init = () => {
		site.find(sels.ctn).each((index, element) => {
			const t = $(element);
			if (!!t.attr('data-href') && !t.html()) {
				$.ajax({
					method: 'GET',
					crossDomain: true,
					url: t.attr('data-href'),
					success: (data) => {
						t.append($(data).find('watermark').html());
					}
				});
			}
		});
	};

	App.modules.exports('watermark', {
		init: init
	});

})(jQuery);
