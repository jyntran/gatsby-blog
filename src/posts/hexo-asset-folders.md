---
title: "Hexo's Asset Folders"
tags:
  - hexo
  - markdown
date: "2016-02-08T18:50:00.000Z"
---

My past posts sadly have no images, so I took some time to look into how to embed images into Hexo posts.

First I set this in my `_config.yml file`:

	post_asset_folder: true

Then the Markdown way of linking relative image files is this:

	![does this work?](help.png)

![does this work?](help.png)

Since that doesn't work, I checked Hexo's documentation on [asset folders](https://hexo.io/docs/asset-folders.html) and found that the issues is caused by multiple index files for the archive and index pages.

Using the tags on their page (I can't post them because they render the images instead of leaving it as code):

{% asset_img help.png this works %}

It would be more streamlined to have the Markdown format working, but at least this way is still intuitive, somewhat.