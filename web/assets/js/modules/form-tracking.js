/**
 * Form tracking
 * Automatically tracks freeform events
 *
 * @author Deux Huit Huit
 */
(function () {
	'use strict';

	const gtmOptions = {
		cat: 'form',
		action: 'submitted',
		label: window.location.pathname
	};

	const track = (form, action, label, value) => {
		App.fx.notify('tracking.push', {
			event: 'form',
			eventCategory: form.getAttribute('data-gtm-form-cat') ||
				gtmOptions.cat,
			eventAction: action || form.getAttribute('data-gtm-form-action') ||
				gtmOptions.action,
			eventLabel: label || form.getAttribute('data-gtm-form-label') ||
				gtmOptions.label,
			eventValue: value
		});
	};

	const onSuccess = (e) => {
		track(e.form, 'success');
	};

	const onErrors = (e) => {
		track(e.form, 'error');
	};

	const onSubmit = (e) => {
		track(e.form);
	};

	const init = function () {
		document.addEventListener('freeform-on-submit', onSubmit);
		document.addEventListener('freeform-render-success', onSuccess);
		document.addEventListener('freeform-render-form-errors', onErrors);
	};

	App.modules.exports('form-tracking', {
		init
	});
})();
