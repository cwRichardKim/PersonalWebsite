---
author: overreacted.io
book_id: 35517755
book_url: https://readwise.io/bookreview/35517755
category: articles
date: '2023-12-17 16:53:24'
highlight_id: 643296582
is_favorite: false
layout: highlight
note: Quite cool I didn’t realize you could do this. type is basically the code and
  props the data
source: reader
source_url: https://react.statuscode.com/link/148973/6ab201b79d
title: A Chain Reaction
---

You can verify that feeding my original piece of JSX to `translateForBrowser` will produce the “browser JSX” that only refers to concepts like `p` and `i`.

const originalJSX =[Greeting person={alice}/] ;
console.log(originalJSX.type); // Greeting
console.log(originalJSX.props); // { firstName: 'Alice', birthYear: 1970 }

const browserJSX = translateForBrowser(originalJSX);
console.log(browserJSX.type); // 'p'
console.log(browserJSX.props); // { className: 'text-2xl font-sans text-purple-400 dark:text-purple-500', children: ['Hello', { type: 'i', props: { children: 'Alice' }, '!'] }*