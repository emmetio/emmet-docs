---
layout: page
title: Update Image Size
menuOrder: 10
---
Many web-developers forget to write _width_ and _height_ attributes  for `<img>` tags which leads to poor UX. This action helps you automate this process: simply place caret inside `<img>` tag and run this action to add/update width and height attributes.

In CSS, place caret inside property value with `url()` function to add/update width and height properties for current rule.

<textarea class="movie-def">
|&lt;img src="demo.jpg" alt="" /&gt;
&lt;style&gt;
.block {
	background: url(demo.jpg);
}
&lt;/style&gt;
~~~
tooltip: Put caret inside &lt;img&gt; tag and run “Update Image Size” to get its size
moveTo: 6
wait: 1000
run: emmet.update_image_size ::: “Update Image Size” (Shift-Cmd-U)
wait: 1000
tooltip: Put caret inside value with image URL to update width and height properties of the rule
moveTo: 3:22
wait: 1000
run: emmet.update_image_size
</textarea>

Note that action also works for absolute URLs: it will start searching for requested file from host file’s folder and then will traverse up the tree.