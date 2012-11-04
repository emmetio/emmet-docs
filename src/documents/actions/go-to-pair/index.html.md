---
layout: page
title: Go to Matching Pair
menuOrder: 2.5
---
In HTML, allows you to quickly traverse between opening and closing tag:

<textarea class="movie-def">
&lt;div id="page"&gt;
	&lt;section class="content"&gt;
		&lt;h1&gt;Document example&lt;/h1&gt;
		&lt;p&gt;Lorem ipsum dolor sit amet.&lt;/p&gt;
	&lt;/section&gt;
&lt;/|div&gt;
~~~
tooltip: {text: 'Place caret inside either opening or closing tag and run “Go to Matching Pair” action to go to the opposite tag pair', wait: 7000}
wait: 1000
run: {command: 'emmet.matching_pair', times: 5} ::: “Go to Matching Pair” (Cmd-T)
</textarea>

----------------

“Go to Matching Pair” action uses “[HTML Matcher](/actions/match-pair/)” internally so it may work in non-HTML syntaxes too.
