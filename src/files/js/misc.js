;$(function() {
	function generatePreferencesTable() {
		var prefs = emmet.require('preferences').list();
		var row = _.template('<tr>' 
			+ '<td>' 
			+ '<span class="emmet-preferences__name"><%= name %></span>' 
			+ '<div class="emmet-preferences__desc"><%= description %></div>' 
			+ '</td><td>' 
			+ '<span class="emmet-preferences__value"><%- value %></span>' 
			+ '</td></tr>');
		var output = '<table class="emmet-preferences__list">' ;
		_.each(prefs, function(item) {
			output += row(item);
		});

		return output + '</table>';
	}

	$('.emmet-preferences').each(function() {
		$(this)
			.html(generatePreferencesTable())
			.on('click', '.emmet-preferences__value', function() {
				$(this).toggleClass('emmet-preferences__value_full');
			});
	});

	// create editor boxes in page
	$('.cm-box').each(function() {
		var options = {
			theme: 'espresso',
			mode : $(this).data('cm-mode') || 'text/html',
			indentWithTabs: true,
			tabSize: 4,
			lineNumbers : true,
			onCursorActivity: function() {
				editor.setLineClass(hlLine, null, null);
				hlLine = editor.setLineClass(editor.getCursor().line, null, "activeline");
			}
		}
		var editor = CodeMirror.fromTextArea(this, options);
		var hlLine = editor.setLineClass(0, 'activeline');

		if ($(this).data('height')) {
			editor.getWrapperElement().style.height = $(this).data('height') + 'px';
		}
	});
});