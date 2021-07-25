/* ================================================================

	SEARCH BAR

================================================================ */

var searchBar = document.getElementById('#search-bar');
var searchTerm = document.getElementById('#search-bar').value.toLowerCase();
var pokemons = document.querySelectorAll('.pokedex .block');

searchBar.onkeyup = function() {
	console.log(searchTerm);
	console.log(pokemons.innterText);
	for ( var i = 0; i < pokemons.length; i++ ) {
		pokemons[i].innerText.toLowerCase().indexOf(searchTerm) != -1
		? pokemons[i].classList.add('active')
		: pokemons[i].classList.remove('active');
	}
}