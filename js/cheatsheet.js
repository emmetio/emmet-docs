import syntaxSection from './cheatsheet/syntax-section';
import generateCSSSection from './cheatsheet/css-section';
import {template, escape, extend, sortBy} from './lib/utils';

var sections = {
	'syntax': {
		title: 'Syntax',
		order: 0
	},
	'html': {
		order: 1,
		title: 'HTML',
		description: '<p>All unknown abbreviations will be transformed to tag, e.g. <code>foo</code> → <code>&lt;foo&gt;&lt;/foo&gt;</code>.</p>'
	}, 

	'css': {
		order: 2,
		title: 'CSS',
		description: `<p>CSS module uses fuzzy search to find unknown abbreviations, e.g. <code>ov:h</code> == <code>ov-h</code> == <code>ovh</code> == <code>oh</code>.</p>
		<p>If abbreviation wasn’t found, it is transformed into property name: <code>foo-bar</code> → <code>foo-bar: |;</code></p>
		<p>You can prefix abbreviations with hyphen to produce vendor-prefixed properties: <code>-foo</code></p>`
	}, 

	'xsl': {
		order: 3,
		title: 'XSL'
	}
};

var caretMarker = '<span class="ch-caret" title="Caret position"></span>';

var snippetTemplate = template(`<dl class="ch-snippet">
	<dt class="ch-snippet__name"><%- name %></dt>
	<dd class="ch-snippet__value ch-snippet__value_<%= type %>"><%= value %></dd>
	</dl>`);

var sectionTemplate = template(`<section class="ch-section ch-section_<%= id %>">
	<h2 class="ch-section__title"><%= title %></h2>
	<div class="ch-section__desc"><%= description %></div>
	<div class="ch-section__content"><%= content %></div>
	</section>`);

var subsectionTemplate = template(`<section class="ch-subsection">
	<h3 class="ch-subsection__title"><%= name %></h3>
	<%= content %>
	</section>`);

function renderSectionData(data) {
	return data.map(function(item) {
		if (Array.isArray(item.value)) {
			return renderSubsectionData(item);
		}

		return snippetTemplate(extend({}, item, {
			value: formatSnippetValue(item)
		}));
	}).join('');
}

function renderSubsectionData(data) {
	return subsectionTemplate(extend({
		content: renderSectionData(data.value)
	}, data));
}

/**
 * Returns snippet item object for specified vocabulary item
 * @param  {String} name Vocabulary item name
 * @param  {String} value Vocabulary item value
 * @param  {String} section   Vocabulary item section name
 * @return {Object}
 */
function snippetItem(name, value, section, syntax) {
	var itemType = 'snippet';
	if (section === 'abbreviations') {
		itemType = value.charAt(0) == '<' ? 'abbreviation' : 'alias';
	}

	return {
		name: name,
		value: value,
		type: itemType,
		syntax: syntax
	};
}

function formatSnippetValue(item) {
	var prefix = '';
	var snippet = item.value;
	if (item.type === 'alias' || item.type === 'abbreviation') {
		if (item.type === 'alias') {
			prefix = `<p class="cn-snippet__alias">Alias of <span class="cn-snippet__alias-abbr">${escape(snippet)}</span></p>`;
		}
		
		snippet = emmet.expandAbbreviation(item.name.split(',')[0], item.syntax, 'xhtml');
	}

	return prefix + emmet.tabStops.processText(escape(snippet), {
		tabstop: data => data.placeholder ? `<span class="ch-tabstop" title="Tabstop">${data.placeholder}</span>` : caretMarker
	})
	.replace('|', caretMarker)
	.replace(/\t/g, '    ');
}

/**
 * Returns list of all available Emmet resource sections
 * @return {Array}
 */
function sectionList() {
	var voc = emmet.resources.getVocabulary('system');

	// filter out keys with snippets definitions
	return Object.keys(voc).filter(key => 'snippets' in voc[key] || 'abbreviations' in voc[key]);
}

/**
 * Generates default Emmet resource section content
 * @param  {Object} data Syntax section value
 * @param  {String} sectionName Syntax name
 * @return {Array}
 */
function generateSection(data, sectionName) {
	var output = [];
	var lookup = {};
	['abbreviations', 'snippets'].forEach(name => {
		if (name in data) {
			Object.keys(data[name]).forEach(k => {
				var v = data[name][k];
				// group items that produces the same output
				if (v in lookup) {
					lookup[v].name += ', ' + k;
				} else {
					var item = snippetItem(k, v, name, sectionName);
					lookup[v] = item;
					output.push(item);
				}
			})
		}
	});
	return output;
}

/**
 * Returns data for specified section
 * @param  {String} name Section name
 * @return {Array}
 */
function sectionData(name) {
	var voc = emmet.resources.getVocabulary('system');
	var data = generateSection(voc[name], name);
	if (name === 'css') {
		data = generateCSSSection(data);
	}
	return data;
}

function generateCheatsheet() {
	var allSections = ['syntax']
		.concat(sectionList())
		.map(name => extend({
			id: name,
			title: name,
			order: 99
		}, sections[name]));

	return sortBy(allSections, 'order')
	.map(s => sectionTemplate(extend({
		description: '',
		content: renderSectionData(s.id == 'syntax' ? syntaxSection : sectionData(s.id))
	}, s)))
	.join('');
}

// XXX render
document.getElementById('cheatsheet').innerHTML += generateCheatsheet();