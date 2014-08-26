---
layout: page
title: "snippets.json"
menuOrder: 1
---
Create `snippets.json` file in extensions folder to add or override snippets. The structure of this file is the same as the [original one](https://github.com/emmetio/emmet/blob/master/lib/snippets.json): on the top level you define _syntax name_ your snippets belong to, and the second level has the following section:

* `abbreviations` or `snippets` contains snippets definitions of [different types](/abbreviations/types/).
* `filters` contains a comma-separated list of [filters](/filters/) applied by default for current syntax. If this property is not defined, `html` filter is used.
* `extends`: syntax name from which current syntax should inherit snippets definitions. For example, `sass` syntax is inherited from `css` one, but you can create your own or override some SASS-specific snippets for this syntax definition.

When loaded, users’ `snippets.json` in _recursively merged_ with the original one, adding or updating abbreviations and snippets.

### Text snippets ###

In `snippets` section of syntax definition, you create plain text snippets, pretty like the same as your editor ones. You can also use _tabstops_ inside snippets to traverse between them with Tab key when abbreviation is expanded (if your editor supports them). Emmet borrows tabstop format from [TextMate](http://macromates.com) editor:

* `$1` or `${1}`
* `${1:hello world}` — tabstop with placeholder

Note that `${0}` or `$0` tabstop has a special meaning in some editors like TextMate or Eclipse and is used as a final caret position after leaving “tabstops mode” so you’d better use tabstops staring from 1.

### Variables ###

You can use _variables_ in snippets to output predefined data. For example, the `html:5` snippet of HTML syntax has the following definition:

    <!doctype html>\n<html lang="${lang}">...</body>\n</html>

In the example above, `${lang}` is used to refer `lang` variable defined in `variables` section of `snippets.json`. If your primary language is, for example, Russian, you can simply override `lang` variable with `ru` value and keep the original snippets.

Also, you can override variable values with inline abbreviation attributes: `html:5[lang=ru]`. Together with ID and CLASS attributes shorthands—`#` and `.`—you can easily override variables right in abbreviation:

    "for": "for (var ${class} = 0; i < ${id}.length; ${class}++) {\n\t|}"

Example usage: `for#array.i`.

### Predefined variables ###

Snippets have some predefined variable names that have special meaning to Emmet:

* `${cursor}` or `|` are synonyms to `$0` and used as caret position in generated output.
* `${child}` refers to a position where child abbreviations and snippets should be outputted. If not defined, children will be outputted at the end of snippet content.

### Escaping `|` and `$` characters ###

The `$` character is used for tabstops and variables, the `|` character it used to indicate caret position when snippet is expanded. If you want to output these characters as-is, you should use double slash to escape them: `\\$` or `\\|`

### Sharing snippets

If you want to share your snippets with other users, you should put them into a file which name starts with `snippets`, for example: `snippets-foo.json`, `snippets_bar.json`, `snippetsBaz.json`. Emmet will load them on start and merge into  a single snippets set. 

_Notice that snippets defined in `snippets.json` file has higher priority over ones defined in `snippets*.json`_.
