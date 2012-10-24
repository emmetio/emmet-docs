$(function() {
	var sections = {
		'html': {
			order: 1,
			title: 'HTML'
		}, 

		'css': {
			order: 2,
			title: 'CSS'
		}, 

		'xsl': {
			order: 3,
			title: 'XSL'
		}
	};

	var htmlChars = {
		'<': '&lt;',
		'>': '&gt;',
		'&': '&amp;'
	};

	function escapeHTML(str) {
		return str.replace(/[<>&]/g, function(ch) {
			return htmlChars[ch];
		});
	}

	function outputSnippetsList(list) {
		var output = '<dl class="cheatsheet">';
		_.each(list, function(item) {
			result += '<dt class="cheatsheet__name">' + item.name + '</dt>'
				+ '<dd class="cheatsheet__value cheatsheet__value_' + item.type + '">' + item.value + '</dd>'
		});
		return output + '</dl>';
	}
});