---
layout: page
title: Gradients
menuOrder: 2
---
Another hard-to-write CSS3 feature is a gradient. You have to repeat long gradient definition multiple times with different vendor prefixes. Also, if you want to cover all gradient-supported browsers, you have to use three different notations: old Webkit, currently supported (`linear-gradient(top, ...)`) and W3C-proposed (`linear-gradient(to bottom, ...)`).

Usually, users prefere to use third-party GUIs to generate gradients definitions, but you can do the very same thing much faster right in your editor.

Emmet has a CSS3 Gradient Generator that can do all the hard work for you:

<textarea class="movie-def">
div {
	|
}
~~~
tooltip: Type normal CSS Gradient definition as <strong>lg(...)</strong> inside CSS rule
type: lg(left, #fc0 30%, red)
wait: 1000
tooltip: Run “Expand Abbreviation” action to transform gradient definition ::: “Expand Abbreviation” (Tab key)
run: emmet.expand_abbreviation
wait: 1000
moveTo: 5:59
run: {command: "emmet.insert_formatted_line_break", times: 2}
wait: 500
type: border-image: 
tooltip: If you write <strong>lg(...)</strong> definition as property value, Emmet will inherit its property name
type: lg(left, #fc0 30%, red)
wait: 500
run: emmet.expand_abbreviation
wait: 1000
moveTo: 11:50
select: 11:53
tooltip: {text: "You can modify generated gradient definition and run “Expand Abbreviation” action again to mirror changes to other gradients with the same CSS property name", wait: 7000}
type: black
wait: 500
run: emmet.expand_abbreviation
~~~
mode: text/css
</textarea>

As you can see from the example above, you can type regular gradient definition as `lg(...)` (or `linear-gradient(...)`) function and expand it as abbreviation. If you write gradient definition as a property value, Emmet will parse it and use its name as a reference for a new CSS properties.

## Fallback value

In preferences, you can enable `css.gradient.fallback` option to produce a fallback `background-color` CSS property whenever a gradient definition for `background-*` CSS property is expanded. This fallback property will contain a first color from gradient definition.

This option is off by default because it produces a `background-color` value that almost certainly need to be manually updated to make sure that content is readable on this background. If you don’t really care about old browsers, you can enable this option.