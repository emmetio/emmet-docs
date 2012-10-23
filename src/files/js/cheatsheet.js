/**
 * Module with common methods required to generate cheat sheet
 * for default Emmet snippets
 * @param  {Function} require
 * @param  {Underscore} _
 */
emmet.define('cheatsheet', function(require, _) {
	var dataHandlers = {};

	/**
	 * Returns snippet item object for specified vocabulary item
	 * @param  {String} name Vocabulary item name
	 * @param  {String} value Vocabulary item value
	 * @param  {String} section   Vocabulary item section name
	 * @return {Object}
	 */
	function snippetItem(name, value, section) {
		var itemType = 'snippet';
		if (section == 'abbreviations') {
			itemType = value.charAt(0) == '<' ? 'abbreviation' : 'alias';
		}

		return {
			name: name,
			value: value,
			type: itemType
		};
	}

	/**
	 * Default data handler for all sections
	 * @param  {Object} sectionData Syntax section value
	 * @param  {String} sectionName Syntax name
	 * @return {Array}
	 */
	function defaultDataHandler(sectionData, sectionName) {
		var output = [];
		_.each(['abbreviations', 'snippets'], function(name) {
			if (name in sectionData) {
				_.each(sectionData[name], function(v, k) {
					output.push(snippetItem(k, v, name));
				});
			}
		});

		return output;
	}

	// XXX a special CSS data handler that splits data across sections
	dataHandlers.css = function(sectionData, sectionName) {

	};

	return {
		/**
		 * Returns list of all available sections
		 * @return {Array}
		 */
		sections: function() {
			var voc = require('resources').getVocabulary('system');

			// filter out keys with snippets definitions
			return _.filter(_.keys(voc), function(key) {
				var value = voc[key];
				return 'snippets' in value || 'abbreviations' in value;
			});
		},

		/**
		 * Returns data for specified section
		 * @param  {String} name Section name
		 * @return {Array}
		 */
		data: function(name) {

		}
	};
});