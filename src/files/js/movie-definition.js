$(function() {
	function trim(str) {
		return str.replace(/^\s+/, '').replace(/\s+$/, '');
	}

	function readLines(text) {
		return _.filter(text.split(/\n|\r/), function(line) {
			return !!line;
		});
	}

	function parseJSON(text) {
		try {
			return (new Function('return ' + text))();
		} catch(e) {
			return {};
		}
	}

	function unescape(text) {
		var replacements = {
			'&lt;':  '<',
			'&gt;':  '>',
			'&amp;': '&'
		};

		return text.replace(/&(lt|gt|amp);/g, function(str, p1) {
			return replacements[str] || str;
		});
	}

	function parseMovieDefinition(text) {
		var parts = text.split('~~~');

		// parse scenario
		var reDef = /^(\w+)\s*:\s*(.+)$/
		var scenario = _.map(readLines(parts[1]), function(line) {
			var sd = line.match(reDef);
			if (sd[2].charAt(0) == '{') {
				var obj = {};
				obj[sd[1]] = parseJSON(unescape(sd[2]));
				return obj;
			}

			return sd[1] + ':' + unescape(sd[2]);
		});

		// parse outline
		var outline = null;
		if (parts[2]) {
			outline = {};
			_.map(readLines(parts[2]), function(line) {
				var sd = line.match(reDef);
				outline[sd[1]] = unescape(sd[2]);
			});
		}

		return {
			code: unescape(trim(parts[0])),
			scenario: scenario,
			outline: outline
		};
	}

	function createMovie(source) {
		source = $(source);
		var options = parseMovieDefinition(source.html());
		var ta = $('<textarea>').val(options.code).insertBefore(source);

		return CodeMirror.movie(ta[0], options.scenario, options.outline);
	}

	$('.movie-def').each(function(i) {
		createMovie(this);
	});
});