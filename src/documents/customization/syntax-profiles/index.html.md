---
layout: page
title: "syntaxProfiles.json"
menuOrder: 3
---
Output profiles are used to defined how generated HTML content should look like. For example, when you expand `br` abbreviation, Emmet may produce one of the following tag:

* `<br>` — HTML notation
* `<br />` — XHTML notation
* `<br/>` — XML notation

Emmet tries to automatically detect output profile for current document. For example, if document contains XHTML doctype, it will use `xhtml` profile, `html` otherwise.

But sometimes you’d like to force Emmet to use another profile for specified syntax or use your own profile with specific rules. 

In this case, you should create `syntaxProfiles.json` file in extensions folder and specify profile for required syntax.

The content of this file is a simple key–value dictionary where key is syntax name as defined in `snippets.json` and value is a name of predefined profile (`String`) or dictionary with profile options (`Object`):

    {
        // force XHTML profile for HTML syntax
        "html": "xhtml",

        // create our own profile for XML
        "xml": {
            "tag_case": "upper",
            "attr_quotes": "single"
        }
    }

### Predefined profiles ###

* `html` — default output profile.
* `xhtml` — the same as `html`, but outputs empty elements with closed slash: `<br />`.
* `xml` — default for XML and XSL syntaxes: outputs each tag on new line with indentation, empty elements are outputted with closing slash: `<br/>`.
* `line` — used to output expanded abbreviation without any indentation and newlines. In some editors applies by default in programming languages like JavaScript or Python to produce valid strings.

### Create your own profile ###

You can specify a dictionary with the following keys to create your own output profile:

* `tag_case`: case of generated tag name, string. Possible values are `upper`, `lower` and `asis`.
* `attr_case`: case of attribute names of generated tags, string. Possible values are `upper`, `lower` and `asis`.
* `attr_quotes`: quotes around attribute values, string. Possible values are `single` and `double`.
* `tag_nl`: output each tag on new line with indentation, boolean. Values are `true` (each tag on new line), `false` (no formatting) and `'decide'` (string; only block-level elements on new lines).
* `tag_nl_leaf`: with `tag_nl` set to `true`, defines if leaf block-level node (e.g. node with no children) should have formatted line breaks inside.
* `indent`: indent tags on new lines, boolean.
* `inline_break`: how many inline elements should be to force line break, number. Default is `3`. For example, `span*2` will be expanded into `<span></span><span></span>`, but `span*3` will create three `<span>` elements, each on new line. Set this option to `0` to disable line breaks for inline elements.
* `self_closing_tag`: should empty elements—like `br` or `img`—be outputted with closing dash, boolean. Values are `true`, `false` and `'xhtml'` (string; output closing slash in XHTML style, e.g. `<br />`).
* `filters`: list of [filters](/filters/) to be applied automatically.