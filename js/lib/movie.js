import EmmetCodemirror from 'emmet-codemirror';
import CodeMirrorMovie from 'codemirror-movie';
import CodeMirror from 'codemirror';

import 'codemirror/mode/css/css.js';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import 'codemirror/addon/selection/active-line.js';

var emmet = EmmetCodemirror.emmet;
var EmmetEditor = EmmetCodemirror.EmmetEditor;

EmmetCodemirror.setup(CodeMirror);
window.CodeMirror = CodeMirror;
window.emmet = emmet;
// add 'revert' action to CodeMirror to restore original text and position
CodeMirror.commands.revert = function(editor) {
	if (editor.__initial) {
		editor.setValue(editor.__initial.content);
		editor.setCursor(editor.__initial.pos);
	}
};

CodeMirror.commands.wrapWithAbbreviation = function(editor, abbr) {
	emmet.run('wrap_with_abbreviation', new EmmetEditor(editor), abbr);
};

EmmetCodemirror.defaultKeymap['Shift-Cmd-U'] = 'emmet.update_image_size';
EmmetCodemirror.defaultKeymap['Shift-Cmd-I'] = 'emmet.encode_decode_data_url';

export {CodeMirror, CodeMirrorMovie, EmmetCodemirror, emmet};