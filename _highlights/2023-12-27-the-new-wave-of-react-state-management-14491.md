---
author: frontendmastery.com
book_id: 35864852
book_url: https://readwise.io/bookreview/35864852
category: articles
date: '2023-12-27 03:15:23'
highlight_id: 648388741
is_favorite: false
layout: highlight
note: On context API which is great for small applications. I should make sure we
  understand the implications of using this across checkout
source: reader
source_url: https://frontendmastery.com/posts/the-new-wave-of-react-state-management#the-rise-of-purpose-built-libraries-to-solve-the-remote-state-management-problem
title: The New Wave of React State Management
---

as things grow, this lead to two problems:

1.  **Re-inventing Redux.** And often times falling into the many problems we defined before. And either not solving them, or solving them poorly compared to a library dedicated to solving those specific edge cases. Leading many feeling the need to the promote the idea that [React context has nothing to do with state management](https://blog.isquaredsoftware.com/2021/01/context-redux-differences/).
    
2.  **Optimizing runtime performance.** The other core problem is optimizing re-renders. Which can be difficult to get right as things scale when using native context.