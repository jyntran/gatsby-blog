---
title: "Adding Disqus to my blog"
date: "2016-02-09T14:14:00.000Z"
tags:
- hexo
- disqus
---

Adding comments to Hexo is really simple.

First, create a site on Disqus: [https://disqus.com/admin/create/](http://disqus.com/admin/create/).

In `_config.yaml`, add the following anywhere in the file:

	disqus_shortname: SITENAME

where SITENAME is the name you gave your site on Disqus. Then:

	$ hexo generate

Each post now has its own comment section if the Hexo theme supports it.