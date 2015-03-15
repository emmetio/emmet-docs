---
layout: page
title: Balance
menuOrder: 2
---
A well-known tag balancing: searches for tag or tag's content bounds from current caret position and selects it. It will expand (outward balancing) or shrink (inward balancing) selection when called multiple times. Not every editor supports both inward and outward balancing due of some implementation issues, most editors have outward balancing only.

<textarea class="movie-def">
&lt;div id="page"&gt;
	&lt;section class="content"&gt;
		&lt;h1&gt;Document example&lt;/h1&gt;
		&lt;p&gt;Lorem ipsum |dolor sit amet.&lt;/p&gt;
	&lt;/section&gt;
&lt;/div&gt;
@@@
tooltip: Place caret inside tag’s content and run “Balance” action to select it
run: emmet.balance_outward ::: “Balance Outward” (Cmd-D)
wait: 1000
tooltip: Run action multiple times to expand selection
run: {command: 'emmet.balance_outward', times: 5}
wait: 1000
tooltip: Run “Balance Inward” action to shrink selection
wait: 1000
run: {command: 'emmet.balance_inward', times: 5} ::: “Balance Inward (Shift-Cmd-D)
</textarea>

Emmet’s tag balancing is quite unique. Unlike other implementation, this one will search tag bounds from caret’s position, not the start of the document. It means you can use tag balancer even in non-HTML documents.

<textarea class="movie-def">
function test(data) {
	var out = '&lt;table&gt;';
	for (var i = data.rows.length - 1; i >= 0; i--) {
		var row = data.rows[i];
		out += '&lt;tr&gt;';

		for (var j = row.cells.length - 1; j >= 0; j--) {
			out += '&lt;td&gt;' + row.|cells[j] + '&lt;/td&gt;';
		}

		out += '&lt;/tr&gt;';
	}

	out += '&lt;/table&gt;';
	return out;
}
@@@
tooltip: {text: 'Place caret somewhere between opening and closing tag. Run “Balance” action and, if tag definitions are consistent enough, they will match', wait: 7000}
run: {command: 'emmet.balance_outward', times: 6} ::: Balance” (Cmd-D)
@@@
mode: text/javascript
</textarea>

Note that tag matching may not work outside HTML if tag definition is assembled by concatenating strings, like this: `var cell = '<td class="' + (data.odd ? 'odd' : 'even') + '">'`;