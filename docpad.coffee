path = require 'path'
safeps = require 'safeps'
exec = require('child_process').exec
hljs = require './plugins/highlight.js'

docpadConfig = {
	templateData:
		site:
			author: "Sergey Chikuyonok"
			name: "Emmet Docs & Tutorials"

	plugins:
		marked:
			markedOptions:
				sanitize: false
				highlight: (text, lang) ->
					result = if lang then hljs.highlight(lang, text) else hljs.highlightAuto(text)
					"<span class=\"#{result.language}\">#{result.value}</span>"
					

	environments:
		production:
			gulpArgs: ['--production']

	events:

		# Extend server so it can respond to cache-reset assets
		serverAfter: ({server}) ->
			reCache = /^\/-\/.+?\//
			server.get reCache, (req, res, next) ->
				req.url = req.url.replace reCache, '/'
				next()

		# Supply headers with named anchors
		renderDocument: (opts) ->
			{extension,file} = opts

			if file.type is 'document' and extension is 'html'
				opts.content = opts.content.replace /<(h\d)>(.+?)<\/\1>/g, (str, name, header) ->
					if /<a\s+[^>]*name="/.test(header)
						return str

					# strip tags
					# console.log header
					anchor = header.replace /<\/?\w+(?:\s.+?)*>/g, '';
					anchor = anchor
						.trim()
						.replace(/\s+/g, '-')
						.replace(/[^\w\-]/g, '')
						.toLowerCase()

					"<#{name}><a name=\"#{anchor}\" href=\"\##{anchor}\" class=\"anchor\"></a>#{header}</#{name}>"

		writeAfter: (opts, next) ->
			config = @docpad.getConfig()
			rootPath = config.rootPath
			gulpPath = path.join(rootPath, 'node_modules', '.bin', 'gulp')
			command = [gulpPath, 'full'].concat(config.gulpArgs or [])

			safeps.spawn(command, {cwd: rootPath, output: true}, next)
			@
}

module.exports = docpadConfig