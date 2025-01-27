---
author: 'Kent Beck from Software Design: Tidy First?'
book_id: 39044025
book_url: https://readwise.io/bookreview/39044025
category: articles
date: '2024-03-26 13:16:24'
highlight_id: 698240411
is_favorite: false
layout: highlight
note: ''
source: reader
source_url: mailto:reader-forwarded-email/a317f9895802434b8048c2fbd574bc56
title: 'Surprise Factory--Coupling: Why Software Costs So Damn Much'
---

**Constantine’s Equivalence: A Measure of Cost**

Larry Constantine’s insight into the nature of software costs starts by noting that most of the cost of software is in the cost of change:

      cost(software) ~= cost(change)

All the little changes don’t add up to much, it is the jackpot changes that drive up the cost of software:

      cost(software) ~= cost(change) ~= cost(big changes)

Those big jackpot changes, in turn, are a result of coupling:

    cost(software) ~= cost(change) ~= cost(big changes) ~= cost(coupling)

While managing the cost of software may feel overwhelming, it reduces to managing coupling:

      cost(software) ~= cost(coupling) ... removing coupling doesn’t come for free. Structure changes can remove coupling, but they require investment. The equation you’re juggling is:

      cost(software) ~= cost(coupling) + cost(decoupling)