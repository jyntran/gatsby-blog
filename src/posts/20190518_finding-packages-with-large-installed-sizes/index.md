---
title: "Finding Packages with Large Installed Sizes"
tags:
  - linux
  - dpkg
  - dpkg-query
date: "2019-05-18T04:01:00.000Z"
---

I needed to clear some disk space and wanted to find out if there are any programs I'm not using that take up substantial space.

Thanks to [this Unix StackExchange post](https://unix.stackexchange.com/a/299747), I can do this:

```
dpkg-query -W -f='${Installed-Size;8}  ${Package}\n' | sort -n
```

Essentially, list all installed packages with the size first, then sort numerically. I can then read and determine if it's a program I don't use anymore and get rid of it with:

```
sudo apt remove <PACKAGE-NAME>
```