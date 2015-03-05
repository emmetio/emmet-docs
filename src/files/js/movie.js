import cmEmmet from 'emmet-codemirror';
import movie from 'codemirror-movie';
import CodeMirror from 'codemirror';

var emmet = cmMovie.emmet;
var ios = /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent);
var mac = ios || /Mac/.test(navigator.platform);

// Windows has poor Unicode symbols support
var buttonLabels = {
	'play': (mac ? '▶ ' : '') + 'Play demo',
	'pause': (mac ? '\u275a\u275a ' : '') + 'Pause',
	'play_again': (mac ? '▶ ' : '') + 'Play again',
	'try_yourself': 'Try it yourself'
};

function setupMovie(elem) {
	
}