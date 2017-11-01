---
title: "Lubuntu Startup Script"
date: "2015-09-15T21:29:00.000Z"
tags:
- linux
- lubuntu
---

Dual-booting Lubuntu with Windows nowadays is really easy. The later versions no longer need to worry about Secure Boot or UEFI to be installed, which made installation on my Thinkpad Yoga a breeze. I used Lubuntu 16.04 LTS on my setup.


One thing though that still bugs me is how Lubuntu always wants to set my screen's brightness to max each time I start it up. Imagine beginning a late-night coding session that way!

First I needed a way to adjust the brightness using the command line. [This Ask Ubuntu answer](http://askubuntu.com/a/232668) provides a script that sets up `xbacklight`. To set the brightness to a more comfortable level, say 30, I can run the following:

    $ xbacklight -set 30

Then, thanks to [this Ask Ubuntu answer](http://askubuntu.com/a/391212), Lubuntu is now able to run the `xbacklight` command automatically. All I had to do was to add the command to the following file:

    $ sudo vim ~/.config/lxsession/Lubuntu/autostart

Everything is all set up now. The brightness is still max on the login screen unfortunately, but after reaching the desktop the brightness dims smoothly.
