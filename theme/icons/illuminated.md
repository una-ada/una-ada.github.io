---
author: una
lang: en 
layout: pixel
title: >
  illuminated manuscript
---

## Dropcaps

```javascript
[...document.getElementsByClassName('dropcap')]
  .forEach(e => e.innerHTML = e.innerHTML.replace(
    /^(['‘’"“”]?\w['’]?)/g, (_, l) =>
    `<img alt="${l}" src="/una-theme-icons/30px/ill/${encodeURIComponent(l
      .replace(/[‘’]/g, '\'').replace(/["“”]/g, '"').toLowerCase()
    )}.png" class="ill"/>`)
  );
```

```css
img.ill { float: left; margin: 0.25em; }
```

And so it was that they were never meant to see the end of this journey; the torch was always meant to be passed on.
{:.dropcap}

Before setting off, none of them could have imagined the trials before them, for knowledge of the world beyond those walls was privileged.
{:.dropcap}

Carlos of House Tabby was a righteous leader in the words of his court, a tyrant to those mice whose lives were tied to the grain they harvested.
{:.dropcap}

Death always felt so far away for them; a concept learned through tradition but never seen with their own eyes.
{:.dropcap}

Every resident of this quaint hamlet harbors a deep secret, for they have each awoken mystical powers, yet none know all the others are the same.
{:.dropcap}

Firmly establishing one's authority is the first order of many a reign, guaranteeing the efficacy of rulership thereafter.
{:.dropcap}

Goodness, is this supposed to be a "G"? Like, I get what you were **trying**
to do there, but... yeesh.
{:.dropcap}

Kings and men were nothing before the falling star, its blinding rays turned all before it to ashes in the wind.
{:.dropcap}

Over the years, nothing had swayed the knight's conviction, yet the subtle indentation of her thigh about that garter, well, he needed a moment.
{:.dropcap}

You know, trying to come up with little stories for each letter is kind of fun, not that I'm sticking to that very well, haha.
{:.dropcap}