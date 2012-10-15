---
layout: page
title: Filters
menuOrder: 4
---
Filters are special post-processors that modifies expanded abbreviation right before output to the editor. To better understand how filters works, let’s walk through a simple tutorial.

Try to expand the following abbreviation in the editor below (use Tab key to expand abbreviation): `#content>p.title`

<textarea class="cm-box"></textarea>

As you may expect, it will be expanded into the following HTML code:

	<div id="content">
		<p class="title"></p>
	</div>

Now, try to expand this abbreviation: `#content>p.title|e`. You’ll have a slightly different result:

```xml
&lt;div id="content"&gt;
	&lt;p class="title"&gt;&lt;/p&gt;
&lt;/div&gt;
```

We’ve just applied `e` (escape) filter by appending its name after pipe character. This filter escaped all XML-unsafe symbols with entities right before Emmet sends output to the editor. Now, try this one:  `#content>p.title|e|e`:

```xml
&amp;lt;div id="content"&amp;gt;
	&amp;lt;p class="title"&amp;gt;&amp;lt;/p&amp;gt;
&amp;lt;/div&amp;gt;
```

We have a double-escaped code (e.g. we’ve applied `e` filter twice). As you can see, we can apply as many filters to abbreviation as we want, and as many times as we want.

Let’s do something more interesting. Try to expand this abbreviation: `#content>p.title|haml`

	#content
		%p.title

Isn’t it nice? We've just expanded abbreviation as a HAML template!

As you can see, filtering is a key concept of Emmet. To draw an analogy with the browser’s DOM model, every time you expand abbreviation it first gets transformed into a tree and then filter walk on each tree node and modifies its output. Filters can anything: from small tweaks as placing whitespace after CSS-rule to more complex tasks as outputting result in different syntax. Even HTML output is defined as `html` filter.

## Implicit filter call

You can apply filter to abbreviation explicitly, by adding pipe character and its name right after abbreviation. But filters also can be applied implicitly, depending on document type you're currently editing. You don’t want to append `|haml` every time you expand abbreviation in HAML document, right?

Default filters are defined in [snippets.json](https://github.com/sergeche/zen-coding/blob/v0.7.1/snippets.json) file in `filters` section of each syntax:

	{
		...
		"html": {
			...
			"filters": "html"
		}
	}

If there’s no such section, `html` filter is applied by default. If you want to apply more than one filter by default, you can write a comma- or pipe-separated list of filter names in `filters` section:
	
	{
		...
		"html": {
			...
			"filters": "html, e"
		}
	}

Now, every time you expand abbreviation in HTML document, `html` and `e` filters will be applied by default.

**But be careful!** You always have to place one of the syntax filter—`html` or `haml`—at first place of default filters in `snippets.json` file, otherwise you’ll have empty output because syntax filters are defining primary output result.

## Available filters

### HAML syntax: `haml`
HAML syntax filter: output abbreviation as HAML template. Applies by default for HAML files.

### HTML syntax: `html`
HTML syntax filter: output abbreviation as HTML/XML tags. Applies by default everywhere except HAML files.

### Escape: `e`
Escapes XML-unsafe characters: `<`, `>` and `&`. 

For example, `div#header|e` will be expanded into `&lt;div id="header"&gt;&lt;/div&gt;`. This filters will be extremely useful for tech bloggers/writers who wants to show code snippets on website (if you add Emmet support into you CMS, of course).

### Comment tags: `c`
Add comments around important tags. By default, “important tags” are those tags with `id` and/or `class` attribute.

	div>div#page>p.title+p|c

...will be expanded into

	<div>
		<div id="page">
			<p class="title"></p>
			<!-- /.title -->
			<p></p>
		</div>
		<!-- /#page -->
	</div>
	
This filter has a number of preferences you can re-define:

* `filter.commentTrigger`: list of attributes that should trigger comment output. Default value is `id, class`
* `filter.commentAfter`: a [ERB-style template](http://underscorejs.org/#template) of comment that should be placed right _after_ “important tag”. Default value is `\n<!-- /<%= attr("id", "#") %><%= attr("class", ".") %> -->`
* `filter.commentBefore`: a ERB-style template of comment that should be placed right _before_ “important tag”. Empty by default.

### XSL tuning: `xsl`
This filter removes `select` attribute from `<xsl:variable>` and `<xsl:with-param>` tags _if they have child nodes_. For example:

	ap>wp 

will be expanded into 

	<xsl:apply-templates select="" mode="">
		<xsl:with-param name="" select=""/>
	</xsl:apply-templates>

But

	ap>wp>call

...will be expanded into

	<xsl:apply-templates select="" mode="">
		<xsl:with-param name="">
			<xsl:call-template name=""/>
		</xsl:with-param>
	</xsl:apply-templates>

Applies by default in XSL files.

### Single line: `s`

Outputs transformed abbreviation as a single line of code. Useful for writing template strings in programming languages like JavaScript, Python, Ruby etc. For example:

`ul>li*4|s`

...will be expanded into

	<ul><li></li><li></li><li></li><li></li></ul>
	
### Trim line markers: `t`

Useful for wrapping abbreviations only: removes line markers from wrapped lines, as described in “[Wrap with Abbreviation](/actions/wrap-with-abbreviation/)” action.

