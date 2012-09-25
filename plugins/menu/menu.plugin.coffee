_ = require('underscore')

reIndex = /^index\.\w+$/i

class MenuItem
	constructor: (@slug='', @document, @parent) ->
		@children = []
		if @parent?
			parent.children.push @

	add: (document) ->
		# recursively add elements to menu:
		# split url by '/' and create all intermediate elements
		parts = document.url.replace(/^\//, '').split('/')
		slug = parts.pop()
		ctx = @

		while m = parts.shift()
			item = ctx.childBySlug m
			if not item
				item = new MenuItem m, null, ctx

			ctx = item

		throw "Item duplicate: #{document.url}" if ctx.childBySlug slug

		child = new MenuItem slug, document, ctx

	childBySlug: (slug) ->
		_.find @children, (item) ->
			item.slug == slug

	# Outputs title of current menu item or 'null' if item doesn't exists
	title: ->
		@document?.menuTitle or @document?.title or null

	# Outputs path to current menu item
	url: ->
		url = @slug
		item = @
		while item = item.parent
			url = item.slug + '/' + url

		url = '/' + url if url.charAt(0) != '/'
		url += '/' if not @isLeaf() and not /\/$/.test(url)

		return url

	isLeaf: ->
		not @children.length

	# Resolves activity state of current item against passed url.
	# Possibe values:
	# false — item is not active
	# 'current' – item is a currently viewed document
	# 'parent' — item contains currently viewed document
	activeState: (url='') ->
		curUrl = @url()
		return 'current' if curUrl == url
		return 'parent'  if url and url.indexOf(curUrl) == 0
		return false

	submenu: (options) ->
		filterItems = (items) ->
			filtered = []
			for item in items
				if options.optimize and reIndex.test(item.slug)
					continue
				if options.skipEmpty and not item.hasDocument
					filtered = filtered.concat(filterItems item.children) if item.children?
				else
					filtered.push item
					if item.children?
						item.children = filterItems(item.children)

			_.compact filtered

		filterItems(item.toJSON(options) for item in @children)

	toJSON: (options={}) ->
		output = {
			title: @title()
			url: @url()
			slug: @slug
			hasDocument: @document?
			state: @activeState options.url
		}

		children = _.clone @children

		if options.optimize
			# If 'optimize' option is chosen, we should remove
			# any leaf item that contains 'index.*' slug and
			# mark current one that it has document
			children = _.reject children, (item) ->
				if item.isLeaf() and reIndex.test item.slug
					output.title = item.title()
					output.hasDocument = item.document?
					return true

				return false

		if children.length
			output.children = (item.toJSON options for item in children)

		output

	toString: (indent='') ->
		indent + @url() + '\n' + (child.toString indent + '\t' for child in @children).join('')


# Export Plugin
module.exports = (BasePlugin) ->
	# Define Plugin
	class MenuPlugin extends BasePlugin
		# Plugin name
		name: 'menu'

		renderBefore: ({collection, templateData}) ->
			docs = @docpad.getCollection('documents').toJSON()
			rootItem = new MenuItem
			rootItem.add doc.url, doc for doc in docs

			@docpad.log rootItem.toJSON()


if not module.parent
	# Do some tests
	console.log "Testing"
	data = [
		{title: 'Main', url: '/index.html'},
		{title: 'About', url: '/about/index.html'},
		{title: 'About 3', url: '/about/index3.html'},
		{title: 'Company', url: '/about/company/index.html'},
		{title: 'Contacts', url: '/about/company/contacts.html'}
		# {title: 'deep 1', url: '/very/deeply/nested/item/index.html'},
	]

	rootItem = new MenuItem
	for item in data
		rootItem.add item

	json = rootItem.toJSON({})

	printItem = (item, indent='') ->
		mark = ''
		if item.state == 'current'
			mark = '*'
		else if item.state
			mark = '^'

		indent + item.url + mark + '\n' + (printItem si, indent + '\t' for si in item.children || []).join('')

	# console.log printItem(json)
	for item in rootItem.submenu({skipEmpty: true, optimize: true, url: '/about/company/'})
		console.log(printItem item)

