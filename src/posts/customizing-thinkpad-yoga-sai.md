---
title: "Customizing ThinkPad Yoga's pen button to work with SAI"
date: "2015-08-31T04:00:00.000Z"
tags:
- thinkpad yoga
- paint tool sai
- wacom
- windows
---

Recently I got a new laptop to replace my aging Zenbook: the Lenovo ThinkPad Yoga 12". It looks to be the perfect machine for me: the small lightweight frame, a full HD multi-touch screen, and the active pen digitizer from Wacom. This would make it a great portable drawing tablet, although the weight could still be a bit much for another artist.

The included pen doesn't have an eraser tip, but it does have a single button which can be configured in the Wacom pen settings. The settings I'm referring to are in the [Wacom Feel](http://us.wacom.com/en/feeldriver/) control panel, which needs to be installed separately.

What I like to use is [Paint Tool Sai](https://www.systemax.jp/en/sai/) for my drawings, and frequently I use the undo function to erase my last stroke and try again to draw the stroke I want. Since the laptop folds inself over in tablet mode, the keyboard is no longer accessible, so `Ctrl+Z` is impossible. What if I programmed the pen's button to call undo?

I found that setting it in the Wacom Feel settings isn't enough; SAI didn't register the button at all. After some searching, it turns out SAI's settings need to be modified as well. Under `Others > Options > Digitizer Support` there is a section to set commands to the pen's buttons. I set the `Shortcut` button to `Ctrl+Z` and now it responds correctly.

Drawing on the ThinkPad Yoga takes some time to get used to, and the palm detection isn't as good as my Wacom Graphire tablet, but with undo programmed into the pen's button, it's a lot easier now to draw on SAI. If only there's a way to increase SAI's menu button size!