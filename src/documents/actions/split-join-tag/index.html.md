---
layout: page
title: Split/Join Tag
menuOrder: 7
---
This action splits and joins tag definition, e.g. converts from `<tag/>` to `<tag></tag>` and vice versa. Very useful for XML/XSL developers.
<textarea class="movie-def">
&lt;example&gt;
	|Lorem ipsum dolor sit amet
&lt;/example&gt;
~~~
run: emmet.split_join_tag ::: “Split/Join Tag” (Cmd-J)
wait: 1000
moveTo: 6
wait: 1000
run: emmet.split_join_tag
</textarea>

----------------

“Split/Join Tag” action uses “[HTML Matcher](/actions/match-pair/)” internally so it may work in non-HTML syntaxes too.
