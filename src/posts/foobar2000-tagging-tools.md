---
title: "Tagging Tools in foobar2000"
date: "2016-01-22T05:00:00.000Z"
tags:
- music
- foobar2000
- metadata
- windows
---

There's a reason why I stuck with [foobar2000](https://www.foobar2000.org/) all these years. It has a clean, minimalistic, no-nonsense GUI that plays your music. It may look dated, but it does the job consistently no matter what I do. It has several installable plugins that help enhance your experience, even improving the GUI if it really doesn't suit your taste.

In fact, there's still built-in foobar2000 features that I have yet to discover, including the following.

Imagine having ripped music from your physical albums, some with multiple discs, for playing it digitally on whatever device you want. (Well, it might be hard to imagine that now that music can be downloaded in so many ways, and we're not even discussing the popularity of streaming music - but I digress.) Having my music library all digitized is great, but to make things simpler to sort and track, I combined all the discs into one album and renumbered the tracks. Now a four disc album with say 10 tracks per disc is now classified as one album with 40 tracks.

Now I know better and that the metadata has a field for disc number, I would like to have it returned to how it was before, tracks 1-10 on each disc. But, who wants to go through each track and renumber them? Is it even worth the effort?

Here comes foobar2000's incredibly powerful tagging system. Using its [arithmetic functions](http://wiki.hydrogenaud.io/index.php?title=Foobar2000:Title_Formatting_Reference#Arithmetic_functions) I can simply select multiple tracks and automate the numbering process: in this case, using `$sub(a,b)` to subtract from the current track number. The resulting string is `$sub(%tracknumber%,10)`. This would need to be done for each disc, but if the disc number field was filled in previously, I could then use `$sub(%tracknumber%, $mult(10,%discnumber%))` for all the tracks in the album.

I'm so amazed at how simple it was, that I began looking for other foobar2000 features I missed. There is the _Automatically fill each field_ that takes in a string, whether it's the track's file name or a list of strings that is on your clipboard, and allows you to fill in metadata according to the string. This is wonderful for renaming tracks in bulk.

One thing I lament is that it doesn't run on Linux. However, a worthy substitute is [DeaDBeeF](http://deadbeef.sourceforge.net/), which has a similar tabbed playlist layout, which just as well suits my simple needs.

Don't be misled by the 2000 in foobar2000; I still find it easy to use and convenient for a power user in 2016, and it will definitely hold its ground against other audio players.