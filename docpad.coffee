docpadConfig = {
	templateData:
		site:
			author: "Sergey Chikuyonok"
			name: "Emmet Docs & Tutorials"

	plugins:
		marked:
			markedOptions:
				sanitize: false

	# events:
	# 	extendTemplateData: ({templateData}) ->
	# 		templateData.menu = 'menu sample'
	# 		console.log 'Extending data', templateData
	# 		@

}

module.exports = docpadConfig