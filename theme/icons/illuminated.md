---
author: una
lang: en 
layout: pixel
title: >
  illuminated manuscript
---

<style>
  .sample img { margin-right: 2px; }
  .marg td { width: 10em; text-align: center; padding: 0;}
</style>

una theme icons<br/>
for illuminated<br/>
manuscripts
{:.center.sample}

## Initials

Initials are the letters at the beginning of paragraphs that are presented larger than the rest of the text. In modern typography, you would think of drop caps here, which push the text over and run two or more lines down from the top.
[Anarchy.Website](https://anarchy.website){:target="_blank"} has them, so I
wanted 猫.dev to have them too! Upscaling the copy text for drop caps is always 
cringe, especially since the font here, [Cozetter-(U)CSUR][1], is meant 
to be pixel-perfect. Rather than trying to find an alternative title font, I
thought it would be more fun to draw inspiration from [illuminated
manuscripts][2]{:target="_blank"} and design fancy 30px tall initials:
{:.dropcap}

[1]: /theme/#cozette-ucsur
[2]: https://en.wikipedia.org/wiki/Illuminated_manuscript

ABCDEFGHIJKLM<br/>NOPQRSTUVWXYZ<!--ÆÐØÞ-->
{:.center.sample}

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

<script>
  [...document.getElementsByClassName('sample')]
    .forEach(e =>e.innerHTML = e.innerHTML.replace(
      /(?![^<]*>)(\w)/g, (_, l) => `<img alt="${l}"
      src="/una-theme-icons/30px/ill/${l.toLowerCase()}.png" />`
    ));
</script>

## Marginalia

Marginalia, drolleries, or grotesques are what truly illuminate a manuscript, in
my opinion. With some encouragement from my wife, I obviously had to include 
some little guys in the icons set.
{:.dropcap}
<!--
Most are directly traced from existing 
manuscripts (the sources are listed in the tables below), but I did try my hand 
at some originals.

These are categorized by their formfactor, being vertical (48 x 84px), 
horizontal (84 x 48px), or square (84 x 84px). 
-->


<table class="marg">
  <tr>
    <td>
      <img src="/una-theme-icons/48px/ill/vert1.png"/><br/>
      vert1.png<br/>
      48 x 84px<br/>
      <a href="https://portail.biblissima.fr/fr/ark:/43093/ifdata9d89ae1afbd7dc9375bf87a37c24e4d9b7609483" target="_blank">
        Pontifical of Renaud de Bar, f. 137v</a>
    </td>
    <td>
      <img src="/una-theme-icons/48px/ill/vert2.png"/><br/>
      vert2.png<br/>
      48 x 84px<br/>
      <a href="https://www.imagesonline.bl.uk/asset/6133/" target="_blank">
        Smithfield Decretals, f. 49v</a>
    </td>
    <td>
      <img src="/una-theme-icons/48px/ill/vert3.png"/><br/>
      vert3.png<br/>
      48 x 84px<br/>
      <a href="https://portail.biblissima.fr/fr/ark:/43093/ifdata35f1398405b40ea4229f4dab95fdbf9f67678d3c" target="_blank">
        Pontifical of Renaud de Bar, f. 99v</a>
    </td>
    <td>
      <img src="/una-theme-icons/48px/ill/vert4.png"/><br/>
      vert4.png<br/>
      48 x 84px<br/>
      <a href="https://iiif.bl.uk/uv/#?manifest=https://bl.digirati.io/iiif/ark:/81055/vdc_100165173879.0x000001" target="_blank">
        Maastricht Hours,<br/>f. 185r</a>
    </td>
  </tr>
</table>