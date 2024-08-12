---
author: swizec.com
book_id: 42789848
book_url: https://readwise.io/bookreview/42789848
category: articles
date: '2024-07-31 13:27:33'
highlight_id: 752710409
is_favorite: false
layout: highlight
note: ''
source: reader
source_url: https://swizec.com/blog/dry-the-common-source-of-bad-abstractions/
title: DRY – The Common Source of Bad Abstractions
---

That's a common thing that happens with factories. They become so complex you might as well write the underlying code directly.

The team's mistake was that they didn't wait long enough to observe how this code evolves. *At the time* it looked like all navigation buttons need to look the same. But one button was not like the others, it had different semantics.