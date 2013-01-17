---
layout: page
title: Increment/Decrement Number
menuOrder: 12
---
This action, as name says, increments or decrements number under caret with different steps: 0.1, 1 or 10.
<textarea class="movie-def">
body {
	padding: 1|0px;
	line-height: 1.7;
	width: 100%;
}
@@@
run: {command: 'emmet.increment_number_by_1', times: 6} ::: “Increment by 1” (Ctrl-↑)<br />“Decrement by 1” (Ctrl-↓)
wait: 1000
moveTo: 2:20
wait: 1000
run: {command: 'emmet.increment_number_by_01', times: 6} ::: “Increment by 0.1” (Alt-↑)<br />“Decrement by 0.1” (Alt-↓)
wait: 1000
moveTo: 3:12
run: {command: 'emmet.increment_number_by_10', times: 6} ::: “Increment by 10” (Ctrl-Alt-↑)<br />“Decrement by 10” (Ctrl-Alt-↓)
@@@
mode: text/css
</textarea>