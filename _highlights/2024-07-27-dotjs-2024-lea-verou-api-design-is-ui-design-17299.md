---
author: dotconferences
book_id: 42678880
book_url: https://readwise.io/bookreview/42678880
category: articles
date: '2024-07-27 14:43:53'
highlight_id: 751110228
is_favorite: false
layout: highlight
note: referring to the browser api that shows video player toolbar. 1 line to show
  basic toolbar, have to reimplement to add custom buttons
source: reader
source_url: https://m.youtube.com/watch?v=g92XUzc1OHY&list=PLMW8Xq7bXrG7fOUOLJQw9I7ygJCbue9zO&index=7
title: dotJS 2024 - Lea Verou - API Design Is UI Design
---

Where would the video be on our chart? Simple things are easy, complex things are possible, but how do we go from one to the other? Once use case complexity crosses a certain threshold, UI complexity abruptly shoots up because that’s the point where you have to reimplement everything yourself. This is called the usability cliff, and it’s very common in UIs that try to make simple things easy and complex things possible by just doing it twice. They give you two distinct APIs: one for making simple things easy, which is super high-level and optimized around the very common use cases, and another API that is super low-level where you can do whatever you want but have to reimplement it yourself.

I used to think the Alan's maxim was the be-all and end-all of API design. I don’t anymore. Making simple things easy and complex things possible is a good first step, and yes, it’s surprising how many APIs fail at it. However, these are just the two ends of the spectrum. For truly delightful APIs, all the points in between matter as well. In fact, you want to aim for a smooth curve where UI complexity increases gradually and slowly with use case complexity. The more gradual, the better.