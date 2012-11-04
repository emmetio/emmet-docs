# Menu plugin for DocPad
# This plugin takes a plain list of document files and creates structured menu.
# The 'templateData' object is extended with `generateMenu(url)` which
# takes passed URL (in most cases, the URL of rendered document) and generates menu
# aginst it. Each menu item contains `state` property that holds highlighting state
# of item. 
# Possible values:
# – 'current': item is a currently viewed document
# – 'parent': item contains currently viewed document
# – false: regular item
# 
# Each document meta data can be supplied with the following properties:
# menuTitle: String. Title of menu item. If not defined, `title` property is used
# menuHidden: Boolean. Should current item and its children appear in menu
# menuOrder: Number. Order of item in its parent. Sorting is ascending.
_ = require('underscore')

reIndex = /^index\.\w+$/i

class MenuItem
	constructor: (@slug='', @document, @parent) ->
		@children = []
		@sortOrder = 0
		if @parent?
			parent.children.push @

		if @document?.menuOrder?
			@sortOrder = parseFloat @document.menuOrder

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

		return 'current' if curUrl == url || @document?.url == url
		return 'parent'  if url and url.indexOf(curUrl) == 0
		return false

	submenu: (options) ->
		filterItems = (items) ->
			filtered = []

			for item in items
				if item.hidden or (options.optimize and reIndex.test(item.slug))
					continue
				if options.skipFiles.test(item.slug)
					continue
				if options.skipEmpty and not item.hasDocument
					if item.children?
						subitems = filterItems item.children
						# sort items
						subitems.sort (a, b) ->
							a.order - b.order

						subitems.forEach (si, ix) ->
							si.order = item.order + ix / 1000

						filtered = filtered.concat subitems
				else
					filtered.push item
					if item.children?
						item.children = filterItems(item.children)

			_.compact(filtered).sort (a, b) ->
				a.order - b.order


		filterItems(item.toJSON(options) for item in @children)

	toJSON: (options={}) ->
		output = {
			title: @title()
			url: @url()
			slug: @slug
			hasDocument: @document?
			state: @activeState options.url
			hidden: @document?.menuHidden
			order: @sortOrder
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
					output.order = item.sortOrder
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

		config:
			menuOptions:
				# Optimize menu structures: items like /about/index.html will be omitted
				# in favour of parent’s /about/ item
				optimize: true

				# Remove indermediate items from menu structure that has no content
				skipEmpty: true

				# Regular expression to skip files
				skipFiles: /index\-debug\./i

		extendTemplateData: ({templateData}) ->
			docpad = @docpad
			config = @config
			templateData.generateMenu = (url) ->
				if config.menuOptions.optimize
					url = url.replace /\/index\.\w+$/i, '/'

				rootItem = new MenuItem
				rootItem.add doc for doc in docpad.getCollection('documents').toJSON()
				rootItem.submenu(_.extend {url: url}, config.menuOptions)



if not module.parent
	# Do some tests
	console.log "Testing"
	data = [
		{title: 'Main', url: '/index.html'},
		{title: 'About', url: '/about/index.html'},
		{title: 'About 3', url: '/about/index3.html'},
		{title: 'Company', url: '/about/company/index.html'},
		{title: 'Contacts', url: '/about/company/contacts.html'},
		{title: 'deep 1', url: '/very/deeply/nested/item/index.html'},
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

		indent + item.url + mark  + " (#{item.order})" + '\n' + (printItem si, indent + '\t' for si in item.children || []).join('')

	# console.log printItem(json)
	for item in rootItem.submenu({skipEmpty: true, optimize: true, url: '/about/company/'})
		console.log(printItem item)

