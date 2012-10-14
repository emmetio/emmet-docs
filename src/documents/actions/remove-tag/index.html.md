---
layout: page
title: Remove Tag
menuOrder: 8
---
Quickly removes tag, found by “[Match Tag Pair](/actions/match-pair/)” from current caret position, and adjusts indentation.

<div class="movie-def">
&lt;body&gt;
	&lt;div |class="wrapper"&gt;
		&lt;h1&gt;Title&lt;/h1&gt;
		&lt;p&gt;Lorem ipsum dolor sit amet.&lt;/p&gt;
		&lt;p&gt;Officiis animi consequuntur iure.&lt;/p&gt;
		&lt;p&gt;Ea asperiores aperiam non necessitatibus?&lt;/p&gt;
		&lt;p&gt;Expedita iusto cupiditate eum esse.&lt;/p&gt;
	&lt;/div&gt;
&lt;/body&gt;
~~~
tooltip: Place caret somewhere “Match Tag Pair” action can find tag definition
wait: 1000
run: emmet.remove_tag ::: “Remove Tag” (Cmd-K)
</div>
