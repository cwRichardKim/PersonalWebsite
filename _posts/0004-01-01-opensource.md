---
preview_title: "Open Source Projects"
link: "http://github.com/cwrichardkim"
link_title: "Github.com"
preview_description: "Since Freshman year of College, I've open sourced a number of iOS projects. 5 of these projects have hit the #1 spot on all of Github's global trending pages. For a while, the popularity of these projects placed me as the #7 trending developer (<a href='http://i.imgur.com/YrkArPl.png'>above even Twitter!</a>)."
button_text: "More Information"

title: Open Source
subtitle: "Becoming a 'trending' developer"
links:
  - Github: "http://github.com/cwrichardkim"
  - Screenshot: "http://i.imgur.com/YrkArPl.png"

layout: post
folder: "opensource"
permalink: /opensource
hidden: false
meta_title: The Story Behind RK Open Source Projects

meta_description: Open Source Tufts Richard Kim cwRichardKim RKSwipeBetweenViewControllers RKNotificationHub RKDropdownAlert RKCardView TinderSimpleSwipeCards
---

# INTRODUCTION - IN HINDSIGHT

---
On August 14th, 2014, NFL's [Brandon King](https://twitter.com/brandonking4787) contacted me [via Twitter](http://i.imgur.com/TDGSEI0.png) about a project he had in mind. He had seen a small [Tinder experiment](http://i.imgur.com/3yk6aiS.gifv) I had built to practice iOS animations and asked if I would be willing to build a more complete version for his upcoming investor pitch. Though I never ended up getting any money\*, I open sourced the code, which became the first of five #1 trending repositories I built over the next few years.

\*(The investor passed, so I decided not to charge and open sourced the code instead).

At some point, every developer struggles with confidence in their skills. Building open sourced projects became the foundation for building confidence in my abilities.  Even today, they account for a significant number of the opportunities that I'm presented. By sophomore year of college, I unexpectedly placed on the top "trending" developer list alongside the [Facebook](https://github.com/facebook), [Slack](https://github.com/slackhq), and [Apache](https://github.com/apache) iOS dev teams.  For a few weeks, I even placed [above Twitter](http://i.imgur.com/YrkArPl.png)!

After the fifth trending repository in a row, I realized that I had stumbled on a method to create successful repositories.  I wrote about that method [in this blog post](https://blog.cwrichardkim.com/how-to-get-hundreds-of-stars-on-your-github-project-345b065e20a2), but the TL;DR is to get on the trending page by focusing on the thing that everyone sees, but not many people like working on: the README.  To this day, I get responses and emails from students to CEOs asking for help on their open source efforts.  It also turns out that the article is the top result for "how to get Github stars" and similar queries.
![google search](/projects/opensource/google_search.png)

Almost by accident, my open sourced code became a pretty big part of my identity as a software developer. As of writing, I have over 8k stars on Github with my most prominent repositories being RKNotificationHub, RKSwipeCards (previously TinderSimpleSwipeCards), RKSwipeBetweenViewControllers, RKDropdownAlert, and RKCardView.

I'm going to briefly discuss each repository and where they came from. Also, a little bit of a self-dig, I'm totally aware that all of my repositories are UI-based Objective-C tools.  So while they might be impressive at face value, really they're just simple solutions to appeal to a mass audience.

## RKSwipeCards (2k stars)

[RKSwipeCards](https://github.com/cwRichardKim/RKSwipeCards) was "TinderSimpleSwipeCards" for about 3 years before Tinder sent me a takedown notice for "misleading customers", which spurred the name change.  At first, this project was simply an experiment I made to mess around with touch gestures.

![RKSwipeCards V1](/projects/opensource/rkswipecards_v1.gif)

I shared this with a few of my friends and with [/r/iOSProgramming](https://www.reddit.com/r/iOSProgramming/) not expecting much to happen, but it got roughly 100 stars in a few days.  After [Brandon King](https://twitter.com/brandonking4787) contacted me and hired me to build a simple Tinder UI clone, I updated how it looked and it took off.

![RKSwipeCards V2](/projects/opensource/rkswipecards_v2.gif)

The core elements stayed the same, but just by updating the UI, I was able to hit 500 stars in a few days.  This taught me the importance of design in the open-source world.

## RKSwipeBetweenViewControllers (1.6k stars)

[RKSwipeBetweenViewControllers](https://github.com/cwRichardKim/RKSwipeBetweenViewControllers) was based on an app for the company I was working on at the time (evoqe).  The idea was simple: have 3 separate pages accessible by swiping or tapping in the navigation bar.  In practice, this ended up being quite difficult and required a lot of weird workarounds.  Here's the first version I released:

![RKSwipeBetweenViewControllers V1](/projects/opensource/rkswipecontroller_v1.gif)

It did decently well with a few hundred stars, but once again I refreshed it and created a cleaner demo interface, which got me to a few thousand stars.  The logic was more or less untouched between the two versions, further nailing in the idea that how pretty the demo gif was really helped spread the project.

![RKSwipeBetweenViewControllers V2](/projects/opensource/rkswipecontroller_v2.gif)

## RKDropdownAlert (1.3k stars)

[RKDropdownAlert](https://github.com/cwRichardKim/RKDropdownAlert) was also based on my work at evoqe.  I was trying to figure out how to show an alert to the user without creating an annoying popup, so I created a dropdown alert similar to the iOS alert banners.  To explain this, I created a little graphic:

![RKDropdownAlert graphic](/projects/opensource/rkdropdownalert_graphic.gif)

This image got a **huge** response on [/r/iOSProgramming](https://www.reddit.com/r/iOSProgramming/) and for a while, it was on the all time top page. I got some really great feedback about the structure of the repository, which inspired me to make some pretty big changes.  A few of my friends also told me they were using this without knowing I had made it!

## RKNotificationHub (2.6k stars)

[RKNotificationHub](https://github.com/cwRichardKim/RKNotificationHub) is probably the one I'm most proud of.  I think this is the one that really allowed me to fine-tune my method and create a really well-explained project.  Once again, this was inspired by the evoqe project I was working on.  We added a notification badge to the menu button to alert the user of new features.  I expanded on the tool, open sourced it, and used all the lessons I learned from releasing previous projects:

![RKNotificationHub graphic](/projects/opensource/rknotificationhub_graphic.gif)

## RKCardView (800 stars)

[RKCardView](https://github.com/cwRichardKim/RKCardView) was pulled out of a hackathon project I made that eventually became [Twindr](http://twindr.me).  I honestly didn't really expect this one to be very widely applicable and basically made it because I thought it looked pretty.

![RKCardView](/projects/opensource/rkcardview.png)

# What's next?
---

After I stopped working on evoqe, I more or less stopped creating open-sourced tools.  At some point I realized that I wasn't really learning a whole lot from it anymore and it only served as padding to my portfolio.  I decided to step away from it and try new technologies, but after finishing [JumboSmash](/jumbosmash), I may try to pull out a few cool things and open source them.

*[cover photo credit](http://imgur.com/ZOUlTTA)*
