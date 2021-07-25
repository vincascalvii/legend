/* ================================================================

	SEARCH BAR

================================================================ */

var searchBar = document.getElementById('#search-bar');
var pokemons = document.querySelectorAll('.pokedex .block');

searchBar.onkeyup = function() {
	var searchTerm = document.getElementById('#search-bar').value;
	if ( searchTerm ) searchTerm.toLowerCase();
	console.log(searchTerm);
	console.log(pokemons.innterText);
	for ( var i = 0; i < pokemons.length; i++ ) {
		pokemons[i].innerText.toLowerCase().indexOf(searchTerm) != -1
		? pokemons[i].classList.add('active')
		: pokemons[i].classList.remove('active');
	}
}