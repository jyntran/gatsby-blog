---
title: "Clearing Linux's Disk Space"
date: "2016-02-10T17:21:00.000Z"
tags:
  - linux
  - kernel
  - apt
---

While I was working on my Linux partition, I saw a software update was pending and gave it the go-ahead. It was then that I realized that I only had a couple hundred megabytes of space left, out of the total 13GB.

I use my Lubuntu to do the bulk of my programming, anything graphic-intensive is left to my Windows 10, as well as my music and videos. So when I saw how little space I had left on Linux, it concerned me.

So I did a quick search to see what I can do to clear out unnecessary files.

	$ sudo apt-get autoremove
	$ sudo apt-get clean
	$ sudo apt-get autoclean
	$ sudo apt-get clean

`autoremove` removes any unused packages.
`autoclean` removes any old files.
`clean` clears `apt`'s cache folder after each operation.

Not a lot was reclaimed though. So what else can I do? Check for any old kernel files that are left and are unused.

It's important to check what my current kernel version is, so I did this:

	$ uname -r
	3.19.0-49-generic

Remember this version for the next while, and do not touch it.

Now to view all kernels on Linux:

	$ dpkg --list | grep linux-image

Which outputs something like this:

	rc  linux-image-3.19.0-25-generic              3.19.0-25.26~14.04.1                    amd64        Linux kernel image for version 3.19.0 on 64 bit x86 SMP
	rc  linux-image-3.19.0-26-generic              3.19.0-26.28~14.04.1                    amd64        Linux kernel image for version 3.19.0 on 64 bit x86 SMP
	ii  linux-image-3.19.0-31-generic              3.19.0-31.36~14.04.1                    amd64        Linux kernel image for version 3.19.0 on 64 bit x86 SMP
	ii  linux-image-3.19.0-32-generic              3.19.0-32.37~14.04.1                    amd64        Linux kernel image for version 3.19.0 on 64 bit x86 SMP
	ii  linux-image-3.19.0-33-generic              3.19.0-33.38~14.04.1                    amd64        Linux kernel image for version 3.19.0 on 64 bit x86 SMP
	ii  linux-image-3.19.0-37-generic              3.19.0-37.42~14.04.1                    amd64        Linux kernel image for version 3.19.0 on 64 bit x86 SMP
	ii  linux-image-3.19.0-39-generic              3.19.0-39.44~14.04.1                    amd64        Linux kernel image for version 3.19.0 on 64 bit x86 SMP
	ii  linux-image-3.19.0-42-generic              3.19.0-42.48~14.04.1                    amd64        Linux kernel image for version 3.19.0 on 64 bit x86 SMP
	ii  linux-image-3.19.0-43-generic              3.19.0-43.49~14.04.1                    amd64        Linux kernel image for version 3.19.0 on 64 bit x86 SMP
	ii  linux-image-3.19.0-47-generic              3.19.0-47.53~14.04.1                    amd64        Linux kernel image for version 3.19.0 on 64 bit x86 SMP
	ii  linux-image-3.19.0-49-generic              3.19.0-49.55~14.04.1                    amd64        Linux kernel image for version 3.19.0 on 64 bit x86 SMP
	rc  linux-image-extra-3.19.0-25-generic        3.19.0-25.26~14.04.1                    amd64        Linux kernel extra modules for version 3.19.0 on 64 bit x86 SMP
	rc  linux-image-extra-3.19.0-26-generic        3.19.0-26.28~14.04.1                    amd64        Linux kernel extra modules for version 3.19.0 on 64 bit x86 SMP
	ii  linux-image-extra-3.19.0-31-generic        3.19.0-31.36~14.04.1                    amd64        Linux kernel extra modules for version 3.19.0 on 64 bit x86 SMP
	ii  linux-image-extra-3.19.0-32-generic        3.19.0-32.37~14.04.1                    amd64        Linux kernel extra modules for version 3.19.0 on 64 bit x86 SMP
	ii  linux-image-extra-3.19.0-33-generic        3.19.0-33.38~14.04.1                    amd64        Linux kernel extra modules for version 3.19.0 on 64 bit x86 SMP
	ii  linux-image-extra-3.19.0-37-generic        3.19.0-37.42~14.04.1                    amd64        Linux kernel extra modules for version 3.19.0 on 64 bit x86 SMP
	ii  linux-image-extra-3.19.0-39-generic        3.19.0-39.44~14.04.1                    amd64        Linux kernel extra modules for version 3.19.0 on 64 bit x86 SMP
	ii  linux-image-extra-3.19.0-42-generic        3.19.0-42.48~14.04.1                    amd64        Linux kernel extra modules for version 3.19.0 on 64 bit x86 SMP
	ii  linux-image-extra-3.19.0-43-generic        3.19.0-43.49~14.04.1                    amd64        Linux kernel extra modules for version 3.19.0 on 64 bit x86 SMP
	ii  linux-image-extra-3.19.0-47-generic        3.19.0-47.53~14.04.1                    amd64        Linux kernel extra modules for version 3.19.0 on 64 bit x86 SMP
	ii  linux-image-extra-3.19.0-49-generic        3.19.0-49.55~14.04.1                    amd64        Linux kernel extra modules for version 3.19.0 on 64 bit x86 SMP
	ii  linux-image-generic-lts-vivid              3.19.0.49.34                            amd64        Generic Linux kernel image

How to go about selecting which ones to remove? The [Lubuntu documentation](https://help.ubuntu.com/community/Lubuntu/Documentation/RemoveOldKernels) has a great reference, so I snatched it and put it here:

	## https://help.ubuntu.com/community/Lubuntu/Documentation/RemoveOldKernels
	
	rc  linux-image-extra-4.2.0-14-generic   ## The oldest kernel in the database
	                                         ##  Status 'rc' means it's already been removed
	ii  linux-image-extra-4.2.0-15-generic   ## The oldest installed kernel. Eligible for removal. 
	                                         ##  Status 'ii' means Installed.
	ii  linux-image-extra-4.2.0-16-generic   ## Another old installed kernel. Eligible for removal
	ii  linux-image-extra-4.2.0-18-generic   ## Another old installed kernel. Eligible for removal
	ii  linux-image-extra-4.2.0-19-generic   ## The previous good kernel. Keep
	ii  linux-image-extra-4.2.0-21-generic   ## DO NOT REMOVE. The currently-running kernel
	iU  linux-image-extra-4.2.0-22-generic   ## DO NOT REMOVE. Status 'iU' means it's not installed, 
	                                         ##  but queued for install in apt.
	                                         ##  This is the package we want apt to install.
	ii  linux-image-generic                  ## DO NOT REMOVE. This is the metapackage that
	                                         ##  regularly updates your kernel

For this example I will choose `linux-image-3.19.0-31-generic` and purge it. This will also remove the `-extra` and `-header` files.

	$ sudo apt-get purge linux-image-3.19.0-31-generic
	Reading package lists...
	Building dependency tree...
	Reading state information...
	The following packages were automatically installed and are no longer required:
	  linux-headers-3.13.0-77 linux-headers-3.13.0-77-generic
	  linux-headers-generic
	Use 'apt-get autoremove' to remove them.
	The following packages will be REMOVED:
	  linux-image-3.19.0-31-generic* linux-image-extra-3.19.0-31-generic*
	0 upgraded, 0 newly installed, 2 to remove and 42 not upgraded.
	After this operation, 207 MB disk space will be freed.
	Do you want to continue? [Y/n]

`Y` please!

	(Reading database ... 475586 files and directories currently installed.)
	Removing linux-image-extra-3.19.0-31-generic (3.19.0-31.36~14.04.1) ...
	Purging configuration files for linux-image-extra-3.19.0-31-generic (3.19.0-31.36~14.04.1) ...
	Removing linux-image-3.19.0-31-generic (3.19.0-31.36~14.04.1) ...
	Purging configuration files for linux-image-3.19.0-31-generic (3.19.0-31.36~14.04.1) ...

After that, 

	$ sudo apt-get autoremove
	$ sudo apt-get clean

and then marvel at how much disk space you've reclaimed.

	$ df -h

Hopefully it's a lot. If not, rinse and repeat with the rest of the kernels. I also cleared the ones with `ri` so that they are out of the way. ***Remember not to delete your `uname -r` kernel.*** In my case, I don't touch `linux-image-3.19.0-49-generic`.

Since these kernels are available on the grub2 screen on startup, it's a good idea to update grub2.

	$ sudo update-grub2 

Lastly, do a reboot and all is well. This way, I managed to get back almost 3GB of space back - a lot more easier on the eyes.