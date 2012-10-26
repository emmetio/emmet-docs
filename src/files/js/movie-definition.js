$(function() {
	var ios = /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent);
	var mac = ios || /Mac/.test(navigator.platform);

	var macCharMap = {
		'ctrl': '⌃',
		'control': '⌃',
		'cmd': '⌘',
		'shift': '⇧',
		'alt': '⌥',
		'enter': '⏎',
		'tab': '⇥',
		'left': '←',
		'right': '→',
		'up': '↑',
		'down': '↓'
	};
		
	var pcCharMap = {
		'cmd': 'Ctrl',
		'control': 'Ctrl',
		'ctrl': 'Ctrl',
		'alt': 'Alt',
		'shift': 'Shift',
		'left': '←',
		'right': '→',
		'up': '↑',
		'down': '↓'
	};

	function trim(str) {
		return str.replace(/^\s+/, '').replace(/\s+$/, '');
	}

	function readLines(text) {
		// IE fails to split string by regexp, 
		// need to normalize newlines first
		var nl = '\n';
		var lines = (text || '')
			.replace(/\r\n/g, nl)
			.replace(/\n\r/g, nl)
			.replace(/\r/g, nl)
			.split(nl);

		return _.filter(lines, function(line) {
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

	function prettifyKeyBindings(str) {
		var reKey = /ctrl|alt|shift|cmd/i;
		var map = mac ? macCharMap : pcCharMap;
		return str.replace(/\((.+?)\)/g, function(m, kb) {
			if (reKey.test(kb)) {
				var parts = _.map(kb.toLowerCase().split('-'), function(key) {
					return map[key] || key.toUpperCase();
				});

				return '(' + parts.join(mac ? '' : '+') + ')';
			} else {
				return m;
			}
		});
	}

	function parseMovieDefinition(text) {
		var parts = text.split('~~~');

		// parse scenario
		var reDef = /^(\w+)\s*:\s*(.+)$/;
		var reOutline = /\s+:::\s+(.+)$/;
		var scenario = [];
		var outline = {};
		var editorOptions = {};

		// read movie definition
		_.each(readLines(parts[1]), function(line) {
			if (line.charAt(0) == '#') // it’s a comment, skip the line
				return;

			// do we have outline definition here?
			line = line.replace(reOutline, function(str, title) {
				outline[scenario.length] = prettifyKeyBindings(trim(title));
				return '';
			});

			var sd = line.match(reDef);
			if (!sd) {
				return scenario.push(trim(line));
			}
				

			if (sd[2].charAt(0) == '{') {
				var obj = {};
				obj[sd[1]] = parseJSON(unescape(sd[2]));
				return scenario.push(obj);
			}

			scenario.push(sd[1] + ':' + unescape(sd[2]));
		});

		// read editor options
		if (parts[2]) {
			_.each(readLines(parts[2]), function(line) {
				if (line.charAt(0) == '#') // it’s a comment, skip the line
					return;

				var sd = line.match(reDef);
				if (sd) {
					editorOptions[sd[1]] = sd[2];
				}
			});
		}
		

		return {
			code: unescape(trim(parts[0])),
			scenario: scenario,
			outline: _.keys(outline).length ? outline : null,
			editorOptions: editorOptions
		};
	}

	function createMovie(source) {
		source = $(source);
		var options = parseMovieDefinition(source.val());
		// console.log(options);
		var ta = $('<textarea>').val(options.code).insertBefore(source);

		return CodeMirror.movie(ta[0], options.scenario, options.outline, options.editorOptions);
	}

	$('.movie-def').each(function(i) {
		createMovie(this);
	});
});

// Alias for ”Wrap with Abbreviaiton” action called from CM movie
CodeMirror._wrapWithAbbreviation = function(editor, abbr) {
	var proxy = emmet.require('cm-editor-proxy');
	proxy.setupContext(editor);
	emmet.require('actions').run('wrap_with_abbreviation', proxy, abbr);
};

(function() {
	var demoImage = 'iVBORw0KGgoAAAANSUhEUgAAABQAAAARCAYAAADdRIy+AAAB0UlEQVQ4y2P4z8DAQCoGgjwgVsIqR46BwoJMt7i5GPeBmFQxUFWR5R6IycHOuB5Ii6C5niENiDORcAVID5ICDSCOB+IGIO4G4lwBPqY3MDOAhq5DNhTDkYL8TE+jArgcgGwWIC5iZ2O8TsjRnByMa4G0ENhARkaGf6JCTJ/rCviOg/DeFaKdz85IibCyMM4lJSSALl0Ld6GCDMszoCEaUMzFwszQSmrQ8nIzfgDqFQcbKC3B/BQpDFT4+Zieo2vg4mT8KSLE9AUYuz+BvkKRk5Vi/jC7S2gp0EApsIEykszPYLJaaqwZbGyMv0BckOYwH64r2xeJrrm0S2IGEPcC8TQ1JZZXMMM0VVhfbVsk2g80TAKIGTEM1NdinQliApPGmyWThJcDFXkDMQ+yk+SkmB+AmBZGbI9ObBKvAcpzo8QysoHGemwbgAofn9sGViiGLcCALrzrYMl+7+EJyRSgGmb0dIhiYGsZf+XRdWL5QIVMuGKgvpBvzp3DkvFQA3zwGggKWCBmxRelQHkVqOZ2YPL6iGGgvDTzYzILif+SYszvUcSYmRj+AnPDdyBzM6kYlHzERZnfYLiQEgwsed6hGAgMj/lADEqUK8jAS4C4A9lAAFHbei84vFYeAAAAAElFTkSuQmCC';
	emmet.define('file', function() {
		return {
			read: function(path) {
				return emmet.require('base64').decode(demoImage);
			},
			
			locateFile: function(editorFile, fileName) {
				return fileName;
			},
			
			createPath: function(parent, fileName) {
				return fileName;
			},
			
			save: function(file, content) {
				
			},
			
			getExt: function(file) {
				var m = (file || '').match(/\.([\w\-]+)$/);
				return m ? m[1].toLowerCase() : '';
			}
		};
	});

	// update getImageSize() method to produce fake size
	// for demo image
	emmet.require('actionUtils').getImageSize = function() {
		return {
			width: 200,
			height: 150
		};
	};

	var proxy = emmet.require('cm-editor-proxy');
	proxy.addAction('encode_decode_data_url', 'Shift-Cmd-I');
	proxy.addAction('update_image_size', 'Shift-Cmd-U');

})();

