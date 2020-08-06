---
title: "TWRP Backup createTarFork() Fix"
tags:
  - twrp
  - android
  - recovery
date: "2020-08-05T04:01:00.000Z"
---

It's been a while since I made a [TWRP](https://twrp.me/about/) backup of my phone. And I wanted to install [GravityBox](https://forum.xda-developers.com/xposed/modules/app-gravitybox-v9-0-0-beta-1-android-9-t3908768) in order to take advantage of removing Spotify's album art from my phone's lockscreen. I just want my lockscreen wallpaper to stay shown, and not the low resolution album art stretched to fit the screen.

So, once I tried to make the backup, it almost reached completion until I got a strange error.

```
createTarFork() process ended with ERROR: 255
Backup Failed. Cleaning Backup Folder.
```

I went and searched this cryptic message and found a variety of solutions. But [this one](https://android.stackexchange.com/a/205453) and [this one](https://android.stackexchange.com/a/216667) are the winners in my eyes.

Basically, I had enabled OnePlus's Parallel Apps at one point in order to support multiple versions of apps. This created an additional user with folders that errored out in TWRP's backup process.

So I went and disabled Parallel Apps in **Settings > Utilities > Parallel Apps**, then toggled off all of them. There is a warning that appears to ensure that you want to delete app data, so read and tap carefully.

Next, I searched for the folders to see what the user's ID number is. I looked in [that XDA post](https://forum.xda-developers.com/showpost.php?p=75047135&postcount=4) to see what was on my phone. In my case I had `999`, same as the poster.

Next, I opened Terminal Emulator and typed in the command provided to delete the user's folders.

```
su
pm remove-user 999
```

And that was it. I made sure to remove all security locks (e.g. PINs, pattern locks, fingerprints, etc.) before booting into recovery, and then retried the TWRP backup.

In the end, it completed successfully, and I was able to install GravityBox easily without fear.

Now I can enjoy my lockscreen wallpaper again!