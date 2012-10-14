---
layout: page
title: Wrap with Abbreviation
menuOrder: 3
---
A very powerful tool of Emmet toolkit. It takes [abbreviation](/abbreviations/), expands it and places currently selected content in the last element of generated snippet. If there’s no selection, action will silently call [“Match Tag Pair”](/actions/match-pair/) to wrap context element.

<div class="movie-def">
&lt;div id="page"&gt;
	&lt;p|&gt;Hello world&lt;/p&gt;
&lt;/div&gt;
~~~
tooltip: Place caret inside tag (or tag content) you want to wrap and run “Wrap with Abbreviation” action
prompt: {text: '.wrapper>h1{Title}+.content', title: 'Enter abbreviation'}  ::: “Wrap with Abbreviation” (Shift-Cmd-A)
run: {command: function(editor){CodeMirror._wrapWithAbbreviation(editor, '.wrapper>h1{Title}+.content');}}
</div>

## Wrapping individual lines

A very common use case of web-developer is wrapping text in HTML tags. You example, you may receive a text document from your client and need to wrap each paragraph with `<p>` tag or list of menu items with `<ul>/<li>` structure.

From [syntax](/abbreviations/syntax/) you’ve learned that you can repeat element with multiplication operator, like this: `ul>li*5`. You can use the very same operator to _mark repeating element_, e.g. tell Emmet that marked element should be repeated by the number of wrapped lines.

<div class="movie-def">
&lt;div id="page"&gt;
	|
	About
	News
	Products
	Contacts
	
	Lorem ipsum dolor sit amet.
&lt;/div&gt;
~~~
tooltip: Select lines you want to wrap.
moveTo: 2:4
select: 5:13
wait: 1000
tooltip: Call “Wrap with Abbreviation” action and enter abbreviation with repeated element marked with <em>\*</em>
prompt: {text: 'nav>ul.nav>li.nav-item$\*>a', title: 'Enter abbreviation'}  ::: “Wrap with Abbreviation” (Shift-Cmd-A)
run: {command: function(editor){CodeMirror._wrapWithAbbreviation(editor, 'nav>ul.nav>li.nav-item$\*>a');}}
</div>

Note you don’t need to add multiplier number when you’re wrapping lines (e.g. `li*5`), you have to use `*` operator _without_ number, like this: `li*`.

## Controlling output position

By default, when you wrap something, Emmet puts original content inside latest element. You can control output position with `$#` placeholder. Note that `$#` is not part of abbreviation syntax so you have to put it inside attribute value or [text node](/abbreviations/syntax/), like this: `ul>li[title=$#]*>{$#}+img[alt=$#]`.

<div class="movie-def">
&lt;div id="page"&gt;
	|
	About
	News
	Products
	Contacts
	
	Lorem ipsum dolor sit amet.
&lt;/div&gt;
~~~
tooltip: Select lines you want to wrap.
moveTo: 2:4
select: 5:13
wait: 1000
tooltip: Call “Wrap with Abbreviation” action and enter abbreviation with repeated element marked with <em>\*</em> and <em>$#</em> placeholder
prompt: {text: 'ul>li[title=$#]\*>{$#}+img[alt=$#]', title: 'Enter abbreviation'}  ::: “Wrap with Abbreviation” (Shift-Cmd-A)
run: {command: function(editor){CodeMirror._wrapWithAbbreviation(editor, 'ul>li[title=$#]\*>{$#}+img[alt=$#]');}}
</div>