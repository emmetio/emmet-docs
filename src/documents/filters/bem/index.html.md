---
layout: page
title: Yandex BEM/OOCSS
menuOrder: 1
---

If you’re writing your HTML and CSS code in [OOCSS](http://coding.smashingmagazine.com/2011/12/12/an-introduction-to-object-oriented-css-oocss/)-style, [Yandex’s BEM](http://coding.smashingmagazine.com/2012/04/16/a-new-front-end-methodology-bem/) style specifically, you will like this filter. It provides some aliases and automatic insertions of common block and element names in classes.

In short, BEM introduces three concept types for CSS classes: Block, Element and Modifier. _Block_ is a some sort of a namespace for a semantic sections of HTML page, for example, `search-form`. _Element_ is a part of section, for example, `serch-form__query-string`. _Modifiers_ define variations of block and elements: `search-form_wide` or `search-form_narrow`. Elements in class names are separated with `__` (double underscore) and modifiers are separated with `_` (single underscore).

While BEM/OOCSS is a great way to maintain and re-use CSS, it may be very tedious to write these class names in plain HTML, even with help of Emmet abbreviations. You have to write the same block or element name in every element of abbreviation:

	form.search-form.search-form_wide>input.search-form__query-string+input:s.search-form__btn.search-form__btn_large
	
The `bem` filter allows you to make abbreviation a bit sorter:

	form.search-form._wide>input.-query-string+input:s.-btn_large|bem
	
## How it works

BEM filter introduces a few class name prefixes for concept types: `__` or `-` as _element prefix_ and `_` as _modifier prefix_. Whenever you begin class name with one of these prefixes, filter will resolve the rest parts for you:

* if you start class name element prefix, filter will resolve _block name_ from _parent_ node;
* if you start class name with modifier prefix, filter will resolve _block name_ and/or _element name_ from _current or parent_ nodes;
* if you use both element and modifier prefixes, filter will resolve _block name_ from parent node and output both “unmodified” and “modified” classes on element;
* if you use _multiple_ element prefixes, filter with resolve block name from _nth_ parent node.

Here are a few examples:

<table>
<tr>
<th>Abbreviation</th>
<th>Output</th>
</tr>
<tr>
<td>`.b_m`</td>
<td>
<pre><code>&lt;div class="b b_m">&lt;/div></code></pre>
</td>
</tr>

<tr>
<td>`.b_m1._m2`</td>
<td>
<pre><code>&lt;div class="b b\_m1 b\_m2">&lt;/div></code></pre>
</td>
</tr>

<tr>
<td>`.b>._m`</td>
<td>
<pre><code>&lt;div class="b">
	&lt;div class="b b\_m">&lt;/div>
&lt;/div></code></pre>
</td>
</tr>

<tr>
<td>`.b1>.b2_m1>.-e1+.--e2_m2`</td>
<td>
<pre><code>&lt;div class="b1"&gt;
	&lt;div class="b2 b2_m1"&gt;
		&lt;div class="b2\__e1"&gt;&lt;/div&gt;
		&lt;div class="b1\__e2 b1\__e2\_m2"&gt;&lt;/div&gt;
	&lt;/div&gt;
&lt;/div&gt;</code></pre>
</td>
</tr>

</table>

Remember that you can always make `bem` filter a default one for HTML syntax.