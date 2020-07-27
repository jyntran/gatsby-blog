---
title: "Monogatari: Creating a Chapter Screen, Part 2"
tags: ["monogatari", "javascript"]
date: "2020-07-27T04:03:00.000Z"
---

The last post I wrote focused on the declaration of a `ScreenComponent` and accessing it through the main menu.

Here I will get into the fun part: populating the chapter screen with a list of chapters.

## Adding a back button

Currently, the chapter screen is very empty - all it has is a header. 

What I noticed is that there's no back button. That needs to be added manually.

So I grabbed the button from a different screen (e.g. save screen) and put it in as a constant. That way, if I make any similar screens, I can reuse the code.

This is where it is in `main.js`, outside the `$_ready` function:

```
const { $_ready, $_ } = Monogatari;

// 1. Outside the $_ready function:

const screenBackButton = '<svg class="svg-inline--fa fa-arrow-left fa-w-14 top left" data-action="back" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path></svg>';


/* Localization */
monogatari.translation ("English", {
	"Chapters": "Chapters",
});

...

```

## Filling in the template

Next, I'm moving into the `ChapterScreen` class written in Part 1.

I want to add more structure to the template. This takes in consideration such as how to render the chapters, what wrappers are needed, etc.

Here is what I came up with so far, basing it off the template for the save screen.

```
/* Chapter screen component */
class ChapterScreen extends Monogatari.ScreenComponent {
	render() {
		return screenBackButton + `
			<h2 data-string="Chapters">Chapters</h2>
			<div data-ui="chapterSlots">
				<div data-ui="slots" class="row">
			 		<div class="container">` +
					this.generateChapterList() +
					`</div>
				</div>
			</div>`
		`;
	}
}
```

You can see there is a mysterious `this.generateChapterList()` call embedded in the template. This means that the chapter list is going to have some dynamic values! So the chapter list is going to update as the player proceeds in the game.

That will be focused in the next section.

## Generate chapter list

The `generateChapterList` function would appear to have a lot happening inside, but I will take a moment to go through the thought process to help clear things up.

The chapter list is an array of objects, encapsulating different chapter data. Each chapter has the following properties that will determine how it's rendered.

This will be located inside the `ChapterScreen` class.

```
generateChapterList() {
	const chapterList = [
		{
			"name": "Introduction",
			"label": "Intro",
			"conditions": [],
			"conditionArgs": [],
			"class": "",
		},
		{
			"name": "Chapter 1",
			"label": "Chapter1",
			"conditions": [isChapterUnlocked],
			"conditionArgs": ['chapter1'],
			"class": "",
		},
		{
			"name": "Char A Side",
			"label": "CharASide",
			"conditions": [isCharASideUnlocked],
			"class": "chapter-side-charA",
		},
		...
	]
}
```

The following is the algorithm to iterate through the chapters. If the chapter's conditions are fulfilled, i.e. the `condition` function is called with the `conditionArgs` passed in and resolves to true, then the chapter is displayed.

Each chapter with the `isDisplayed` being true is then concatenated to `chapterButtonList`, which will be the final result of `generateChapterList()`.

```
let chapterButtonList = "";
for (let chapterIndex in chapterList) {
	let chapter = chapterList[chapterIndex];
	let isDisplayed = true;
	if (chapter.conditions && chapter.conditions.length > 0) {
		for (let conditionIndex in chapter.conditions) {
			let condition = chapter.conditions[conditionIndex];
			if (chapter.conditionArgs && chapter.conditionArgs.length > 0) {
				isDisplayed = isDisplayed && condition(...chapter.conditionArgs);
			} else {
				isDisplayed = isDisplayed && condition();
			}
		}
	}
	if (isDisplayed) {
		chapterButtonList += 
		`
			<button data-action="jump-to-chapter" data-chapter="` + chapter.label + `" class="` + chapter.class + `">` + chapter.name + `</button>
		`;
	}
}
if (chapterButtonList === "") {
	return "No chapters are currently unlocked.";
}
return chapterButtonList;
```

There is the `data-action="jump-to-chapter"` which is yet to be defined. That will be worked on in a bit.

### Force render chapter screen

The conditions could be anything really, even values retrieved from storage. These values make the screen dynamic, but if the screen is rendered once and never again, it will look like the component is not updated at all.

To make sure the chapter screen is up-to-date, I looked into adding a force render inside the `ChapterScreen` class. It has the same logic as the original `onStateUpdate` with the new addition of `this.forceRender()`.

```
onStateUpdate (property, oldValue, newValue) {
	if (property === 'open') {
		if (newValue === true) {
			this.classList.add('active');
			this.forceRender(); // new addition
		} else {
			this.classList.remove('active');
		}
	}
	return Promise.resolve();
}
```

### Jump-to-chapter action

Monogatari allows action listeners to be registered. For this chapter screen, each button needs a `jump-to-chapter` action in order to load the particular chapter.

I placed this inside the `init` function:


```
monogatari.registerListener ('jump-to-chapter', {
	callback: (event) => {
		const chapterName = event._selector.dataset.chapter;
		monogatari.global('playing', true);
		monogatari.run('jump ' + chapterName)
		event.preventDefault();
	}
});
```

What this does is evaluate the `event`, get the `chapter` label from the dataset, and run the `jump` action.

Notice that I also added set the global variable: `monogatari.global('playing', true);`. This is to ensure that Monogatari sees that the game has started. This is needed to make sure the back button functionality doesn't break in the save/load screens!

### Final code

Here it is, the final result for `ChapterScreen`!

```
/* Chapter screen component */
class ChapterScreen extends Monogatari.ScreenComponent {
	onStateUpdate (property, oldValue, newValue) {
		if (property === 'open') {
			if (newValue === true) {
				this.classList.add('active');
				this.forceRender();
			} else {
				this.classList.remove('active');
			}
		}
		return Promise.resolve();
	}
	generateChapterList() {
		const chapterList = [
			{
				"name": "Introduction",
				"label": "Intro",
				"conditions": [],
				"conditionArgs": [],
				"class": "",
			},
			{
				"name": "Chapter 1",
				"label": "Chapter1",
				"conditions": [isChapterUnlocked],
				"conditionArgs": ['chapter1'],
				"class": "",
			},
			{
				"name": "Char A Side",
				"label": "CharASide",
				"conditions": [isCharASideUnlocked],
				"class": "chapter-side-charA",
			},
		];

		let chapterButtonList = "";
		for (let chapterIndex in chapterList) {
			let chapter = chapterList[chapterIndex];
			let isDisplayed = true;
			if (chapter.conditions && chapter.conditions.length > 0) {
				for (let conditionIndex in chapter.conditions) {
					let condition = chapter.conditions[conditionIndex];
					if (chapter.conditionArgs && chapter.conditionArgs.length > 0) {
						isDisplayed = isDisplayed && condition(...chapter.conditionArgs);
					} else {
						isDisplayed = isDisplayed && condition();
					}
				}
			}
			if (isDisplayed) {
				chapterButtonList += 
				`
					<button data-action="jump-to-chapter" data-chapter="` + chapter.label + `" class="` + chapter.class + `">` + chapter.name + `</button>
				`;
			}
		}
		if (chapterButtonList === "") {
			return "No chapters are currently unlocked.";
		}
		return chapterButtonList;
	}
	render () {
		return screenBackButton + `
			<h2 data-string="Chapters">Chapters</h2>
			<div data-ui="chapterSlots">
				<div data-ui="slots" class="row">
			 		<div class="container">`+
					this.generateChapterList()+
					`</div>
				</div>
			</div>`;
	}
}
ChapterScreen.tag = 'chapter-screen';
monogatari.registerComponent (ChapterScreen);
```

Will there be a part 3 to complete the trilogy?