---
layout: page
title: "Encode/Decode Image to data:URL"
menuOrder: 14
---
HTML and CSS allows you to embed external resources right into base using [data:URL](http://en.wikipedia.org/wiki/Data_URI_scheme) scheme. Usually, image conversion to base64 is done with external on-line services or third-party assets builder. 

But these tools has downsides: you have to spend extra time on on-line tools or loose control on images that should or should not be converted to base64.

With Emmet, you can convert image to data:URL right in your editor, as well as convert it _back to external file_.

<div class="movie-def">
body {
    background: url(demo.png);
}
~~~
tooltip: Move caret inside image path
wait: 1000
moveTo: 1:24
wait: 1000
tooltip: Run “Encode/Decode Image to data:URL” action ::: “Encode/Decode Image to data:URL” (Shift-Cmd-I)
run: emmet.encode_decode_data_url
~~~
mode: text/css
</div>