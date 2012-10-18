---
layout: default
title: Emmet Documentation
---
# Welcome to Emmet Documentation and Tutorials web-site #

Emmet is a web-developer’s toolkit that can greatly improve your HTML & CSS workflow:

<div class="movie-def">
&lt;!doctype html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;title&gt;Demo&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    |
&lt;/body&gt;
&lt;/html&gt;
~~~
type: ul#nav>li.item$*4>a{Item $}
wait: 1000
tooltip: Run “Expand Abbreviation” action to expand entered abbreviation ::: “Expand Abbreviation” (Tab key)
wait: 600
run: emmet.expand_abbreviation
wait: 1000
tooltip: Traverse between important code points with “Next/Previous Edit Point” ::: “Next Edit Point” (Ctrl-Alt-→) <br> “Previous Edit Point” (Ctrl-Alt-←)
wait: 1000
run: {command: 'emmet.next_edit_point', times: 7}
wait: 1000
tooltip: Select tags with “Match Tag Pair” action ::: “Match Pair” (Cmd-D)
run: {command: 'emmet.match_pair_outward', times: 3}
wait: 1000
moveTo: 102
tooltip: Select important parts with “Select Next/Previous Item” action ::: “Select Next Item” (Cmd-.) <br> “Select Previous Item” (Cmd-,)
run: {command: 'emmet.select_next_item', times: 7, beforeDelay: 300}
wait: 2000
moveTo: 95
wait: 1000
tooltip: Quickly comment full tag with “Toggle Comment” action ::: “Toggle Comment” (Cmd-/)
run: {command: 'emmet.toggle_comment', times: 2, beforeDelay: 1000}
</div>

Basically, most text editors out there allow you to store and re-use commonly used code chunks, called _“snippets”_. While snippets are good way to boost your productivity, all implementations have common pitfalls: you have to define snippet first and you can’t extend them in runtime.

Emmet takes snippets idea to the whole new level: you can type _CSS-like_ expressions that can be dynamically parsed and produce output depending on what you type in abbreviation. Emmet is developed and optimised for web-developers whose workflow depends on HTML/XML and CSS, but can be used with programming languages too. 

Start learning Emmet with the [abbreviation syntax](/abbreviations/) and available [actions](/actions/).