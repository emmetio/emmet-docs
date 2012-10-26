---
layout: page
title: Go to Edit Point
menuOrder: 4
---
This actions works for HTML code blocks and allows you to quickly traverse between important code points:

* between tags
* empty attributes
* newlines with indentation

<textarea class="movie-def">
|&lt;ul&gt;
	&lt;li&gt;&lt;a href=""&gt;&lt;/a&gt;&lt;/li&gt;
	&lt;li&gt;&lt;a href=""&gt;&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;
&lt;div&gt;
	|
&lt;/div&gt;

&lt;script&gt;
	var str = '&lt;ul&gt;&lt;li&gt;&lt;a&gt;&lt;/a&gt;&lt;/li&gt;&lt;/ul&gt;';
&lt;/script&gt;
~~~
run: {command: 'emmet.next_edit_point', times: 9} ::: “Next Edit Point” (Ctrl-Alt-→)
wait: 1000
run: {command: 'emmet.prev_edit_point', times: 9} ::: “Previous Edit Point” (Ctrl-Alt-←)
wait: 1000
moveTo: 9:4
wait: 500
tooltip: You can use “Go to Edit Point” action in non-HTML documents too
run: {command: 'emmet.next_edit_point', times: 4}
</textarea>
