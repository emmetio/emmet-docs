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


	# events:
	# 	extendTemplateData: ({templateData}) ->
	# 		templateData.menu = 'menu sample'
	# 		console.log 'Extending data', templateData
	# 		@

}

module.exports = docpadConfig