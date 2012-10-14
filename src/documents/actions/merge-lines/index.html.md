---
layout: page
title: Merge Lines
menuOrder: 9
---
Many editors has similar action: it merges selected lines into a single one. But when there’s no selection, Emmet will match context HTML tag.

<div class="movie-def">
&lt;p&gt;
	Lorem ipsum dolor sit amet.
	|Officiis animi consequuntur iure.
	Ea asperiores aperiam non necessitatibus?
	Expedita iusto cupiditate eum esse
&lt;/p&gt;
~~~
run: emmet.merge_lines ::: “Merge Lines” (Shift-Cmd-M)
</div>
