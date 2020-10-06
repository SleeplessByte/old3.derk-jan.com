---
title: Errors should be your friend
date: '2020-06-11T17:11:00Z'
description: 'About HTTP status codes and actionable errors'
cover: './cover.jpg'
---

Throughout the interwebs you'll find [various][anti-exception-1] [posts][anti-exception-2] [against][anti-exception-3] [exceptions][anti-exception-4], and this is **not** one of them. I'm not here to tell you why you should use `Error` or error codes instead of `Exception` or whichever the equivalents are in your programming language of choice, nor won't discuss wether or not checked exceptions were a good or bad thing. In fact, in _this article_ I will treat the words _Error_ and _Exception_ as if they're synonyms and have nothing to do with actual constructs in the code. When a program can't behave normally, it has encountered an error; the state _and_ flow will be exceptional.

## Common frustration

Most of us have encountered the equivalent of a `NullPointerException`, an exception tightly related to what Tony Hoare calls a ["billion dollar mistake"][tony-hoare]. If you've done something with networking, you might have seen the `SocketException`, or generic `IOException`. Every tried recursion and did it wrongly? `Stack too deep`.

A common point of frustration with all of these errors is that they only tell you **when** the program failed, and **where** it **knew** it failed. It doesn't tell you _why_ it stopped working or what caused it to stop working.


https://twitter.com/sebmck/status/1133221119505227777

https://blog.rust-lang.org/2016/08/10/Shape-of-errors-to-come.html
https://blog.rust-lang.org/images/2016-08-09-Errors/new_errors2.png
- The error is

[anti-exception-1]: http://xahlee.info/comp/why_i_hate_exceptions.html
[anti-exception-2]: https://blog.deprogramandis.co.uk/2012/06/02/exceptions-considered-harmful-or-throw-is-just-goto-in-drag/
[anti-exception-3]: https://www.joelonsoftware.com/2003/10/13/13/
[anti-exception-4]: http://www.lighterra.com/papers/exceptionsharmful/
[tony-hoare]: https://en.wikipedia.org/wiki/Null_pointer#History
