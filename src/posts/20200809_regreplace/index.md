---
title: "RegReplace: for those batch text replacements"
tags:
  - sublime text
  - regex
  - regreplace
date: "2020-08-09T04:01:00.000Z"
---

I found this useful Sublime Text plugin when figuring out how to perform a series of text replacements en masse. Called [Reg Replace](https://github.com/facelessuser/RegReplace), it allows me to create commands for whatever Find-and-Replace operations I want.

First, I installed it using Sublime Text's Package Control: `Preferences > Package Control`, then `Install Package `, then typing in `RegReplace`, then pressed `Enter`.

Once it's installed, the quick start guide appears. It may seem like a lot to take in at first, but it's actually fairly simple.

## Rules

The first thing I needed to do is create a rule. To do this, I can do this in two ways:
1. Using the wizard: perform the command (`Tools > Command Palette (Ctrl + Shift + P)`, then `RegReplace: Create New Regular Expression Rule`)
2. Edit the `Rules - User` file directly: `Preferences > Package Settings > RegReplace > Rules - User`

With the wizard, it opens up a new panel in Sublime Text, where I can fill out the required fields indicated. Make sure for the ones that indicate `str` that the values are wrapped in quotation marks. Then, once I feel the rule is completed, I simply save it with `Ctrl + S`.

At this point, opening up `RegReplace > Rules - User` will now show the new rule!

After running the wizard once and creating my first rule, I prefer to edit the file directly from then on. Here is what mine looks like after my first rule:

```
{
	"replacements":
	{
		"replace_ellipses_with_three_periods":
		{
			"find": "…",
			"literal": true,
			"name": "replace_ellipses_with_three_periods",
			"replace": "..."
		}
	}
}

```

The basics are very simple: give the rule a name, what it should find, what it should replace it with, and indicate whether the change is literal (e.g. is it a non-regex change).

Here is my file after creating a second one (replacing `"",` with an empty string):

```
{
	"replacements":
	{
		"replace_ellipses_with_three_periods":
		{
			"find": "…",
			"literal": true,
			"name": "replace_ellipses_with_three_periods",
			"replace": "..."
		},
		"remove_empty_string_and_comma":
		{
			"find": "\"\",",
			"literal": true,
			"name": "remove_empty_string_and_comma",
			"replace": ""
		}
	}
}

```

## Commands

Next is the creation of Sublime Text commands. Remember how I pulled up the Command Palette? I can create my own custom command to run whatever RegReplace rules I want, in the order I want. That's powerful!

Here is where to create commands: `Preferences > Package Settings > RegReplace > Commands - User`. This opens up the `Default.sublime-commands` file.

It's empty at the moment, but that will change soon. It takes in an array of JSON objects. You can find an example on [RegReplace's documention](http://facelessuser.github.io/RegReplace/usage/#create-find-and-replace-sequences).

This is what my `Default.sublime-commands` file looks like after creating a command.

```
[
	{
		"caption": "RegReplace: Replace ellipses with ...",
		"command": "reg_replace",
		"args" : {
			"replacements": [
				"replace_ellipses_with_three_periods"
			],
			"find_only": true
		}
	},
]
```

Notice how `replacements` is an array? That means it can take multiple rules!

So I can create this command:

```
[
	{
		"caption": "RegReplace: Replace ellipses with ... and remove empty strings with comma",
		"command": "reg_replace",
		"args" : {
			"replacements": [
				"replace_ellipses_with_three_periods",
				"remove_empty_string_and_comma"
			],
			"find_only": true
		}
	},

]
```

Now I can run it through the Command Palette. With a quick key shortcut of `Ctrl + Shift + P` and typing in a part of the command name, it will appear! 

This is really powerful and helps automate find-and-replace operations for me.