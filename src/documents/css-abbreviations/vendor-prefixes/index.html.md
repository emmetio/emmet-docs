---
layout: page
title: Vendor prefixes
menuOrder: 1
---
New CSS3 features are blessing for web-developers: with a few lines of code we can do things that were nearly impossible few years ago. But these features are also a real pain for us: we have to write the same property many times for different browsers. 

Emmet’s CSS resolver has a nice feature that can greatly improve your CSS3 experience. Every time you precede CSS property or its abbreviation with hyphen, Emmet automatically creates vendor-prefixed copies of this property. For example, `-bdrs` abbreviation will be expanded into

```css
-webkit-border-radius: ;
-moz-border-radius: ;
border-radius: ;
```

Moreover, in editors with tabstops support (Eclipse, Sublime Text 2, Espresso etc.) Emmet will create a linked value placeholder so you can type a property value and it will be automatically placed in all generated properties.

## How it works?

Whenever you expand abbreviation with hyphen in front of it, Emmet removes hyphen and looks for a snippet definition in `snippets.json` for the rest of the abbreviation. For example, for `-bdrs` abbreviation it will look for a `bdrs` definition. `snippet.json` has the following definition:

	"bdrs": "border-radius:|;"
	
...which means that `bdrs` will be expanded into `border-radius` property. If no definition found, abbreviation itself will be used as a CSS property name.

After CSS resolver figures out a property name that should be outputted, it will look for its occurrence in special _vendor catalogs_. These catalogs are defined as `css.{vendor}Properties` entries in preferences and can be overridden by user. `{vendor}` is a browser’s vendor prefix, for example, `webkit`, `moz` etc.

If expanded property was found in any of these catalogs, their vendor prefixes will be used to produce prefixed properties. Otherwise, _all prefixes_ will be used.

For example, the `border-radius` property is defined in `css.webkitProperties` and `css.mozProperties` so this property will be outputted with `webkit` and `moz` prefixes. On the other hand, a `foo` property isn’t defined anywhere so it will be outputted with all available prefixes when you expand `-foo` abbreviation: `webkit`, `moz`, `ms` and `o`. It is especially helpful for using cutting-edge CSS properties that were recently implemented.

Imagine that Google Chrome implemented `super-foo` property yesterday and you want to use it in your project. You can expand `-super-foo` abbreviation which results to the following snippet:

```css
-webkit-super-foo: ;
-moz-super-foo: ;
-ms-super-foo: ;
-o-super-foo: ;
super-foo: ;
```

## Add prefixed properties by default

While writing CSS files, you may find that a “clear” CSS3 property is useless without its vendor-prefixed variants.  It makes writing hyphenated abbreviations like `-trf` (`trf` is an alias to `transform` property) a bit awkward.

This is why Emmet has `css.autoInsertVendorPrefixes` preference enabled by default. With this preference enabled, all CSS properties defined in vendor catalogs will be automatically supplied with matched vendor-prefixed variants.

It means that you don’t need to use hyphen to get valid prefixed variants for known CSS properties, simply expand abbreviations like `bdrs` or `trf` to get valid list of vendor-prefixed properties.

## Explicit vendor prefixed

Sometimes you may want to output CSS properties with specified vendor prefixed properties only. 

Let’s say you want to output `transform` property with `webkit` and `moz` prefixes only. In this case you can expand the following abbreviation:

	-wm-trf
	
As you can see, we slightly modified abbreviation by adding a list of one-letter prefixes. In this case, these are `w` (`webkit`) and `m` (`moz`) prefixes. Emmet has the following one-letter prefixes:

* `w`: `webkit`
* `m`: `moz`
* `s`: `ms`
* `o`: `o`