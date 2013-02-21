$(function() {
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
			description: '<p>CSS module uses fuzzy search to find unknown abbreviations, e.g. <code>ov:h</code> == <code>ov-h</code> == <code>ovh</code> == <code>oh</code>.</p>'
			+ '<p>If abbreviation wasn’t found, it is transformed into property name: <code>foo-bar</code> → <code>foo-bar: |;</code></p>'
			+ '<p>You can prefix abbreviations with hyphen to produce vendor-prefixed properties: <code>-foo</code></p>'
		}, 

		'xsl': {
			order: 3,
			title: 'XSL'
		}
	};

	// pre-fill syntax section
	var syntaxSection = [
		{
			name: 'Child: >',
			value: [
				{
					name: 'nav>ul>li',
					value: '<nav>\n\t<ul>\n\t\t<li></li>\n\t</ul>\n</nav>',
					type: 'snippet'
				}
			]
		}, {
			name: 'Sibling: +',
			value: [
				{
					name: 'div+p+bq',
					value: '<div></div>\n<p></p>\n<blockquote></blockquote>',
					type: 'snippet'
				}
			]
		}, {
			name: 'Climb-up: ^',
			value: [
				{
					name: 'div+div>p>span+em^bq',
					value: '<div></div>\n<div>\n\t<p><span></span><em></em></p>\n\t<blockquote></blockquote>\n</div>',
					type: 'snippet'
				}, {
					name: 'div+div>p>span+em^^bq',
					value: '<div></div>\n<div>\n\t<p><span></span><em></em></p>\n</div>\n<blockquote></blockquote>',
					type: 'snippet'
				}
			]
		}, {
			name: 'Grouping: ()',
			value: [
				{
					name: 'div>(header>ul>li*2>a)+footer>p',
					value: '<div>\n\t<header>\n\t\t<ul>\n\t\t\t<li><a href=""></a></li>\n\t\t\t<li><a href=""></a></li>\n\t\t</ul>\n\t</header>\n\t<footer>\n\t\t<p></p>\n\t</footer>\n</div>',
					type: 'snippet'
				}, {
					name: '(div>dl>(dt+dd)*3)+footer>p',
					value: '<div>\n\t<dl>\n\t\t<dt></dt>\n\t\t<dd></dd>\n\t\t<dt></dt>\n\t\t<dd></dd>\n\t\t<dt></dt>\n\t\t<dd></dd>\n\t</dl>\n</div>\n<footer>\n\t<p></p>\n</footer>',
					type: 'snippet'
				}
			]
		}, {
			name: 'Multiplication: *',
			value: [
				{
					name: 'ul>li*5',
					value: '<ul>\n\t<li></li>\n\t<li></li>\n\t<li></li>\n\t<li></li>\n\t<li></li>\n</ul>',
					type: 'snippet'
				}
			]
		}, {
			name: 'Item numbering: $',
			value: [
				{
					name: 'ul>li.item$*5',
					value: '<ul>\n\t<li class="item1"></li>\n\t<li class="item2"></li>\n\t<li class="item3"></li>\n\t<li class="item4"></li>\n\t<li class="item5"></li>\n</ul>',
					type: 'snippet'
				}, {
					name: 'h$[title=item$]{Header $}*3',
					value: '<h1 title="item1">Header 1</h1>\n<h2 title="item2">Header 2</h2>\n<h3 title="item3">Header 3</h3>',
					type: 'snippet'
				}, {
					name: 'ul>li.item$$$*5',
					value: '<ul>\n\t<li class="item001"></li>\n\t<li class="item002"></li>\n\t<li class="item003"></li>\n\t<li class="item004"></li>\n\t<li class="item005"></li>\n</ul>',
					type: 'snippet'
				}, {
					name: 'ul>li.item$@-*5',
					value: '<ul>\n\t<li class="item5"></li>\n\t<li class="item4"></li>\n\t<li class="item3"></li>\n\t<li class="item2"></li>\n\t<li class="item1"></li>\n</ul>',
					type: 'snippet'
				}, {
					name: 'ul>li.item$@3*5',
					value: '<ul>\n\t<li class="item3"></li>\n\t<li class="item4"></li>\n\t<li class="item5"></li>\n\t<li class="item6"></li>\n\t<li class="item7"></li>\n</ul>',
					type: 'snippet'
				}

			]
		}, {
			name: 'ID and CLASS attributes',
			value: [
				{
					name: '#header',
					value: '<div id="header"></div>',
					type: 'snippet'
				}, {
					name: '.title',
					value: '<div class="title"></div>',
					type: 'snippet'
				}, {
					name: 'form#search.wide',
					value: '<form id="search" class="wide"></form>',
					type: 'snippet'
				}, {
					name: 'p.class1.class2.class3',
					value: '<p class="class1 class2 class3"></p>',
					type: 'snippet'
				}
			]
		}, {
			name: 'Custom attributes',
			value: [
				{
					name: 'p[title="Hello world"]',
					value: '<p title="Hello world"></p>',
					type: 'snippet'
				}, {
					name: 'td[rowspan=2 colspan=3 title]',
					value: '<td rowspan="2" colspan="3" title=""></td>',
					type: 'snippet'
				}, {
					name: '[a=\'value1\' b="value2"]',
					value: '<div a="value1" b="value2"></div>',
					type: 'snippet'
				}
			]
		}, {
			name: 'Text: {}',
			value: [
				{
					name: 'a{Click me}',
					value: '<a href="">Click me</a>',
					type: 'snippet'
				}, {
					name: 'p>{Click }+a{here}+{ to continue}',
					value: '<p>Click <a href="">here</a> to continue</p>',
					type: 'snippet'
				}
			]
		}, {
			name: 'Implicit tag names',
			value: [
				{
					name: '.class',
					value: '<div class="class"></div>',
					type: 'snippet'
				}, {
					name: 'em>.class',
					value: '<em><span class="class"></span></em>',
					type: 'snippet'
				}, {
					name: 'ul>.class',
					value: '<ul>\n\t<li class="class"></li>\n</ul>',
					type: 'snippet'
				}, {
					name: 'table>.row>.col',
					value: '<table>\n\t<tr class="row">\n\t\t<td class="col"></td>\n\t</tr>\n</table>',
					type: 'snippet'
				}
			]
		}
	];

	// var caretMarker = '<span class="ch-tabstop" title="Caret position">&bull;</span>';
	var caretMarker = '<span class="ch-caret" title="Caret position"></span>';

	var snippetTemplate = _.template('<dl class="ch-snippet">'
		+ '<dt class="ch-snippet__name"><%- name %></dt>'
		+ '<dd class="ch-snippet__value ch-snippet__value_<%= type %>"><%= value %></dd>'
		+ '</dl>');

	var sectionTemplate = _.template('<section class="ch-section ch-section_<%= id %>">'
		+ '<h2 class="ch-section__title"><%= title %></h2>'
		+ '<div class="ch-section__desc"><%= description %></div>'
		+ '<div class="ch-section__content"><%= content %></div>'
		+ '</section>');

	var subsectionTemplate = _.template('<section class="ch-subsection">'
		+ '<h3 class="ch-subsection__title"><%= name %></h3>'
		+ '<%= content %>'
		+ '</section>');

	function renderSectionData(data) {
		return _.map(data, function(item) {
			if (_.isArray(item.value)) {
				return renderSubsectionData(item);
			}

			return snippetTemplate(_.extend({}, item, {
				value: formatSnippetValue(item)
			}));
		}).join('');
	}

	function renderSubsectionData(data) {
		return subsectionTemplate(_.extend({
			content: renderSectionData(data.value)
		}, data));
	}

	function formatSnippetValue(item) {
		var prefix = '';
		var snippet = item.value;
		if (item.type == 'alias' || item.type == 'abbreviation') {
			if (item.type == 'alias') {
				prefix = '<p class="cn-snippet__alias">Alias of <span class="cn-snippet__alias-abbr">' + _.escape(snippet) + '</span></p>';
			}
			
			snippet = emmet.expandAbbreviation(item.name.split(',')[0], item.syntax, 'xhtml');			
		}

		return prefix + emmet.require('tabStops').processText(_.escape(snippet), {
			tabstop: function(data) {
				return data.placeholder 
					? '<span class="ch-tabstop" title="Tabstop">' + data.placeholder + '</span>'
					: caretMarker;
			}
		})
		.replace('|', caretMarker)
		.replace(/\t/g, '    ');
	}

	var cs = emmet.require('cheatsheet');
	$('#cheatsheet').append(
		_.chain(['syntax'].concat(cs.sections()))
			// map all available cheat sheet section to ordered sections
			.map(function(s) {
				return _.extend({
					id: s,
					title: s,
					order: 99
				}, sections[s] || {});
			})
			.sortBy('order')
			.map(function(s) {
				return sectionTemplate(_.extend({
					description: '',
					content: renderSectionData(s.id == 'syntax' ? syntaxSection : cs.data(s.id))
				}, s));
			})
			.value()
			.join('')
	);
});