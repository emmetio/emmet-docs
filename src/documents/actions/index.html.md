---
layout: page
title: Actions
menuOrder: 3
---
Emmet allows you to write large HTML code blocks at speed of light using well-known CSS selectors. But it’s not the only thing that every web-developer need: occasionally you have to _edit_ your HTML and CSS code to fix bugs and add new features.

Emmet offers a very unique tools that can greatly improve your editing experience:

<dl>
<dt>[Expand Abbreviation](./expand-abbreviation/)</dt>
<dd>Yep, this is _the_ action that expand CSS-like abbreviations into HTML code.</dd>

<dt>[Match Tag Pair](./match-pair/)</dt>
<dd>Selects content and/or opening and closing HTML tag name from current caret position, a.k.a “balancing”. Super-awesome implementation that _works even in non-HTML syntaxes_! Implicitly used by many Emmet actions.</dd>

<dt>[Wrap with Abbreviation](./wrap-with-abbreviation/)</dt>
<dd>Same as “Expand Abbreviation” action but intelligently wraps selected content.</dd>

<dt>[Go to Edit Point](./go-to-edit-point/)</dt>
<dd>Quickly traverse between important HTML code points.</dd>

<dt>[Select Item](./select-item/)</dt>
<dd>Quickly select important HTML and CSS code parts.</dd>

<dt>[Toggle Comment](./toggle-comment/)</dt>
<dd>Toggles comment. Unlike basic editor’s implementations, matches HTML tag, CSS property or rule when there’s no selection.</dd>

<dt>[Split/Join Tag](./split-join-tag/)</dt>
<dd>Splits (`<tag />` → `<tag></tag>`) or joins (`<tag></tag>` → `<tag />`) HTML/XML tag under current caret position.</dd>

<dt>[Remove Tag](./remove-tag/)</dt>
<dd>Gracefully removes HTML/XML tag under current caret position.</dd>

<dt>[Merge Lines](./merge-lines/)</dt>
<dd>Merges selected lines into single one. With no selection, automatically matches nearest HTML tag.</dd>

<dt>[Update Image Size](./update-image-size/)</dt>
<dd>Updates matched HTML tag or CSS rule with image size, located under caret.</dd>

<dt>[Evaluate Math Expression](./evaluate-math/)</dt>
<dd>Evaluates simple math expression</dd>

<dt>[Increment/Decrement Number](./inc-dec-number/)</dt>
<dd>Increments or decrements number under current caret position with given step.</dd>

<dt>[Reflect CSS Value](./reflect-css-value/)</dt>
<dd>Automatically copies CSS value under current caret position to all vendor-prefixed variants.</dd>

</dl>