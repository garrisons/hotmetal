

- [HoTMtaL](#hotmtal)
	- [Motivation](#motivation)
	- [The Problem](#the-problem)
	- [The Solution](#the-solution)
	- [Why not Just Use TeX?](#why-not-just-use-tex)
	- [API](#api)

> **Table of Contents**  *generated with [DocToc](http://doctoc.herokuapp.com/)*


# HoTMtaL

![](https://github.com/loveencounterflow/hotmetal/raw/master/art/Linotype_matrices.png)

## Motivation

HoTMtaL has been developed to simplify the finding of good line breaks in HTML sources; this is a core
ingredient for the [MingKwai Typesetter](https://github.com/loveencounterflow/mingkwai-app).

## The Problem

The [MingKwai Typesetter](https://github.com/loveencounterflow/mingkwai-app) is an application to typeset
print pages from MarkDown sources that are converted to HTML5 / CSS3, and then rendered by the browser
component of an [nwjs (formerly node-webkit)](http://nwjs.io/) app.

While the choice of HTML5, CSS3 and a web browser to typeset text is a natural one given that it is the one
globally most widespread text rendering technology, has been under very intense and competitive development
for a quarter of a century now, and has in the process become both highly optimized and internationalized
for a wide range of languages and scripts.

However, producing print masters from a rendering in the browser window has never been very much in the
focus of vendors, and, hence, many of the techniques developed by printers have received a rather negligent
treatment, one example being fine control over how lines are broken into paragraphs, and the typesetting of
columns.

Fortunately, there is a wonderful and versatile programming language—JavaScript—that is closely wedded to
the Document Object Model (DOM) that can be used to fill out any gaps of HTML and CSS.

The particular problem that HoTMtaL is intended to solve can be stated as follows: Given the source of an
HTML paragraph, some collection of CSS style rules and an HTML layout which contains a block element
intended to receive lines of type, how can we make it so that

❶ we can tell whether a given portion of the paragraph fits into the receiving container without
	occupying more than a single line and without containing less material than would be possible, given
	the length of a line?

❷ we can control where line breaks occur to optimize the appearance of a paragraph (as has been pioneered
	by Donal Knuth's TeX typesetting system)?

❸ we can later distribute lines so that common taks in book layout—such as the production of balanced
	columns, possibly with intervening illustrations—become feasible?



## The Solution

The answer to problem ❶ can only be: we must actually typeset a line under 'realistic' conditions, that is,
we must actually put the pertinent HTML tags onto an actual web page and then test whether the line is too
short, just right, or too long. For any attempt to do it 'the TeX way'—i.e. by considering font
metrics instead of actual fonts—is bound to ultimately reconstruct more or less the entire browser rendering
engine in JavaScript, which is certainly too hard to be solved in a satisfactory manner.

The (partial) answer to problem ❷ is that we must find all those positions in a given HTML source text where
line breaks are permitted, given the combination of script and language at a given point. This seemingly
simple task is surprisingly difficult when we consider just a few points:

* In an English text, we require that properly formatted texts use hyphens at the end of lines where
	otherwise a long word would cause an overly short line; those hyphens must only occur where permitted
	by intricate rules (which may not entirely lent themselves to a formalization and may require lists
	of difficult cases and exceptions as dictated by common usage);

* In more traditionally typeset Chinese texts, all the characters, including punctuation, are expected to
	take up the exact same space, so that the result displays a rigid grid. Line breaks may occur at any
	point between any two characters; it may even be permitted to have a trailing period as the first
	(and, at the end of a paragraph, only) character on a line (in more modern Chinese texts, the tendency
	seems to be to abandon the strict grid in favor of variable spacing between characters and give less
	room to punctuation).

* Other languages may use other devices such as elongated characters or, (as in Thai) inner-word breaks
	without hyphens that may, however, only occur at syllable boundaries.

Fortunately, there has been done quite some work in the field of language processing. First, there is the
[Unicode Line Break Algorithm (UAX #14)](http://www.unicode.org/reports/tr14) which has been implemented in
[JavaScript as a NodeJS module called `linebreak`](https://github.com/devongovett/linebreak) and may be
installed as easy as `npm install linebreak`.

Second, there is [a hyphenation module, `hypher`](https://github.com/bramstein/Hypher), with [quite a few
language-specific hyphenation patterns](https://www.npmjs.com/search?q=hyphenation) available.

The combination of `hypher` and `linebreak` allows us to find all positions where e.g. an English text
may be broken. For example, the nonsense text:

```
'Paragraph internationalization assignment (certainly) relativity.'
```

will be partioned as

```
[ 'Para­', 'graph ', 'in­', 'ter­', 'na­', 'tion­', 'al­', 'iza­', 'tion ', 'as­', 'sign­', 'ment ', '(cer­', 'tainly) ', 'rel­', 'a­', 'tiv­', 'ity.', ]
```

[TeX (Knuth & Plass) line breaking algorithm](https://github.com/bramstein/typeset)

<!-- The approach taken  -->

## Why not Just Use TeX?

## API

```coffee
H = require 'hotmetal'
html = """<img src='x.jpg'>lo <div id='mydiv'><em><i>arcade &amp; &#x4e00; illustration
<b>bromance</b> cyberspace <span class='foo'></span> necessarily</i></em> completely.</div>"""
H.parse html, ( error, hotml ) =>
  throw error if error?
  for start in [ 0, 3, 10, ]
    for delta in [ 0 .. 5 ]
      stop = start + delta
      # urge start, stop, H.rpr      H.slice hotml, start, stop
      info start, stop, H.as_html  H.slice hotml, start, stop
  urge JSON.stringify hotml
  help H.rpr     hotml
  info H.as_html hotml
```