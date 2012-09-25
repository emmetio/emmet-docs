_ = require 'underscore'

class MenuItem
	constructor: (@slug='', @document=null) ->
		@children = []
		@parent = null

	add: (slug, document) ->
		# recursively add elements to menu:
		# split slug by '/' and create all intermediate elements
		parts = slug.split '/'
		if not parts[0]
			parts.shift()

		childSlug = parts.shift()
		throw "Invalid slug: #{slug}" unless childSlug
		childItem = @childBySlug childSlug

		unless childItem?
			childItem =  new MenuItem childSlug, if parts.length then document else null
			@children.push childItem
			childItem.parent = @

		if parts.length
			return childItem.add parts.join('/'), document

		childItem

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
		return 'parent'  if curUrl and curUrl.indexOf(url) == 0
		return false

	toJSON: (options={}) ->
		output = {
			title: @title()
			url: @url()
			hasDocument: @document?
			state: @activeState options.url
		}

		children = _.clone @children

		if options.optimize
			# If 'optimize' option is chosen, we should remove
			# any leaf item that contains 'index.*' slug and
			# mark current one that it has document
			reIndex = /^index\.\w+$/i
			children = _.reject children, (item) ->
				if item.isLeaf() and reIndex.test item.slug
					output.title = item.title()
					output.hasDocument = item.document?
					return true

				return false

		if children.length
			output.children = item.toJSON options for item in children

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
			# @docpad.log "DC collection: #{@docpad.getCollection('documents').toJSON()}"
			# @docpad.log "Rendering #{JSON.stringify templateData}"

	
