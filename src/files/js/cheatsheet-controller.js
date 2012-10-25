$(function() {
	var sections = {
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

	var caretMarker = '<span class="ch-tabstop" title="Caret position">&bull;</span>';

	var snippetTemplate = _.template('<dl class="ch-snippet">'
		+ '<dt class="ch-snippet__name"><%= name %></dt>'
		+ '<dd class="ch-snippet__value ch-snippet__value_<%= type %>"><%= value %></dd>'
		+ '</dl>');

	var sectionTemplate = _.template('<section class="ch-section ch-section_<%= id %>">'
		+ '<h2 class="ch-section__title"><%= title %></h2>'
		+ '<%= content %>'
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
				value: formatSnippetValue(item.value, item.type)
			}));
		}).join('');
	}

	function renderSubsectionData(data) {
		return subsectionTemplate(_.extend({
			content: renderSectionData(data.value)
		}, data));
	}

	function formatSnippetValue(snippet, type) {
		return emmet.require('tabStops').processText(_.escape(snippet), {
			tabstop: function(data) {
				return data.placeholder 
					? '<span class="ch-tabstop" title="Tabstop">' + data.placeholder + '</span>'
					: caretMarker;
			}
		}).replace('|', caretMarker);
	}

	var cs = emmet.require('cheatsheet');
	$('#cheatsheet').append(
		_.chain(cs.sections())
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
					content: renderSectionData(cs.data(s.id))
				}, s));
			})
			.value()
			.join('')
	);
});