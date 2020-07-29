---
title: "Monogatari: True Distraction-Free Mode"
tags:
  - monogatari
  - css
date: "2020-07-29T04:01:00.000Z"
---

Monogatari provides a Hide button to allow the player to hide the text box. This allows them to view the graphics and backgrounds without the text box obstructing their view! However, I found it doesn't quite look as clean as it could be.

When the Hide button is clicked, the distraction-free mode is enabled. The quick menu - the one that is seen with the text box - will have a transparent background, given by the `transparent` class. The Hide button becomes a Show button, and is given a different colour than the rest of the buttons. The text box only reappears when the button is clicked on.

I wanted to go for something different, and something I've seen in other visual novels: a true distraction-free mode. Here are the features I'm looking to accomplish:
- the other quick menu buttons are completely hidden
- the Show button covers the entire screen, allowing the player to click anywhere to exit distraction-free mode
- the Show button icon and label is hidden

All of the above can be achieved by overriding Monogatari's styling - no JavaScript needed!

Inside `main.css` is where the change is going to be. And here it is:

```
/* hide all buttons when distraction-free is on */
[data-component="quick-menu"].transparent button {
	display: none;
}

/* resize Show button to entire screen */
[data-component="quick-menu"].transparent [data-action="distraction-free"] {
	display: block;
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
}

/* hide Show button label and icon */
[data-component="quick-menu"].transparent [data-action="distraction-free"] span,
[data-component="quick-menu"].transparent [data-action="distraction-free"] .svg-inline--fa {
	display: none;
}
```

Now the player can view the entire screen with absolutely no distractions!