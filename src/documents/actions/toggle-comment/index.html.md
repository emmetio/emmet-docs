---
layout: page
title: Toggle Comment
menuOrder: 6
---
This action, as name says, toggle comment on selection. Almost all programmer’s text editors have such action, but this one works differently. When there’s no selection, editor’s action toggles comment on current line while Emmet’s one do this on _current context_. For HTML it’s a full tag, for CSS it’s a rule or full property.

<textarea class="movie-def">
&lt;sty|le&gt;
body {
	padding: 10px; color: black;
}
&lt;/style&gt;
@@@
tooltip: {text: 'When invoked with no selection in HTML document, “Toggle Comment” action matches full tag', wait: 7000}
wait: 500
run: {command: 'emmet.toggle_comment', times: 2, beforeDelay: 1000} ::: “Toggle Comment” (Cmd-/)
wait: 1000
moveTo: 1:3
wait: 1000
tooltip: In CSS, it toggles comment on rule or full property, depending on caret position
run: {command: 'emmet.toggle_comment', times: 2, beforeDelay: 1000}
wait: 1000
moveTo: 2:11
wait: 1000
run: {command: 'emmet.toggle_comment', times: 2, beforeDelay: 1000}
</textarea>
