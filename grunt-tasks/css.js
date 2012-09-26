var csso = require('csso');
var _ = require('underscore');
var grunt = require('grunt');
var fs = require('fs');
var path = require('path');

function isToken(token, type) {
	return token instanceof Array && token[1] == type;
}

function findToken(list, type) {
	return _.find(list, function(item) {
		return isToken(item, type);
	});
}

/**
 * Finds all @imported files in CSS file and returns their paths and locations
 * inside CSS
 */
function findImports(css) {
	var tokens = csso.parse(css, 'stylesheet');
	var imports = [];
	tokens.forEach(function(token, i) {
		if (isToken(token, 'atrules')) {
			// is it @import rule?
			var kw = findToken(token, 'atkeyword');
			if (kw && kw[2][2].toLowerCase() == 'import') {
				var braces = findToken(token, 'braces');
				if (braces) {
					var ruleStart = token[0].f;
					var ruleEnd = token[0].l;
					if (css.charAt(ruleEnd) == ';') {
						ruleEnd++;
					}

					imports.push({
						file: css.substring(braces[0].f + 1, braces[0].l).replace(/^['"]?|['"]?$/, ''),
						start: ruleStart,
						end: ruleEnd
					});
				}
				
			}
		}
	});

	return imports;
}

/**
 * Compiles singe CSS file: concats all @imported file into singe one
 * @param {String} file Absolute path to CSS file
 * @param {Function} pathResolver Function that will resolve paths to imported file
 * @returns {String} Content of compiled file
 */
function compileCSSFile(file, pathResolver) {
	var originalFile = fs.readFileSync(file, 'utf8');
	
}

if (!module.parent) {
	console.log(findImports('@import (file.css);@import("file2.css");body{color: red} .item {background: red}'));
}

// module.exports = function(grunt) {
// 	grunt.registerHelper('')
// }