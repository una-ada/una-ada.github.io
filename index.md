---
title: Una's Blog & Portfolio
---

This page is a work in progress! I'm going to update it more when I get more of
the layouts and includes done... [for now, here's a link to my "work."](/works)

## Posts

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
