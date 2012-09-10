---
layout: page
title: Abbreviations
menuOrder: 1
---
Abbreviations are the heart of the Emmet toolkit: these special expressions are parsed in runtime and transformed into structured code block, HTML for example. The abbreviation’s syntax looks like CSS selectors with a few extensions specific to code generation. So every web-developer already knows how to use it. 

Here’s an example: this abbreviation

	#page>div.logo+ul#navigation>li*5>a{Item $}
	
...can be transformed into

	<div id="page">
		<div class="logo"></div>
		<ul id="navigation">
			<li><a href="">Item 1</a></li>
			<li><a href="">Item 2</a></li>
			<li><a href="">Item 3</a></li>
			<li><a href="">Item 4</a></li>
			<li><a href="">Item 5</a></li>
		</ul>
	</div>
	
...with	just a single key stroke. In many editors (such as Eclipse, Sublime Text 2, Espresso etc.) plugins will also generate proper _tabstop marks_ so you can quickly traverse between important places of generated code with the Tab key.

Abbreviations are optimised for, but not limited to, HTML and XML generation, and make writing tedious markup code a breeze. You can start learning [syntax](/abbreviations/syntax/) to unleash the full power of Emmet abbreviations.