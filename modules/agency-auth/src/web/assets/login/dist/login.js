(($) => {
	'use strict';

	const scope = $('body');

	const sels = {
		ref: '#poweredby'
	};

	const init = () => {
		const ref = scope.find(sels.ref);
		const html = $('<a href="/actions/agency-auth/login" class="btn dhh-btn" />').text('Login with Deux Huit Huit');

		html.insertBefore(ref);
	};

	init();
})(jQuery);
