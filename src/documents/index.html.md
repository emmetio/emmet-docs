---
layout: default
title: Emmet Documentation
---
# Emmet — the essential toolkit for web-developers #

Emmet (previously known as _Zen Coding_) is a web-developer’s toolkit that can greatly improve your HTML & CSS workflow:

<textarea class="movie-def">
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
tooltip: Type CSS-like abbreviation
type: ul#nav>li.item$*4>a{Item $}
wait: 1000
tooltip: Run “Expand Abbreviation” action to expand it into HTML ::: “Expand Abbreviation” (Tab key)
wait: 600
run: emmet.expand_abbreviation
wait: 1000
tooltip: Traverse between important code points with “Next/Previous Edit Point” action ::: “Next Edit Point” (Ctrl-Alt-→) <br> “Previous Edit Point” (Ctrl-Alt-←)
wait: 1000
run: {command: 'emmet.next_edit_point', times: 7}
wait: 1000
tooltip: Select tags with “Match Tag Pair” action ::: “Match Pair” (Cmd-D)
run: {command: 'emmet.match_pair_outward', times: 3}
wait: 1000
moveTo: 102
tooltip: Select important parts with “Select Next/Previous Item” action ::: “Select Next Item” (Shift-Cmd-.) <br> “Select Previous Item” (Shift-Cmd-,)
run: {command: 'emmet.select_next_item', times: 7, beforeDelay: 300}
wait: 2000
moveTo: 95
wait: 1000
tooltip: Quickly comment full tag with “Toggle Comment” action ::: “Toggle Comment” (Cmd-/)
run: {command: 'emmet.toggle_comment', times: 2, beforeDelay: 1000}
</textarea>

Basically, most text editors out there allow you to store and re-use commonly used code chunks, called _“snippets”_. While snippets are a good way to boost your productivity, all implementations have common pitfalls: you have to define the snippet first and you can’t extend them in runtime.

Emmet takes the snippets idea to a whole new level: you can type _CSS-like_ expressions that can be dynamically parsed, and produce output depending on what you type in the abbreviation. Emmet is developed and optimised for web-developers whose workflow depends on HTML/XML and CSS, but can be used with programming languages too. 

Start learning Emmet with the [abbreviation syntax](/abbreviations/) and available [actions](/actions/).

## Supported editors ##

* [Eclipse/Aptana](https://github.com/emmetio/emmet-eclipse)
* [Sublime Text 2](https://github.com/sergeche/emmet-sublime)
* [TextMate 1.x](https://github.com/emmetio/Emmet.tmbundle)
* [Coda 1.6 and 2.x](https://github.com/emmetio/Emmet.codaplugin)
* [Espresso](https://github.com/emmetio/Emmet.sugar)
* [Chocolat](https://github.com/sergeche/emmet.chocmixin) (available via “Install Mixin” dialog)
* [Komodo Edit/IDE](https://github.com/emmetio/emmet/downloads) (available via Tools > Add-ons dialog)
* [Notepad++](https://github.com/emmetio/emmet/downloads)
* [PSPad](https://github.com/emmetio/emmet/downloads)
* [&lt;textarea&gt;](https://github.com/emmetio/emmet/downloads)
* [CodeMirror2](https://github.com/emmetio/emmet/downloads)
* [Brackets](https://github.com/emmetio/emmet/downloads)
