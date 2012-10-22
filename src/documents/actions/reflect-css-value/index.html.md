---
layout: page
title: Reflect CSS Value
menuOrder: 13
---
A very useful action for CSS developers: it takes value of CSS property under caret and copies it into vendor-prefixed variations with additional transformations, if required.
<textarea class="movie-def">
div {
	padding: 10px;
	
	-webkit-transform: rotate(|45deg);
	-moz-transform: rotate(45deg);
	-ms-transform: rotate(45deg);
	-o-transform: rotate(45deg);
	transform: rotate(45deg);

	opacity: 0.6;
	filter: alpha(opacity=60);
}
~~~
tooltip: Modify value of CSS property
wait: 500
run: {command: 'delCharRight', times: 2}
wait: 500
type: 50
wait: 1000
tooltip: {text: 'Run “Reflect CSS Value” action to copy current value to all its vendor-prefixed variants', wait: 6000}
run: emmet.reflect_css_value ::: “Reflect CSS Value” (Cmd-B)
wait: 1000
moveTo: 9:16
wait: 1000
run: delCharLeft
type: 7
wait: 500
tooltip: {text: 'Note that action knows some browser-specific differences', pos: '10:26'}
wait: 500
run: emmet.reflect_css_value
~~~
mode: text/css
</textarea>