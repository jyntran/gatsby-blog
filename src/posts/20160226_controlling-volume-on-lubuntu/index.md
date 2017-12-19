---
title: "Controlling Volume on Lubuntu's Openbox"
date: "2016-02-26T16:42:00.000Z"
tags:
  - linux
  - lubuntu
  - openbox
---


As I'm getting Lubuntu back to how it was before, I noticed that my volume keyboard shortcuts don't work. The Fn keys definitely do their job, but for toggling mute and adjusting the volume level, nothing happens.

I try to remember what I did to fix it, and with some google-fu managed to find the [Ask Ubuntu page](https://askubuntu.com/questions/454955/using-amixer-to-control-volume) that helped me before.

First we need to check what is currently configured in Openbox's configuration file.

    $ sudo vim ~/.config/openbox/lubuntu-rc.xml

Inside is a long list, so let's jump to "Volume management" using Ctrl+F:

    ...
    
    <!-- Keybinding for Volume management -->
    <keybind key="XF86AudioRaiseVolume">
      <action name="Execute">
        <command>amixer -q sset Master 3%+ unmute</command>
      </action>
    </keybind>
    <keybind key="XF86AudioLowerVolume">
      <action name="Execute">
        <command>amixer -q sset Master 3%- unmute</command>
      </action>
    </keybind>
    <keybind key="XF86AudioMute">
      <action name="Execute">
        <command>amixer -q sset Master toggle</command>
      </action>
    </keybind>
   
    ...

We can see if that keybinding is indeed correct for the volume control keys by using `xev`:

    $ xev

Then while `xev` is running, press the keyboard shortcut (I tried Fn+F1 for the mute toggle). The keybinding does indeed show up as `XF86AudioMute`.

So referring back to that Ask Ubuntu solution, it seems the command needs to be adjusted. The original:

    <command>amixer -q sset Master toggle</command>

Now the new command should read:

    <command>amixer -D pulse sset Master toggle</command>
    
Put it together for all the bindings we need and we have:

    ...
    
    <!-- Keybinding for Volume management -->
    <keybind key="XF86AudioRaiseVolume">
      <action name="Execute">
        <command>amixer -D pulse sset Master 3%+ unmute</command>
      </action>
    </keybind>
    <keybind key="XF86AudioLowerVolume">
      <action name="Execute">
        <command>amixer -D pulse sset Master 3%- unmute</command>
      </action>
    </keybind>
    <keybind key="XF86AudioMute">
      <action name="Execute">
        <command>amixer -D pulse sset Master toggle</command>
      </action>
    </keybind>
   
    ...

Save the file, close it, and remember to recongifure Openbox:

    $ openbox --reconfigure

All done!