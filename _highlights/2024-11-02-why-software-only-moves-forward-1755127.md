---
author: Swizec Teller
book_id: 45507144
book_url: https://readwise.io/bookreview/45507144
category: articles
date: '2024-11-02 17:08:06'
highlight_id: 806751076
is_favorite: false
layout: highlight
note: ''
source: reader
source_url: mailto:reader-forwarded-email/0442406148f536345c15cc425971fb00
title: Why Software Only Moves Forward
---

Can parts of the system (app, database, ...) change independently?

If the answers is yes, your system is distributed. You can independently deploy, update, start, stop, and otherwise manage parts of your system (app and database). Even if both run on the same machine and you almost always update them together.

This brings lots of benefits.

For example: You can update your application code without always upgrading to the latest version of your database service. Or you can reboot your application without losing database functionality that the finance team relies on. And in some cases you can even rollback your code without rolling back the database.