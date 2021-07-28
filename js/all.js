/* ================================================================

	POKEDEX

================================================================ */

// Fetch the data
fetch('/legend/data/all/all.json')
.then( response => {
	if (!response.ok) throw new Error("HTTP error " + response.status);
    return response.json();
})
.then( data => {

	console.log(data);

	var container = document.querySelector('.pokedex .container');

	for ( var i = 0; i < data.length; i++ ) {

		var number = document.createElement('p');
			number.classList.add('number');
			number.innerHTML = data[i]['number'];

		var name = document.createElement('p');
			name.classList.add('name');
			name.innerHTML = data[i]['name'];

		var type = document.createElement('div');
			type.classList.add('types');
			type.innerHTML = data[i]['type'];

		var info = document.createElement('div');
			info.classList.add('info');
			info.appendChild(number);
			info.appendChild(name);
			info.appendChild(type);

		var image = document.createElement('picture');
			image.innerHTML = '<source srcset="/legend/img/pokemon/' + data[i]['number'] 
							+ '/' + data[i]['image_1'] + '.webp 1x, '
							+ '/legend/img/pokemon/' + data[i]['number'] 
							+ '/' + data[i]['image_2'] + '.webp 2x, '
							+ '/legend/img/pokemon/' + data[i]['number'] 
							+ '/' + data[i]['image_3'] + '.webp 3x" type="image/webp">'
							+ '<img src="/legend/img/pokemon/' + data[i]['number'] 
							+ '/' + data[i]['image_1'] + '.png 1x, '
							+ '/legend/img/pokemon/' + data[i]['number'] 
							+ '/' + data[i]['image_2'] + '.png 2x, '
							+ '/legend/img/pokemon/' + data[i]['number'] 
							+ '/' + data[i]['image_3'] + '.png 3x" class="image '
							+ 'image-' + data[i]['image_1'] + '" alt="' 
							+ data[i]['name'] + '">';


		var background = document.createElement('picture');
			background.innerHTML = '<source srcset="/legend/img/others/pokedex-corner-200x200.webp 1x, '
								 + '/legend/img/others/pokedex-corner-400x400.webp 2x, '
								 + '/legend/img/others/pokedex-corner-600x600.webp 3x" '
								 + 'type="image/webp">'
								 + '<img src="/legend/img/others/pokedex-corner-200x200.png 1x, '
								 + '/legend/img/others/pokedex-corner-400x400.png 2x, '
								 + '/legend/img/others/pokedex-corner-600x600.png 3x" '
							 	 + 'class="background" alt="Pokeball background">';

		var block = document.createElement('a');
			block.href = '/legend/pokemon?no=' + data[i]['number'];
			block.classList.add('block', 'active');
			block.setAttribute('aria-label', data[i]['name']);
			block.appendChild(info);
			block.appendChild(image);
			block.appendChild(background);

		container.appendChild(block);

	}

	activateSearch();

})
.catch( function(error) {
	console.log('Fetch error: ', error);
});




/* ================================================================

	SEARCH BAR

================================================================ */

function activateSearch() {

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

}