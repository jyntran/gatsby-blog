---
title: "Filtering an Anki Deck"
tags:
  - anki
  - ankidroid
date: "2017-05-25T22:11:00.000Z"
---

I have an Anki deck with multiple tags associated with it. I wanted to find a way to make a deck composed of certain tags.

Suppose I wanted to study for a test that covers chapters 1 and 2 using a deck called History. The deck has cards that either have "ch01" or "ch02" as a tag, as well as other chapters mixed in.

Here's how to make a filtered deck.

## Anki (Desktop)

1. Open Anki.
2. Go to **Tools > Create Filtered Deck**.
3. In Search, the deck has already been selected (deck:"Default"). Change it to the appropriate deck: in my case, it will be `"deck:"History"`.
4. Next, specify which tags to search for and add them in Search. In my example, I would now add `and ("tag:ch01" or "tag:ch02")`. The `or` operator will find cards that have either one tag or the other.
5. Check that my query is correct. In the end I have `"deck:History" and ("tag:ch01" or "tag:ch02")` as my Search input.
6. Click **Build**. Now the filtered deck is ready.

## AnkiDroid (Android)

1. Open AnkiDroid.
2. Tap the menu icon in the top right corner, then tap **Create filtered deck**.
3. The Options screen appears. Tap Search and enter your query. Change it to the appropriate deck: in my case, it will be `"deck:"History"`.
4. Next, specify which tags to search for and add them in Search. In my example, I would now add `and ("tag:ch01" or "tag:ch02")`. The `or` operator will find cards that have either one tag or the other.
5. Check that my query is correct. In the end I have `"deck:History" and ("tag:ch01" or "tag:ch02")` as my Search input.
6. Tap the Back button in the top left corner. Now the filtered deck is ready.