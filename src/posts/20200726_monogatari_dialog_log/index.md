---
title: "Monogatari: Dialog Log Tweaks with Automatic Scrolling"
tags:
  - monogatari
  - javascript
date: "2020-07-26T04:02:00.000Z"
---

The dialog log button doesn't appear to fully be visible on certain screens. So here I replace the template with one that wraps the button in a container.

Currently the dialog log does not scroll to the bottom automatically when it's open. This is great when you want the log to start open with the most recent, as opposed to the oldest.

```
monogatari.component('dialog-log').template (() => {
	return `
		<div class="modal__content">
			<div data-content="log">
				<div class="text--center padded" data-string="NoDialogsAvailable" data-content="placeholder">No dialogs available. Dialogs will appear here as they show up.</div>
			</div>
			<div class="row">
				<button data-string="Close" data-action="dialog-log">Close</button>
			</div>
		</div>
	`;
});
```


Currently the dialog log does not scroll to the bottom automatically when it's open. This is great when you want the log to start open with the most recent, as opposed to the oldest.

```
monogatari.component('dialog-log').prototype.onStateUpdate =
	function(property, oldValue, newValue) {
		if (property === 'active') {
			this.classList.toggle ('modal--active');
			if (newValue === true) {
				// scroll down to bottom
				var dialogLog = $('[data-content="log"]')[0];
				var scrollHeight = dialogLog.scrollHeight;
				dialogLog.scrollTop = scrollHeight;
			}
		}
		return Promise.resolve ();
	};
```
