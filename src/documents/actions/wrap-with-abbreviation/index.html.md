---
layout: page
title: Wrap with Abbreviation
menuOrder: 3
---
A very powerful tool of the Emmet toolkit. It takes an [abbreviation](/abbreviations/), expands it and places currently selected content in the last element of generated snippet. If there’s no selection, action will silently call [“Match Tag Pair”](/actions/match-pair/) to wrap context element.

<textarea class="movie-def">
&lt;div id="page"&gt;
	&lt;p|&gt;Hello world&lt;/p&gt;
&lt;/div&gt;
~~~
tooltip: Place caret inside tag (or tag content) you want to wrap and run “Wrap with Abbreviation” action
prompt: {text: '.wrapper>h1{Title}+.content', title: 'Enter abbreviation'}  ::: “Wrap with Abbreviation” (Shift-Cmd-A)
run: {command: function(editor){CodeMirror.commands.wrapWithAbbreviation(editor, 'div.wrapper>h1{Title}+.content');}}
</textarea>

## Wrapping individual lines

Very commonly, web-developers will need to wrap text in HTML tags. For example, you may receive a text document from your client and need to wrap each paragraph with `<p>` tag or list of menu items with `<ul>/<li>` structure.

From [syntax](/abbreviations/syntax/) you’ve learned that you can repeat element with multiplication operator, like this: `ul>li*5`. You can use the very same operator to _mark repeating element_, e.g. tell Emmet that marked element should be repeated by the number of wrapped lines.

<textarea class="movie-def">
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
run: {command: function(editor){CodeMirror.commands.wrapWithAbbreviation(editor, 'nav>ul.nav>li.nav-item$\*>a');}}
</textarea>

Note you don’t need to add multiplier number for wrapping lines (e.g. `li*5`), you have to use `*` operator _without_ number, like this: `li*`.

## Removing list markers

Whenever you copy text from, let’s say, Microsoft Word, you’ll have list blocks like this:

	* Unordered item 1
	* Unordered item 2
	* Unordered item 3
	
	1. Ordered item 1
	2. Ordered item 2
	3. Ordered item 3
	
If you try to wrap these lists with `ul>li*` abbreviation, you will get something like this:

	<ul>
		<li>* Unordered item 1</li>
		<li>* Unordered item 2</li>
		<li>* Unordered item 3</li>
	</ul>
	
This is not very convenient because you have to manually remove list markers.

You can let Emmet do this for you: simply add “trim“ (`|t`, pipe-t) filter to abbreviation to automatically remove list markers from wrapped content:

<textarea class="movie-def">
&lt;div id="page"&gt;
	|
	1. About
	2. News
	3. Products
	4. Contacts
	
	Lorem ipsum dolor sit amet.
&lt;/div&gt;
~~~
tooltip: Select lines you want to wrap.
moveTo: 2:4
select: 5:15
wait: 1000
tooltip: Call “Wrap with Abbreviation” action and enter abbreviation with  <em>|t</em> filter at the end
prompt: {text: 'ul.nav>li.nav-item$\*>a|t', title: 'Enter abbreviation'}  ::: “Wrap with Abbreviation” (Shift-Cmd-A)
run: {command: function(editor){CodeMirror.commands.wrapWithAbbreviation(editor, 'ul.nav>li.nav-item$\*>a|t');}}
</textarea>

[Read more about filters](/filters/)

## Controlling output position

By default, when you wrap something, Emmet puts original content inside the latest element. You can control the output position with `$#` placeholder. Note that `$#` is not part of the abbreviation syntax, so you have to put it inside the attribute value or [text node](/abbreviations/syntax/), like this: `ul>li[title=$#]*>{$#}+img[alt=$#]`.

<textarea class="movie-def">
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
run: {command: function(editor){CodeMirror.commands.wrapWithAbbreviation(editor, 'ul>li[title=$#]\*>{$#}+img[alt=$#]');}}
</textarea>