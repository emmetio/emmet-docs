_ = require('underscore')
fs = require 'fs'

catalogFile = '.build-catalog.json'

catalog = null

getCatalog = () ->
	return catalog if catalog
	if fs.existsSync catalogFile
		try
			catalog = JSON.parse fs.readFileSync catalogFile, 'utf8'
		catch e

	return catalog

# Splits string into array
makeList = (str) ->
	if _.isString str
		_.compact str.split /\s*,\s*/
	str

grabResources = (collection, prefix) ->
	res = {}
	re = new RegExp('^' + prefix + '(\\d+)?$')
	for k, v of collection
		if re.test k
			res[k] = v
	return res


# Collects all resources from document model (transformed document and its layouts)
# with specified prefix
collectResources = (documentModel, prefix) ->
	files = [grabResources documentModel.getMeta().toJSON(), prefix]

	# grab resources from layouts
	ctx = documentModel
	while ctx.hasLayout()
		ctx = ctx.layout
		files.push grabResources ctx.getMeta().toJSON(), prefix

	# merge all resource into a singe set
	res = {}
	while r = files.pop()
		_.extend res, r

	# expand all assets
	assets = for k, v of res
		order = -1
		if m = /(\d+)$/.test(k)
			order = parseInt m[1]
		{
			order: order
			files: makeList v
		}

	assets.sort (a, b) ->
		a.order - b.order

	assets = _.flatten assets.map (item) ->
		item.files

	_.uniq _.compact assets


# Export Plugin
module.exports = (BasePlugin) ->
	# Define Plugin
	class FrontendAssetsPlugin extends BasePlugin
		# Plugin name
		name: 'frontend-assets'

		config:
			frontendAssetsOptions:
				# Defines how file cache should be reseted:
				# false – do not reset cache
				# 'date' – reset cache by appending 'date' catalog property to url
				# 'md5' — reset cache by appending 'md5' catalog property to url
				cacheReset: 'date'

				# Method that transforms resource url by inserting cache reset token
				urlTransformer: (url, cacheToken) ->
					return "/#{cacheToken}#{url}" if cacheToken? and url.charAt(0) == '/'
					return url

		contextualizeBefore: ({collection}, next) ->
			if @docpad.getConfig().frontendDebug
				collection.forEach (file) ->
					if file.type is 'document' and not /\-debug$/.test file.get('basename')
						file.set('basename', file.get('basename') + '-debug')

			next()

		generateBefore: (opts, next) ->
			catalog = null
			next()


		extendTemplateData: ({templateData}) ->
			docpad = @docpad
			config = @config.frontendAssetsOptions

			getAssets = (model, prefix) ->
				res = collectResources model, prefix
				cacheToken = config.cacheReset or ''
				isDebug = docpad.getConfig().frontendDebug
				catalog = getCatalog()

				_.flatten res.map (item) ->
					if item of catalog
						r = catalog[item]
						if isDebug
							if prefix is 'css'
								return r.files[0]
							else
								return _.map r.files, (f) ->
									f.file

						return config.urlTransformer item, r[cacheToken]

					item

			# list of specified assets: css, js etc
			templateData.assets = (type) ->
				getAssets @documentModel, type

