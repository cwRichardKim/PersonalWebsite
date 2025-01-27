---
author: Kent Beck from the archives
book_id: 43730777
book_url: https://readwise.io/bookreview/43730777
category: articles
date: '2024-09-02 16:07:11'
highlight_id: 766657760
is_favorite: false
layout: highlight
note: ''
source: reader
source_url: mailto:reader-forwarded-email/617aba4a144aa560799568e7cb517212
title: Ad Hoc Infrastructure
---

The myth is “build the infrastructure and then build the apps on top of it”.

[![](https://substackcdn.com/image/fetch/w_1140,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3e001263-fb0d-4ead-825b-71b6ac488078_570x182.png)](https://substack.com/redirect/21efed52-f7a4-4d24-8eb0-8985effb023b?j=eyJ1IjoiMWVjN2xuIn0.dNOnkHOwbYJJJclFPLVF22RagPVp9-eChW9Z9viBtXg)

This trick never works (for some value of “never”). Building the infrastructure is a never-ending project. When is it good enough for apps? Tomorrow. Always tomorrow. What should go into the infrastructure? More. Always more.

Infrastructure is supposed to be built more carefully than apps. Apps gain value from exploration & thus emphasize latency of experiments. Infrastructure gains value from scale. Mistakes or inefficiencies scale too. However, infrastructure is not built with perfect knowledge. Infrastructure needs to grow & adapt.

“When?” should, then, be answered with “some sooner, some later”.