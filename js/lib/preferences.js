import {template, delegate} from './utils';
import {emmet} from './movie';

function generatePreferencesTable() {
	var prefs = emmet.preferences.list();
	var row = template(`<tr> 
		<td>
			<span class="emmet-preferences__name"><%= name %></span>
			<div class="emmet-preferences__desc"><%= description %></div>
		</td>
		<td>
			<span class="emmet-preferences__value"><%- value %></span>
		</td>
	</tr>`);

	return `<table class="emmet-preferences__list">${prefs.map(item => row(item)).join('')}</table>`;
}

export default function(elem) {
	elem.innerHTML = generatePreferencesTable();
	delegate(elem, '.emmet-preferences__value', evt => elem.classList.toggle('emmet-preferences__value_full'))
}