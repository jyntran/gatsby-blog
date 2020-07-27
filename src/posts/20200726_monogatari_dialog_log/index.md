---
title: "Monogatari: Dialog Log Tweaks with Automatic Scrolling"
tags: ["monogatari", "javascript"]
date: "2020-07-26T04:02:00.000Z"
---

In this post, I'll be covering two things: how to override a component's static template, and how to override a method, starring the dialog log.

## Working with main.js

First, where does any of this go?

The majority of the time, custom JavaScript code goes into `js/main.js`. For both changes, I placed them inside the `monogatari.init` function:

```
const { $_ready, $_ } = Monogatari;

// 1. Outside the $_ready function:


$_ready (() => {
	// 2. Inside the $_ready function:

	monogatari.init ('#monogatari').then (() => {
		// 3. Inside the init function:

		/*
         * PLACE CODE HERE
		 */

	});
});

```


## Overriding a static template

The dialog log's Close button doesn't appear to fully be visible on certain screens. So I went and replaced the template with one that wraps the button in a container.

How did I go about doing that?

Since Monogatari's source code is available on [Github](https://github.com/Monogatari/Monogatari), it's a matter of finding the `dialog-log` component and overriding the existing rendered template.

Here's the original [dialog-log component](https://github.com/Monogatari/Monogatari/blob/develop/src/components/dialog-log/index.js). Note this is the `develop` branch as I downloaded the nightly version of Monogatari.

```
render () {
	return `
		<div class="modal__content">
			<div data-content="log">
				<div class="text--center padded" data-string="NoDialogsAvailable" data-content="placeholder">No dialogs available. Dialogs will appear here as they show up.</div>
			</div>
			<button data-string="Close" data-action="dialog-log">Close</button>
		</div>
	`;
}
```

Since the `render` method is simply outputting a string, that makes it a lot easier to change. Enter `monogatari.component('COMPONENT_TAG').template()`:

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

The difference: there's now a `<div class="row">` wrapping the Close button, giving it more of a presence on-screen!

## Overriding a method

Currently the dialog log does not scroll to the bottom automatically when it's open. So I went about finding a solution to have it scroll to the bottom automatically upon any update. This is great when you want the log to start open with the most recent, as opposed to the oldest, as it's likely the user wants to see what the last few lines that were displayed were.

Back to the dialog log's source code, I can see there is a method called `onStateUpdate`. This sounds like the perfect spot for the scrolling to be called.

```
onStateUpdate (property, oldValue, newValue) {
	if (property === 'active') {
		this.classList.toggle ('modal--active');

		if (newValue === true) {
			this.scrollTop = this.scrollHeight;
		}
	}
	return Promise.resolve ();
}
```

There is currently existing code to scroll down using `this.scrollHeight`, but it's not quite doing what I need it to. The `scrollHeight` sometimes outputs `0`, so it doesn't do any scrolling.

I rewrote it to force it to get the log element's `scrollHeight` and use that instead.

```
if (newValue === true) {
	// scroll down to bottom
	var dialogLog = $('[data-content="log"]')[0];
	var scrollHeight = dialogLog.scrollHeight;
	dialogLog.scrollTop = scrollHeight;
}
```

A method inside a component is a bit trickier, but it can be done! I set the function directly using `prototype`, ensuring that the function still has the same argument signature and the rest of its logic:

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

Now, whenever new text is added, the scroll element's height is fetched and the scroll to the bottom occurs. There we go!

## Final code

Here is how my `main.js` looks now:


```
const { $_ready, $_ } = Monogatari;

// 1. Outside the $_ready function:


$_ready (() => {
	// 2. Inside the $_ready function:

	monogatari.init ('#monogatari').then (() => {
		// 3. Inside the init function:

		/* Dialog log template */
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

		/* Dialog log scroll to bottom */
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

	});
});

```