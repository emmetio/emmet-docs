$(function() {
	var ios = /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent);
	var mac = ios || /Mac/.test(navigator.platform);
	
	$('.movie-def').each(function(i) {
		var scenario = CodeMirror.movie(this, {
			sectionSeparator: /~{3}|@{3}/g
		});
		var editor = scenario._editor;

		// create UI controls for movie

		// Windows has poor Unicode symbols support
		var buttonLabels = {
			'play': (mac ? '▶ ' : '') + 'Play demo',
			'pause': (mac ? '\u275a\u275a ' : '') + 'Pause',
			'play_again': (mac ? '▶ ' : '') + 'Play again',
			'try_yourself': 'Try it yourself'
		};
		
		// add splash screen
		var splash = $('<div class="CodeMirror-movie__splash">' + 
			'<div class="CodeMirror-movie__splash-text"><span class="CodeMirror-movie__splash-play-btn">▶</span> Watch demo</div>'  + 
			'</div>')
			.click(function() {
				scenario.play();
			});
		
		var removeSplash = function() {
			if (splash) {
				splash.remove();
				splash = null;
			}
		};

		var $w = $(editor.getWrapperElement());
		
		$w.append(splash);
		
		scenario.on('play', removeSplash);

		// create toolbar
		var btnPlay = $('<button class="btn btn-mini btn-primary CodeMirror-movie__btn-play">' + buttonLabels.play +'</button>')
			.click(function() {
				scenario.toggle();
			});

		var btnTry = $('<button class="btn btn-mini btn-success CodeMirror-movie__btn-try">' + buttonLabels.try_yourself +'</button>')
			.click(function() {
				scenario.stop();
				removeSplash();
				editor.execCommand('revert');
				editor.focus();
			});
		
		var toolbar = $('<div class="CodeMirror-movie__toolbar"></div>')
			.append(btnPlay)
			.append(btnTry);
		
		scenario
			.on('play resume', function() {
				btnPlay.html(buttonLabels.pause);
			})
			.on('pause stop', function() {
				btnPlay.html(buttonLabels.play_again);
			});
		
		$w.before(toolbar);
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
				var bin = emmet.require('base64').decode(demoImage);
				var callback = _.last(arguments);
				if (callback && _.isFunction(callback)) {
					callback(0, bin);
				}
				return bin;
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

