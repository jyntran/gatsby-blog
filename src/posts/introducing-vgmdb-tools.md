---
title: "Introducing VGMdb Tools"
tags:
  - vgmdb
  - flask
  - python
  - foobar2000
date: "2016-10-13T15:38:00.000Z"
---


Way back [I made a blog entry about the useful tagging functionality in foobar2000](http://blog.jyntran.ca/2016/01/22/foobar2000-tagging-tools/). In it I mentioned the _Automatically fill each field_ tool that fills in the tags of a song using the text saved on the clipboard. So I would copy a list of tracks of an album then use this tool to apply the strings to say the track name (`%title%` parameter on foobar2000). It's nifty.

So I order some foreign CDs for my collection, and they are usually listed on [VGMdb.net](http://vgmdb.net). The thing is, if I want to tag the albums correctly, I would need to get the track list, which is almost always consisting of foreign characters in Unicode. If I was to do this manually, I would select a track to edit the track name, then go to the album's page to get the correct title, copy that, then paste it into the track's properties. Rinse and repeat for the rest of the tracks. How tedious would that be?

Okay, what about copying all of the tracks at once then using the auto-fill tool? That would work, if the site does not have other page elements interfering. If I did that with the track list as it is, I would copy over the track number and duration as well. I just want to isolate the track names in an easy-to-copy-and-paste way.

I discovered that VGMdb has its own API. Maybe I could use it to grab the track names?

This is why I made VGMdb Tools. Now I would enter the album's URL/ID into the app, and out would appear the track list in a textfield, perfect for me to copy and paste into the auto-fill tool. I went ahead and added other features such as outputting the names of the album in different languages and providing the highest resolution cover art available on the site.

So far, I got the basic functionality down, and the layout still needs some styling, but I got what I need done. Next is to learn more about using Flask and how to render different templates.

You can view the tool live here: [http://vgmdb.jyntran.ca](http://vgmdb.jyntran.ca)