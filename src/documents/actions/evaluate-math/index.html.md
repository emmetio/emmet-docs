---
layout: page
title: Evaluate Math Expression
menuOrder: 11
---
Evaluates simple math expression like `2*4` or `10/2` and outputs its result. You can use `\` operator which is equivalent to `round(a/b)`. 

Very useful in CSS where numeric values should be modified frequently.

<textarea class="movie-def">
|
~~~
tooltip: Enter simple math expression and run “Evaluate Math Expression” action
type: 2\*6
wait: 1000
run: emmet.evaluate_math_expression ::: “Evaluate Math Expression” (Shift-Cmd-Y)
wait: 1000
type: {text: ' 10\\\\3'}
wait: 1000
run: emmet.evaluate_math_expression
wait: 1000
type: {text: ' 20\*4+10'}
wait: 1000
run: emmet.evaluate_math_expression
</textarea>