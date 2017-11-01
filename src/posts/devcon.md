---
title: "Creating Device Manager shortcuts using Devcon"
date: "2015-08-25T22:00:00.000Z"
tags:
- windows
- devcon
- device manager
---

I've had little time to experiment with drawing on the Thinkpad Yoga, so when I had the chance I gave Paint Tool Sai a whirl and see how responsive the Wacom digitizer is. So far, I've been impressed at how accurate the lines are, possibly even more than my dedicated Wacom Graphire tablet. However there is a pitfall: SAI seems too sensitive to my hand touching the screen, causing unwanted strokes to appear. Palm rejection doesn't seem to work on SAI.

I couldn't find a way to quickly toggle the touch screen on Windows 10. You'd expect that sort of function to be available in the Action Centre, but sadly that isn't the case. Instead, I attempted to find a way to toggle it using Device Manager.

The obvious way is to open Device Manager and disable the touch screen (for me it was under _Human Interface Devices > HID-compliant touch screen_), but I'm a pretty lazy person so I wanted to find an even easier method of doing it: creating a shortcut.

***Devcon*** is a tool that adds additional functionality to managing Windows devices from the command line. This isn't available in native Windows, so you need to install it:

[Download Visual Studio Community 2015 and Windows Driver Kit (WDK) 10](https://msdn.microsoft.com/en-us/windows/hardware/dn913721.aspx)

Once you have the Windows kits installed, you can create a shortcut on the Desktop with the following target:

	"C:\Program Files (x86)\Windows Kits\10\Tools\x64\devcon.exe" disable "HID\VID_06CB&PID_764A&REV_0004&Col02"

where the second quoted string is the Hardware ID of the device. This can be found in the device's properties window.

I had to create two for my uses: one for disabling and the other for enabling. Pin it to the Start Menu and done!