---
title: "Appending to Filenames on Windows"
tags:
  - windows
  - commandline
date: "2017-10-27T04:00:00.000Z"
---

While working on a Windows machine, I needed a way to append to filenames for multiple files.

This is what worked for me:

1. Open the File Explorer and navigate to the folder where the files to be renamed are.
2. Hold the Shift key and right-click the explorer, then select "Open command window here".
3. In the command window, type the following script (where *SUFFIX* is to be replaced with the desired suffix):
```
    for %a in (*.png) do
      ren "%~a" "%~naSUFFIX%~xa"
```
4. Hit Enter, and enjoy.
