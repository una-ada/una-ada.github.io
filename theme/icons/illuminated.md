---
author: una
lang: en 
layout: pixel
title: >
  illuminated manuscript
---

## Initials

Initials are the letters at the beginning of paragraphs that are presented larger than the rest of the text. In modern typography, you would think of drop caps here, which push the text over and run two or more lines down from the top.
[Anarchy.Website](https://anarchy.website){:target="_blank"} has them, so I
wanted 猫.dev to have them too! Upscaling the copy text for drop caps is always 
cringe, especially since the font here, [Cozetter-(U)CSUR][1], is meant 
to be pixel-perfect. Rather than trying to find an alternative title font, I
thought it would be more fun to draw inspiration from [illuminated
manuscripts][2]{:target="_blank"} and design fancy 30px tall initials.
{:.dropcap}

[1]: /theme/#cozette-ucsur
[2]: https://en.wikipedia.org/wiki/Illuminated_manuscript

![](/una-theme-icons/30px/ill/a.png)
![](/una-theme-icons/30px/ill/b.png)
![](/una-theme-icons/30px/ill/c.png)
![](/una-theme-icons/30px/ill/d.png)
![](/una-theme-icons/30px/ill/e.png)
![](/una-theme-icons/30px/ill/f.png)
![](/una-theme-icons/30px/ill/g.png)
![](/una-theme-icons/30px/ill/h.png)
![](/una-theme-icons/30px/ill/i.png)
![](/una-theme-icons/30px/ill/j.png)
![](/una-theme-icons/30px/ill/k.png)
![](/una-theme-icons/30px/ill/l.png)
![](/una-theme-icons/30px/ill/m.png)
N
![](/una-theme-icons/30px/ill/o.png)
P Q R S T U V W X
![](/una-theme-icons/30px/ill/y.png)
Z <!-- Æ Ð Ø Œ Þ -->
{:.center}

Using these as dropcaps on a webpage is relatively simple; this script will 
replace the first letter of any 'dropcap' classed element with the appropriate 
initial:

```javascript
[...document.getElementsByClassName('dropcap')]
  .forEach(e => e.innerHTML = e.innerHTML.replace(
    /^(\w)/g, (_, l) => `<img class="ill" alt="${l}"
      src="/una-theme-icons/30px/ill/${l.toLowerCase()}.png" />`
  ));
```

The letters can then by styled as you would any dropcap, using the '.ill' selector rather than the '::first-letter' selector:

```css
img.ill { float: left; margin: 0.25em; }
```

For "I don't want to deal with that" reasons, my answer to the [opening 
quotation marks][3]{:target="_blank"} question is to leave them out entirely. 
I may come back to this and add alternative forms with quotation marks 
eventually, as it would also justify variations to the letter forms; however, as
of now, the RegEx in the previous script would not match a letter preceded by 
punctuation.

[3]: https://en.wikipedia.org/wiki/Initial#Opening_quotation_marks