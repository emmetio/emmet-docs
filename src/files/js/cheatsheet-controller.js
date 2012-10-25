$(function() {
	var sections = {
		'syntax': {
			title: 'Syntax',
			order: 0
		},
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
					name: 'div+div>p>span+em^^^bq',
					value: '<div></div>\n<div>\n\t<p><span></span><em></em></p>\n</div>\n<blockquote></blockquote>',
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
			if (item.type == 'alias')
				prefix = '<p class="cn-snippet__alias">Alias of <span class="cn-snippet__alias-abbr">' + _.escape(snippet) + '</span></p>';
			snippet = emmet.expandAbbreviation(item.name.split(',')[0], item.syntax, 'xhtml');			
		}

		return prefix + emmet.require('tabStops').processText(_.escape(snippet), {
			tabstop: function(data) {
				return data.placeholder 
					? '<span class="ch-tabstop" title="Tabstop">' + data.placeholder + '</span>'
					: caretMarker;
			}
		}).replace('|', caretMarker);
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
					content: renderSectionData(s.id == 'syntax' ? syntaxSection : cs.data(s.id))
				}, s));
			})
			.value()
			.join('')
	);
});