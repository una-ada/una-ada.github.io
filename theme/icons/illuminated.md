---
author: una
lang: en 
layout: pixel
title: >
  illuminated manuscript
---

## Dropcaps

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
![](/una-theme-icons/30px/ill/o.png)
![](/una-theme-icons/30px/ill/y.png)
{:.center}

Using these as dropcaps on a webpage is relatively simple; this script will 
replace the first letter of any 'dropcap' classed element with the appropriate 
castle letter:

```javascript
[...document.getElementsByClassName('dropcap')]
  .forEach(e => e.innerHTML = e.innerHTML.replace(
    /^\w/g, (_, l) => `<img class="ill" alt="${l}"
      src="/una-theme-icons/30px/ill/${l.toLowerCase()}.png" />`
  ));
```

The letters can then by styled as you would any dropcap, using the '.ill' selector rather than the '::first-letter' selector:

```css
img.ill { float: left; margin: 0.25em; }
```