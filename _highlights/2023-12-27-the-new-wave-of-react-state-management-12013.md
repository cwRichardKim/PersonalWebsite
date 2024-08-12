---
author: frontendmastery.com
book_id: 35864852
book_url: https://readwise.io/bookreview/35864852
category: articles
date: '2023-12-27 03:07:03'
highlight_id: 648387064
is_favorite: false
layout: highlight
note: ''
source: reader
source_url: https://frontendmastery.com/posts/the-new-wave-of-react-state-management#the-rise-of-purpose-built-libraries-to-solve-the-remote-state-management-problem
title: The New Wave of React State Management
---

For remote server cache state there are common problems like request de-duplication, retries, polling, handling mutations and the list goes on.

As applications grow Redux tends to want to suck up all the state regardless of it’s type, as it promotes a single store.

This commonly lead to storing all the things in a big monolithic store. Which often times exacerbated the second problem of optimizing run-time performance.

Because Redux handles the global shared state generically, a lot of these sub problems needed to be repeatedly solved (or often times just left un-attended).

This lead to big monolithic stores holding everything between UI and remote entity state being managed in a single place.

This of course becomes very difficult to manage as things grow. Especially on teams where frontend developers need to ship fast. Where working on decoupled independent complex components becomes necessary.