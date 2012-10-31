---
layout: page
title: Select Item
menuOrder: 5
---
Action is similar to [“Go to Edit Point”](/actions/go-to-edit-point/), but selects important code parts.

In HTML, these are tag name, full attribute and attribute value. For class attribute it also selects distinct classes.

<textarea class="movie-def">
|&lt;section&gt;
	&lt;p&gt;&lt;/p&gt;
	&lt;div class="main footer"&gt;&lt;/div&gt;

    &lt;script&gt;var str = '<div class="main footer"></div>';&lt;/script&gt;
&lt;/section&gt;
~~~
run: {command: 'emmet.select_next_item', times: 7} ::: “Select Next Item” (Shift-Cmd-.)
wait: 1000
run: {command: 'emmet.select_previous_item', times: 6} ::: “Select Previous Item” (Shift-Cmd-,)
wait: 1000
moveTo: 4:12
wait: 1000
tooltip: “Select Item” action may also work in non-HTML syntaxes
wait: 500
run: {command: 'emmet.select_next_item', times: 5}
</textarea>

In CSS, it matches selector, full property and property value. For complex values and functions like `1px solid red` or `url(image.jpg)` also selects part of it.

<textarea class="movie-def">
|body {
	border: 1px solid black;
	background: url(image.jpg) #ccc no-repeat;
}
~~~
run: {command: 'emmet.select_next_item', times: 12} ::: “Select Next Item” (Shift-Cmd-.)
wait: 1000
run: {command: 'emmet.select_previous_item', times: 11} ::: “Select Previous Item” (Shift-Cmd-,)
~~~
mode: text/css
</textarea>