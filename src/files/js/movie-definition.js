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
		'left': '←',
		'right': '→',
		'up': '↑',
		'down': '↓'
	};

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
		var options = parseMovieDefinition(source.html());
		// console.log(options);
		var ta = $('<textarea>').val(options.code).insertBefore(source);

		return CodeMirror.movie(ta[0], options.scenario, options.outline, options.editorOptions);
	}

	$('.movie-def').each(function(i) {
		createMovie(this);
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
	});
});

// Alias for ”Wrap with Abbreviaiton” action called from CM movie
CodeMirror._wrapWithAbbreviation = function(editor, abbr) {
	var proxy = emmet.require('cm-editor-proxy');
	proxy.setupContext(editor);
	emmet.require('actions').run('wrap_with_abbreviation', proxy, abbr);
};

(function() {
	emmet.define('file', function() {
		return {
			read: function(path) {
				return 'content';
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

	CodeMirror._updateImageSize = function(editor) {
		var proxy = emmet.require('cm-editor-proxy');
		proxy.setupContext(editor);
		emmet.require('actions').run('update_image_size', proxy);
	};

})();

