/* ================================================================

	POKEDEX

================================================================ */

// Fetch the data
fetch('/legend/data/all.json')
.then( function(response) {
	if (!response.ok) throw new Error("HTTP error " + response.status);
    return response.json();
})
.then( function(data) {

	// Get the pokedex container
	var container = document.querySelector('.pokedex .container');

	// Loop through the data to populate
	for ( var i = 0; i < data.length; i++ ) {

		// Populate the number
		var number = document.createElement('p');
			number.classList.add('number');
			number.innerHTML = '#' + data[i]['number'];

		// Populate the name
		var name = document.createElement('p');
			name.classList.add('name');
			name.innerHTML = data[i]['name'];

		// Populate the typings
		var type = document.createElement('div');
			type.classList.add('types');
			type.innerHTML = '<span class="type ' + data[i]['type_1'].toLowerCase() + '">' 
						   + data[i]['type_1'] + '</span>';

		// Add 2nd type if exist
		if ( data[i]['type_2'] != '' && data[i]['type_2'] != null ) {
			type.innerHTML += '<span class="type ' + data[i]['type_2'].toLowerCase() + '">' 
						   + data[i]['type_2'] + '</span>';
		}

		// Append them all to the pokemon block
		var info = document.createElement('div');
			info.classList.add('info');
			info.appendChild(number);
			info.appendChild(name);
			info.appendChild(type);

		// Populate the thumbnail
		var image = document.createElement('img');
			image.src = '/legend/img/pokemon/' + data[i]['number'] + '/thumb-480x360.png';
			image.alt = data[i]['name'];
			image.classList.add('image');

		// Populate the block background
		var background = document.createElement('picture');
			background.innerHTML = 
				'<source data-srcset="/legend/img/others/pokedex-corner-200x200.webp 1x, ' + 
				'/legend/img/others/pokedex-corner-400x400.webp 2x, ' + 
				'/legend/img/others/pokedex-corner-600x600.webp 3x" ' + 
				'type="image/webp">' + 
				'<source data-srcset="/legend/img/others/pokedex-corner-200x200.png 1x, ' + 
				'/legend/img/others/pokedex-corner-400x400.png 2x, ' + 
				'/legend/img/others/pokedex-corner-600x600.png 3x" ' + 
				'type="image/png><img data-src="/legend/img/others/pokedex-corner-200x200.png" ' +
				'src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" ' +
				'class="background lazyload" alt="Pokeball background">';

		// Append all the above to the pokemon block and add link to detail page
		var block = document.createElement('a');
			block.href = '/legend/detail?no=' + data[i]['number'];
			block.classList.add('block');
			block.classList.add('active');
			block.setAttribute('aria-label', data[i]['name']);
			block.appendChild(info);
			block.appendChild(image);
			block.appendChild(background);

		// Add block to the container
		container.appendChild(block);

	}

	// Start the search function after all the blocks are populated
	// The reason for this is so that the search results become more accurate
	// Otherwise, some of the blocks may not have been fully rendered so search won't work
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