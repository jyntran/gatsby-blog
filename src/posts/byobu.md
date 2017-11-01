---
title: "Remove Old Linux Kernels with Byobu"
tags:
  - linux
  - byobu
date: "2017-10-15T04:00:00.000Z"
---


Here's a simpler way of deleting old Linux kernels.

Install *Byobu*:

    sudo apt install byobu

After that, the command to remove all Linux kernels except for the two latest is:

    sudo purge-old-kernels --save 2