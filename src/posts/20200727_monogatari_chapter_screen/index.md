---
title: "Monogatari: Creating a Chapter Screen"
tags: ["monogatari", "javascript"]
date: "2020-07-27T04:02:00.000Z"
---

This next Monogatari spotlight is a monster!

I'm going to cover making a new `ScreenComponent`. How did I find about doing that? By checking the `lib` folder in the source for the right component to create: [ScreenComponent.js](https://github.com/Monogatari/Monogatari/blob/develop/src/lib/ScreenComponent.js).

## Creating a ScreenComponent

Here is the basic `ScreenComponent` definition. See how I used `class` to declare it and extend from `Monogatari.ScreenComponent`:

```
class ChapterScreen extends Monogatari.ScreenComponent {
	render() {
		return `
			<h2 data-string="Chapters">Chapters</h2>
		`;
	}
}
```

Ensure that `data-string="Chapters"` has a localization value defined so Monogatari doesn't complain:

```
monogatari.translation ("English", {
	"Chapters": "Chapters",
});
```

Next I make sure to have Monogatari register it by giving it a tag and then calling `registerComponent`:

```
ChapterScreen.tag = 'chapter-screen';
monogatari.registerComponent(ChapterScreen);
```

That is how to create the most simplest of screens!

How my `main.js` is now:

```
const { $_ready, $_ } = Monogatari;

// 1. Outside the $_ready function:

/* Localization */
monogatari.translation ("English", {
	"Chapters": "Chapters",
});

/* Chapter screen component */
class ChapterScreen extends Monogatari.ScreenComponent {
	render() {
		return `
			<h2 data-string="Chapters">Chapters</h2>
		`;
	}
}
ChapterScreen.tag = 'chapter-screen';
monogatari.registerComponent(ChapterScreen);

$_ready (() => {
	// 2. Inside the $_ready function:

	monogatari.init ('#monogatari').then (() => {
		// 3. Inside the init function:


```

## Adding the component to index.html

The chapter screen should also join the ranks of the other screen components inside `index.html`:

```
<div id="monogatari">
	<visual-novel>
		<loading-screen></loading-screen>
		<main-screen>
			<main-menu></main-menu>
		</main-screen>
		<game-screen>
			<dialog-log></dialog-log>
			<text-box></text-box>
			<quick-menu></quick-menu>
		</game-screen>
		<chapter-screen></chapter-screen> <!-- Added chapter screen - make sure it matches the tag -->
		<gallery-screen></gallery-screen>
		<credits-screen></credits-screen>
		<load-screen></load-screen>
		<save-screen></save-screen>
		<settings-screen></settings-screen>
		<help-screen></help-screen>
	</visual-novel>
</div>
```

## Accessing the screen from the main menu

To view it, I will need a button that will open the screen. I chose to add a button to the main menu screen, so the player has the option to select a chapter instead of starting from the beginning or loading.

How to create one that opens a `ScreenComponent`? Well, I dug around the code for the other main menu buttons. Here is the Settings button:

```
<button data-action="open-screen" data-open="settings" icon="undefined" string="Settings">
	<span class="undefined"></span>
	<span data-string="Settings">Settings</span>
</button>
```

What seems to be important is the following: `data-action="open-screen" data-open="settings"`.

For my chapter screen, I want to perform the same action `open-screen`, but open a different component with the tag `chapter-screen`. Note that the tag for `open` does not have `-screen`.

Next, it's looking into the `MenuComponent` and seeing what methods are available. Here it is: [MenuComponent](https://github.com/Monogatari/Monogatari/blob/develop/src/lib/MenuComponent.js).

I see there's an `addButtonAfter` method which is perfect; I want the Chapter Select button after the Load button.

Here is what I came up with:

```
monogatari.component('main-menu').addButtonAfter('Load', {
	string: 'Chapters',
	data: {
		action: 'open-screen',
		open: 'chapter'
	}
});
```

Finally, place it in `main.js`. I have it located inside the `init` function.

```
const { $_ready, $_ } = Monogatari;

// 1. Outside the $_ready function:

...

$_ready (() => {
	// 2. Inside the $_ready function:

	monogatari.init ('#monogatari').then (() => {
		// 3. Inside the init function:

		/* Main menu button: chapter screen */
		monogatari.component('main-menu').addButtonAfter('Load', {
			string: 'Chapters',
			data: {
				action: 'open-screen',
				open: 'chapter'
			}
		});
```

## Final code

Here is my final `main.js`!

```
const { $_ready, $_ } = Monogatari;

// 1. Outside the $_ready function:

/* Localization */
monogatari.translation ("English", {
	"Chapters": "Chapters",
});

/* Chapter screen component */
class ChapterScreen extends Monogatari.ScreenComponent {
	render() {
		return `
			<h2 data-string="Chapters">Chapters</h2>
		`;
	}
}
ChapterScreen.tag = 'chapter-screen';
monogatari.registerComponent(ChapterScreen);

$_ready (() => {
	// 2. Inside the $_ready function:

	monogatari.init ('#monogatari').then (() => {
		// 3. Inside the init function:

		/* Main menu button: chapter screen */
		monogatari.component('main-menu').addButtonAfter('Load', {
			string: 'Chapters',
			data: {
				action: 'open-screen',
				open: 'chapter'
			}
		});
```

Next, I will get into the meat of the feature: populating the chapter screen with actual chapters. Stay tuned!