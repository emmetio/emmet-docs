exec = require('child_process').exec

docpadConfig = {
	templateData:
		site:
			author: "Sergey Chikuyonok"
			name: "Emmet Docs & Tutorials"

	plugins:
		marked:
			markedOptions:
				sanitize: false

	environments:
		debug:
			# Enable debug mode for frontend-assets plugin:
			# generates files with '-debug' suffix with
			# assets sources
			frontendDebug: true

	events:
		# Regenerate assets each time resources are changed
		generateBefore: (opts, next) ->
			proc = exec 'grunt', {cwd: process.cwd()}, (error, stdout, stderr) ->
				console.log stdout
				process.exit() if error

			proc.on 'exit', next

		# Extend server so it can respond to cache-reset assets
		serverAfter: ({server}) ->
			server.get /^\/\d+\/(c|j)\//, (req, res, next) ->
				req.url = req.url.replace /^\/\d+\//, '/'
				next()
}

module.exports = docpadConfig