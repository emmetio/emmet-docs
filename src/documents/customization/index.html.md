---
layout: page
title: Customization
menuOrder: 5
---
Emmet offers wide range of tweaks you can use to fine-tune your plugin experience. Almost all officially developed editor plugins (except PSPad and browser-based) has **extensions support**: a special folder where you can put `json` and `js` files to extend Emmet. Please refer to README file bundled with your editor’s plugin to find out where Emmet looks for extensions.

Each `.js` file located in extensions folder will be loaded and executed on plugin start-up. Use `js` files to create your own [filters](/filters/) or [actions](/actions/): you can use Emmet modules and bindings to script your editor with JavaScript.

With `.json` files you can fine-tune different parts of Emmet toolkit:

<dl>
	<dt>[snippets.json](./snippets/)</dt>
	<dd>Add your own or update existing snippets</dd>
	<dt>[preferences.json](./preferences/)</dt>
	<dd>Change behavior of some Emmet filters and actions</dd>
	<dt>[syntaxProfiles.json](./syntax-profiles/)</dt>
	<dd>Define how generated HTML/XML should look.</dd>
</dl>