---
layout: page
title: Expand Abbreviation
menuOrder: 1
---
Expands [CSS-like abbreviations](/abbreviations/) into HTML/XML/CSS code, depending on current document’s syntax. Also performs other context actions, for example, transforms [CSS Gradient](/css-abbreviations/gradients/).

<textarea class="movie-def">
&lt;html&gt;
&lt;head&gt;
	&lt;title&gt;Demo&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
	|
&lt;/body&gt;
&lt;/html&gt;
~~~
tooltip: Type a CSS-like abbreviation
type: #page>(#header>ul#nav>li*4>a)+(#content>h1{Hello world}+p)+#footer
wait: 1000
tooltip: Run “Expand Abbreviation” action ::: “Expand Abbreviation” (Tab key)
run: emmet.expand_abbreviation
</textarea>

Generated output contains a number of _tabstops_ and if your editor supports them (Eclipse, Sublime Text 2, Espresso etc) you can quickly traverse between them with Tab key.

In some editors (Eclipse, Sublime Text 2, CodeMirror) “Expand Abbreviation” can be invoked with Tab key.