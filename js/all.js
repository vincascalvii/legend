/* ================================================================

	ALL - DEX
	
================================================================ */

// Fetch the data
fetch('/legend/data/all.json')
.then(function(response) {
	if (!response.ok) throw new Error("HTTP error " + response.status);
    return response.json();
})
.then(function(data) {

	// Get the container
	var container = document.querySelector('.dex .container');

	// Loop through the data to populate
	for (var i = 0; i < data.length; i++) {
		let dbNum = data[i]['number'];
		let dbName = data[i]['name'];
		let dbAttr1 = data[i]['attr_1'];
		let dbAttr2 = data[i]['attr_2'];

		// Populate the number
		var number = document.createElement('p');
			number.classList.add('number');
			number.innerHTML = '#' + dbNum;

		// Populate the name
		var name = document.createElement('p');
			name.classList.add('name');
			name.innerHTML = dbName;

		// Populate the typings
		var type = document.createElement('div');
			type.classList.add('types');
			type.innerHTML = '<span class="type ' + dbAttr1.toLowerCase() + '">' 
						   + dbAttr1 + '</span>';

		// Add 2nd type if exist
		if (dbAttr2 !== '' && dbAttr2 !== null) {
			type.innerHTML += '<span class="type ' + dbAttr2.toLowerCase() + '">' 
						   + dbAttr2 + '</span>';
		}

		// Append them all to the block
		var info = document.createElement('div');
			info.classList.add('info');
			info.appendChild(number);
			info.appendChild(name);
			info.appendChild(type);

		// Populate the thumbnail
		var image = document.createElement('img');
			image.src = '/legend/img/lumies/' + dbNum + '/thumb-480x360.png';
			image.alt = dbName;
			image.classList.add('image');

		// Populate the block background
		var background = document.createElement('picture');
			background.innerHTML = 
				'<source data-srcset="/legend/img/others/corner-200x200.webp 1x, ' + 
				'/legend/img/others/corner-400x400.webp 2x, ' + 
				'/legend/img/others/corner-600x600.webp 3x" ' + 
				'type="image/webp">' + 
				'<source data-srcset="/legend/img/others/corner-200x200.png 1x, ' + 
				'/legend/img/others/corner-400x400.png 2x, ' + 
				'/legend/img/others/corner-600x600.png 3x" ' + 
				'type="image/png><img data-src="/legend/img/others/corner-200x200.png" ' +
				'src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" ' +
				'class="background lazyload" alt="Corner background">';

		// Append all the above to the block and add link to detail page
		var block = document.createElement('a');
			block.href = '/legend/detail?num=' + dbNum;
			block.classList.add('block');
			block.classList.add('active');
			block.setAttribute('aria-label', dbName);
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
.catch(function(error) {
	console.log('Fetch error: ', error);
});

/* ================================================================

	SEARCH BAR

================================================================ */

function activateSearch() {

	// Get the search bar and all the blocks
	var searchBar = document.getElementById('search-bar');
	var lumies = document.querySelectorAll('.dex .block');

	// Run the check when user enters an input
	searchBar.onkeyup = function() {

		// Get the search term and convert it to lowercase
		var searchTerm = document.getElementById('search-bar').value;
		if (searchTerm) searchTerm.toLowerCase();

		// Run a loop through all the blocks' content
		// If it matches, display the blocks, otherwise, hide them
		for (var i = 0; i < lumies.length; i++) {
			lumies[i].innerText.toLowerCase().indexOf(searchTerm) != -1
			? lumies[i].classList.add('active')
			: lumies[i].classList.remove('active');
		}
	}
}