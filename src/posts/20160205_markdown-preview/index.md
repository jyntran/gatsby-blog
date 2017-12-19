---
title: "Markdown Preview in Sublime Text"
date: "2016-02-05T03:54:00.000Z"
tags:
- linux
- markdown
- markdown preview
- sublime text
---

There's something satisfying about typing up Markdown notes on Sublime Text. You could say it's almost _sublime_.

A useful package I use is [Markdown Preview](https://github.com/revolunet/sublimetext-markdown-preview), which allows you to preview Markdown files in your browser window.

To install it, `Ctrl+Shift+P` to open up the Command Palette, then type to find ***Package control: Install Package***. Then by typing Markdown you can find plenty of other tools to help in maximizing your Markdown files' capabilities. Press Enter and Sublime will start downloading and installing.

Now whenever I'm editing a Markdown file and woudl like to see if I butchered its formatting, I open up the Command Palette again and type ***Markdown Preview: Preview in Browser***, then Enter. You have the option of choosing either GitHub-flavoured or normal Markdown format. After selecting one or the other, your default browser should open up with your Markdown file.

If you're like me and use Sublime on a Linux machine with Chrome as your browser, you might have Firefox open instead. This can be simply changed by going to ***Preferences > Package Settings > Settings - Default*** and change the `"browser"` value to the path of your preferred browser. I chose to change my user settings instead, so my file from ***Preferences > Package Settings > Settings - User*** is:

	{
		"browser" : "/usr/bin/google-chrome"
	}

The value is taken from entering the `whereis` command in the Terminal:

	$ whereis google-chrome

There's several other options in the Command Palette for Markdown Preview you may find useful. I like the ***Markdown Preview: Open Markdown Cheat Sheet*** myself.