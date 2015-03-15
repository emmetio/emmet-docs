/**
 * Module with common methods required to generate cheat sheet
 * for default Emmet snippets
 * @param  {Function} require
 * @param  {Underscore} _
 */
emmet.define('cheatsheet', function(require, _) {
	var dataHandlers = {};

	/** Back-reference to current module */
	var module = null;


	/**
	 * Returns snippet item object for specified vocabulary item
	 * @param  {String} name Vocabulary item name
	 * @param  {String} value Vocabulary item value
	 * @param  {String} section   Vocabulary item section name
	 * @return {Object}
	 */
	function snippetItem(name, value, section, syntax) {
		var itemType = 'snippet';
		if (section == 'abbreviations') {
			itemType = value.charAt(0) == '<' ? 'abbreviation' : 'alias';
		}

		return {
			name: name,
			value: value,
			type: itemType,
			syntax: syntax
		};
	}

	return module = {
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
			var voc = require('resources').getVocabulary('system');
			return name in dataHandlers 
				? dataHandlers[name](voc[name], name) 
				: this.defaultDataHandler(voc[name], name);
		},

		/**
		 * Default data handler for all sections
		 * @param  {Object} sectionData Syntax section value
		 * @param  {String} sectionName Syntax name
		 * @return {Array}
		 */
		defaultDataHandler: function(sectionData, sectionName) {
			var output = [];
			var lookup = {};
			_.each(['abbreviations', 'snippets'], function(name) {
				if (name in sectionData) {
					_.each(sectionData[name], function(v, k) {
						// group items that produces the same output
						if (v in lookup) {
							lookup[v].name += ', ' + k;
						} else {
							var item = snippetItem(k, v, name, sectionName);
							lookup[v] = item;
							output.push(item);
						}
					});
				}
			});

			return output;
		},

		/**
		 * Adds custom data handler for given section/syntax name
		 * @param {String}   name Section/syntax name
		 * @param {Function} fn   Data handler that should return array 
		 * of section items
		 */
		addDataHandler: function(name, fn) {
			dataHandlers[name] = fn;
		},

		/**
		 * Removes custom data handler for given section/syntax name
		 * @param  {String} name Section/syntax name
		 */
		removeDataHandler: function(name) {
			if (name in dataHandlers)
				delete dataHandlers[name];
		}
	};
});