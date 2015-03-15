import {CodeMirrorMovie, EmmetCodemirror} from './lib/movie';
import {toDom, removeElem, querySelectorAll as $, extend} from './lib/utils';
import preferences from './lib/preferences';
import './lib/fake-file';

var ios = /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent);
var mac = ios || /Mac/.test(navigator.platform);

// Windows has poor Unicode symbols support
var buttonLabels = {
	'play': (mac ? '▶ ' : '') + 'Play demo',
	'pause': (mac ? '\u275a\u275a ' : '') + 'Pause',
	'play_again': (mac ? '▶ ' : '') + 'Play again',
	'try_yourself': 'Try it yourself'
};

var codeMirrorOptions = {
	theme: 'espresso',
	indentWithTabs: true,
	tabSize: 4,
	lineNumbers : true,
	indentUnit: 4,
	styleActiveLine: true
};

export function setupMovie(elem) {
	var movie = CodeMirrorMovie(elem, {
		sectionSeparator: /~{3}|@{3}/g
	}, extend({
		mode : elem.getAttribute('data-cm-mode') || 'text/html',
	}, codeMirrorOptions));
	var editor = movie._editor;
	EmmetCodemirror(editor);

	// create UI controls for movie

	// add splash screen
	var splash = toDom(`<div class="CodeMirror-movie__splash">
		<div class="CodeMirror-movie__splash-text">
			<span class="CodeMirror-movie__splash-play-btn">▶</span> Watch demo
		</div>
	</div>`);
	
	splash.addEventListener('click', evt => movie.play());
	var removeSplash = () => removeElem(splash);
	
	movie.on('play', removeSplash);

	// create toolbar
	var btnPlay = toDom(`<button class="btn btn-mini btn-primary CodeMirror-movie__btn-play">${buttonLabels.play}</button>`);
	btnPlay.addEventListener('click', evt => movie.toggle());

	var btnTry = toDom(`<button class="btn btn-mini btn-success CodeMirror-movie__btn-try">${buttonLabels.try_yourself}</button>`);
	btnTry.addEventListener('click', evt => {
		movie.stop();
		removeSplash();
		editor.setOption('readOnly', false);
		editor.execCommand('revert');
		editor.focus();
	});
	
	var toolbar = toDom('<div class="CodeMirror-movie__toolbar"></div>');
	toolbar.appendChild(btnPlay);
	toolbar.appendChild(btnTry);
	
	movie
	.on('play resume', () => btnPlay.innerText = buttonLabels.pause)
	.on('pause stop', () => btnPlay.innerText = buttonLabels.play_again);
	
	var wrapper = editor.getWrapperElement();
	wrapper.appendChild(splash);
	wrapper.parentNode.insertBefore(toolbar, wrapper);
}

export function setupEditor(elem) {
	var editor = CodeMirror.fromTextArea(elem, extend({
		mode : elem.getAttribute('data-cm-mode') || 'text/html',
	}, codeMirrorOptions));
	var height = elem.getAttribute('data-height');
	if (height) {
		editor.getWrapperElement().style.height = height + 'px';
	}
	EmmetCodemirror(editor);
}

$('.movie-def').forEach(setupMovie);
$('.emmet-preferences').forEach(preferences);
$('.cm-box').forEach(setupEditor);