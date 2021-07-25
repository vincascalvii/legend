/* ================================================================

	SEARCH BAR

================================================================ */

// Get the search bar and all the pokemon blocks
var searchBar = document.getElementById('search-bar');
var pokemons = document.querySelectorAll('.pokedex .block');

// Run the check when user enters an input
searchBar.onkeyup = function() {

	// Get the search term and convert it to lowercase
	var searchTerm = document.getElementById('search-bar').value;
	if ( searchTerm ) searchTerm.toLowerCase();

	// Run a loop through all the pokemon blocks' content
	// If it matches, display the blocks, otherwise, hide them
	for ( var i = 0; i < pokemons.length; i++ ) {
		pokemons[i].innerText.toLowerCase().indexOf(searchTerm) != -1
		? pokemons[i].classList.add('active')
		: pokemons[i].classList.remove('active');
	}
}