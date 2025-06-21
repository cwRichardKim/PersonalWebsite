---
author: Steve Kinney
book_id: 47387510
book_url: https://readwise.io/bookreview/47387510
category: books
date: '2025-01-02 23:15:46'
highlight_id: 833330683
is_favorite: false
layout: highlight
note: ''
source: manual
source_url: null
title: Javascript Performance
---

Render pipeline: Javascript -> Style -> Layout -> Paint -> Composite

Javascript can cause the entire render pipeline to trigger continuously. the trick is knowing what kind of changes trigger what steps in the render pipeline and trying to trigger as few as possible.

Paint is the most expensive operation, layout is the second most expensive