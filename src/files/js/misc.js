;$(function() {
	function generatePreferencesTable() {
		var prefs = emmet.require('preferences').list();
		var row = _.template('<tr>' 
			+ '<td>' 
			+ '<span class="emmet-preferences__name"><%= name %></span>' 
			+ '<div class="emmet-preferences__desc"><%= description %></div>' 
			+ '</td><td>' 
			+ '<span class="emmet-preferences__value"><%= value %></span>' 
			+ '</td></tr>');
		var output = '<table class="emmet-preferences__list">' ;
		_.each(prefs, function(item) {
			output += row(item);
		});

		return output + '</table>';
	}

	$('.emmet-preferences').each(function() {
		$(this)
			.html(generatePreferencesTable())
			.on('click', '.emmet-preferences__value', function() {
				$(this).toggleClass('emmet-preferences__value_full');
			});
	});
});