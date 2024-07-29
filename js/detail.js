/* ================================================================

	DETAIL

================================================================ */

// Get the Legend number from URL query
var no = getParameter('no');
if ( no != '' && no != null ) {

	// Fetch the data
	fetch('/legend/data/detail/' + no + '.json')
	.then( function(response) {
		if (!response.ok) throw new Error("HTTP error " + response.status);
	    return response.json();
	})
	.then( function(data) {

		// Change background colour
		document.querySelector('main').classList.add(data[0]['types'][0].toLowerCase());

		// Populate name
		document.querySelector('.name').innerHTML = data[0]['name'];

		// Populate typings
		document.querySelector('.types span:first-child').innerHTML = data[0]['types'][0];
		document.querySelector('.types span:first-child').classList.add(
			data[0]['types'][0].toLowerCase()
		);
		if ( data[0]['types'][1] != '' && data[0]['types'][1] != null ) {
			var type2 = document.createElement('span');
				type2.classList.add('type', data[0]['types'][1].toLowerCase());
				type2.innerHTML = data[0]['types'][1];
			document.querySelector('.types').appendChild(type2);
		}

		// Populate number
		document.querySelector('.number').innerHTML = data[0]['number'];

		// Populate image
		document.querySelector('.image').innerHTML +=
			'<picture>' +
			'<source data-srcset="/legend/img/pokemon/' + no + '/full-500x500.webp" ' +
			'media="(min-width: 1024px)" type="image/webp">' +
			'<source data-srcset="/legend/img/pokemon/' + no + '/full-500x500.png" ' +
			'media="(min-width: 1024px)" type="image/png">' +
			'<source data-srcset="/legend/img/pokemon/' + 
			no + '/full-300x300.webp 1x, /legend/img/pokemon/' +
			no + '/full-600x600.webp 2x, /legend/img/pokemon/' +
			no + '/full-900x900.webp 3x" ' +
			'media="(max-width: 1023px)" type="image/webp">' +
			'<source data-srcset="/legend/img/pokemon/' + 
			no + '/full-300x300.png 1x, /legend/img/pokemon/' +
			no + '/full-600x600.png 2x, /legend/img/pokemon/' +
			no + '/full-900x900.png 3x" ' +
			'media="(max-width: 1023px)" type="image/png">' +
			'<img data-src="/legend/img/pokemon/' + no + '/full-500x500.png" ' + 
			'src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"' + 
			' class="lazyload image-normal active" alt="' + data[0]['name'] + '">' +
			'</picture>';

		// Populate abilities
		document.querySelector('.ability-1 .ability-name').innerHTML = data[0]['abilities'][0]['name'];
		document.querySelector('.ability-1 .ability-desc').innerHTML = data[0]['abilities'][0]['desc'];
		document.querySelector('.ability-2 .ability-name').innerHTML = data[0]['abilities'][1]['name'];
		document.querySelector('.ability-2 .ability-desc').innerHTML = data[0]['abilities'][1]['desc'];

		// Populate description
		document.querySelector('.description').innerHTML = data[0]['description'];

		// Populate additional details
		document.querySelector('.additional-male-value').innerHTML = data[0]['gender']['male'];
		document.querySelector('.additional-female-value').innerHTML = data[0]['gender']['female'];
		document.querySelector('.additional-species .additional-value').innerHTML = 
			data[0]['species'];
		document.querySelector('.additional-weight .additional-value').innerHTML = 
			data[0]['weight'];
		document.querySelector('.additional-height .additional-value').innerHTML = 
			data[0]['height'];

		// Populate stats
		document.querySelector('.stat-hp .stat-value').innerHTML = data[0]['stats']['hp'];
		document.querySelector('.stat-atk .stat-value').innerHTML = data[0]['stats']['atk'];
		document.querySelector('.stat-def .stat-value').innerHTML = data[0]['stats']['def'];
		document.querySelector('.stat-spa .stat-value').innerHTML = data[0]['stats']['spa'];
		document.querySelector('.stat-spd .stat-value').innerHTML = data[0]['stats']['spd'];
		document.querySelector('.stat-spe .stat-value').innerHTML = data[0]['stats']['spe'];
		document.querySelector('.stat-total .stat-value').innerHTML = data[0]['stats']['total'];

		// Populate stat bars
		document.querySelector('.stat-hp .stat-bar-fill').style.width = 
			(( parseInt(data[0]['stats']['hp']) / 150 ) * 100 ) + '%';
		document.querySelector('.stat-atk .stat-bar-fill').style.width = 
			(( parseInt(data[0]['stats']['atk']) / 150 ) * 100 ) + '%';
		document.querySelector('.stat-def .stat-bar-fill').style.width = 
			(( parseInt(data[0]['stats']['def']) / 150 ) * 100 ) + '%';
		document.querySelector('.stat-spa .stat-bar-fill').style.width = 
			(( parseInt(data[0]['stats']['spa']) / 150 ) * 100 ) + '%';
		document.querySelector('.stat-spd .stat-bar-fill').style.width = 
			(( parseInt(data[0]['stats']['spd']) / 150 ) * 100 ) + '%';
		document.querySelector('.stat-spe .stat-bar-fill').style.width = 
			(( parseInt(data[0]['stats']['spe']) / 150 ) * 100 ) + '%';

		// Populate major weakness
		if ( data[0]['major_weakness'].length > 0 ) {
			document.querySelector('.condition-major-weakness').innerHTML =
				'<h3 class="condition-label">Major Weakness (x4)</h3>';
			var majorWeakness = document.createElement('div');
				majorWeakness.classList.add('condition-types');
			for ( var mw = 0; mw < data[0]['major_weakness'].length; mw++ ) {
				majorWeakness.innerHTML += '<span class="type '  + 
					data[0]['major_weakness'][mw].toLowerCase() +  '">' + 
					data[0]['major_weakness'][mw] + '</span>';
			}
			document.querySelector('.condition-major-weakness').appendChild(majorWeakness);
		}

		// Populate weakness
		if ( data[0]['weakness'].length > 0 ) {
			document.querySelector('.condition-weakness').innerHTML =
				'<h3 class="condition-label">Weakness (x2)</h3>';
			var weakness = document.createElement('div');
				weakness.classList.add('condition-types');
			for ( var w = 0; w < data[0]['weakness'].length; w++ ) {
				weakness.innerHTML += '<span class="type '  + 
					data[0]['weakness'][w].toLowerCase() +  '">' + 
					data[0]['weakness'][w] + '</span>';
			}
			document.querySelector('.condition-weakness').appendChild(weakness);
		}

		// Populate resistance
		if ( data[0]['resistance'].length > 0 ) {
			document.querySelector('.condition-resistance').innerHTML =
				'<h3 class="condition-label">Resistance (x½)</h3>';
			var resistance = document.createElement('div');
				resistance.classList.add('condition-types');
			for ( var r = 0; r < data[0]['resistance'].length; r++ ) {
				resistance.innerHTML += '<span class="type '  + 
					data[0]['resistance'][r].toLowerCase() +  '">' + 
					data[0]['resistance'][r] + '</span>';
			}
			document.querySelector('.condition-resistance').appendChild(resistance);
		}

		// Populate major resistance
		if ( data[0]['major_resistance'].length > 0 ) {
			document.querySelector('.condition-major-resistance').innerHTML =
				'<h3 class="condition-label">Major Resistance (x¼)</h3>';
			var majorResistance = document.createElement('div');
				majorResistance.classList.add('condition-types');
			for ( var mr = 0; mr < data[0]['major_resistance'].length; mr++ ) {
				majorResistance.innerHTML += '<span class="type '  + 
					data[0]['major_resistance'][mr].toLowerCase() +  '">' + 
					data[0]['major_resistance'][mr] + '</span>';
			}
			document.querySelector('.condition-major-resistance').appendChild(majorResistance);
		}

		// Populate immunity
		if ( data[0]['immunity'].length > 0 ) {
			document.querySelector('.condition-immunity').innerHTML =
				'<h3 class="condition-label">Immunity (x0)</h3>';
			var immunity = document.createElement('div');
				immunity.classList.add('condition-types');
			for ( var im = 0; im < data[0]['immunity'].length; im++ ) {
				immunity.innerHTML += '<span class="type '  + 
					data[0]['immunity'][im].toLowerCase() +  '">' + 
					data[0]['immunity'][im] + '</span>';
			}
			document.querySelector('.condition-immunity').appendChild(immunity);
		}

		// Create an empty object to store all the moves
		var moves = {};

		// Build the array of types
		let types = [
			'neutral', 'nature', 'fire', 'water', 'electric', 'wind', 'earth', 
			'metal', 'ice', 'dark', 'light', 'toxic'
		];

		// Loop through the types to get all the moves
		for ( var m = 0; m < types.length; m++ ) {
			fetch('/legend/data/moves/' + types[m] + '.json')
			.then( function(response) {
				if (!response.ok) throw new Error("HTTP error " + response.status);
				return response.json();
			})
			.then( function(_moves) {
				// Merge the JSON data to the "moves" object
				moves = Object.assign(moves, _moves[0]);
			})
			.catch( function(error) {
				console.log('Fetch error: ', error);
			});;
		}
			
		// Populate moveset by level up
		moveLevelContainer = document.querySelector('.moves-level');
		for ( var ml = 0; ml < data[0]['moves_level'].length; ml++ ) {
			var id = data[0]['moves_level'][ml]['id'];
			console.log(id);console.log(moves[String(id)]);
			var level = data[0]['moves_level'][ml]['level'];
			var moveLevel = document.createElement('div');
				moveLevel.classList.add('move');
				moveLevel.innerHTML = '<p class="move-label"><span class="move-name">' + 
					moves[String(id)]['name'] + '</span><span class="type ' +
					moves[String(id)]['type'].toLowerCase() + '">' + 
					moves[String(id)]['type'] + '</span><span class="move-level">' + 
					level + '</span></p>' + 
					'<p class="move-details"><span class="move-category">' + 
					moves[String(id)]['category'] + '</span><span class="move-power">PWR: ' +
					moves[String(id)]['power'] + '</span><span class="move-accuracy">ACC: ' +
					moves[String(id)]['accuracy'] + '</span><span class="move-stamina">STA: ' +
					moves[String(id)]['stamina'] + '</span></p>' +
					'<p class="move-effect">' + moves[String(id)]['effect'] + '</p>';
			moveLevelContainer.appendChild(moveLevel);
		}

		// Populate moveset by tutor
		var moveTutorContainer = document.querySelector('.moves-tutor');
		for ( var mt = 0; mt < data[0]['moves_tutor'].length; mt++ ) {
			var id = data[0]['moves_tutor'][mt]['id'];
			var moveTutor = document.createElement('div');
				moveTutor.classList.add('move');
				moveTutor.innerHTML = '<p class="move-label"><span class="move-name">' + 
					moves[String(id)]['name'] + '</span><span class="type ' +
					moves[String(id)]['type'].toLowerCase() + '">' + 
					moves[String(id)]['type'] + '</span></p>' + 
					'<p class="move-details"><span class="move-category">' + 
					moves[String(id)]['category'] + '</span><span class="move-power">PWR: ' +
					moves[String(id)]['power'] + '</span><span class="move-accuracy">ACC: ' +
					moves[String(id)]['accuracy'] + '</span><span class="move-stamina">STA: ' +
					moves[String(id)]['stamina'] + '</span></p>' +
					'<p class="move-effect">' + moves[id]['effect'] + '</p>';
			moveTutorContainer.appendChild(moveTutor);
		}

		// Populate evolution
		var evolution = document.querySelector('.evolution');
		if ( data[0]['evolution'].length > 0 ) {
			for ( var evo = 0; evo < data[0]['evolution'].length; evo++ ) {
			    evolution.innerHTML += '<a href="/legend/detail?no=' 
					+ data[0]['evolution'][evo]['id'] + '" class="evo-block" aria-label="' 
			    	+ data[0]['name'] + ' link">' + '<picture>'
					+ '<source data-srcset="/legend/img/pokemon/' 
					+ data[0]['evolution'][evo]['id'] + '/thumb-120x120.webp 1x, /legend/img/pokemon/'
					+ data[0]['evolution'][evo]['id'] + '/thumb-240x240.webp 2x, /legend/img/pokemon/'
					+ data[0]['evolution'][evo]['id'] + '/thumb-360x360.webp 3x" type="image/webp">'
					+ '<source data-srcset="/legend/img/pokemon/'
					+ data[0]['evolution'][evo]['id'] + '/thumb-120x120.png 1x, /legend/img/pokemon/'
					+ data[0]['evolution'][evo]['id'] + '/thumb-240x240.png 2x, /legend/img/pokemon/'
					+ data[0]['evolution'][evo]['id'] + '/thumb-360x360.png 3x" type="image/png">'
					+ '<img data-src="/legend/img/pokemon/' + no + '/thumb120x120.png" '
					+ 'src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"'
					+ ' class="lazyload evo-thumb" alt="' + data[0]['name'] + ' evolution thumbnail">'
					+ '</picture><p class="evo-req">' + data[0]['evolution'][evo]['req'] + '</p></a>';
			}
		}

		// Manipulate the page title, description along with their OG and Twitter meta
		var metaTitle = data[0]['name'] + ' - Pokémon Design - Calvin Lam';
		var metaDesc = 'Explore all about ' + data[0]['name'] +
			' from Newzar region in Pokémon Storm and Pokémon Quake.';
		document.title = metaTitle;
		document.querySelector('meta[name="description"]').content = metaDesc;
		document.querySelector('meta[property="og:title"]').content = metaTitle;
		document.querySelector('meta[property="og:description"]').content = metaDesc;
		document.querySelector('meta[name="twitter:title"]').content = metaTitle;
		document.querySelector('meta[name="twitter:description"]').content = metaDesc;

	})
	.catch( function(error) {
		console.log('Fetch error: ', error);
	});

}

/* =============================================================================

    GET PARAMETER

============================================================================= */

function getParameter() {

    var key = false, results = {}, item = null;

    // Get the query string without the "?""
    var qs = location.search.substring(1);

    // Check for the key as an argument
    if ( arguments.length > 0 && arguments[0].length > 1 ) key = arguments[0];

    // Make a regex pattern to grab key/value
    var pattern = /([^&=]+)=([^&]*)/g;

    // Loop the items in the query string,
    // Either find a match to the argument, 
    // Or build an object with key/value pairs
    while ( item = pattern.exec(qs) ) {
        if ( key !== false && decodeURIComponent(item[1]) === key ) {
            return decodeURIComponent(item[2]);
        } else if ( key === false ) {
            results[decodeURIComponent(item[1])] = decodeURIComponent(item[2]);
        }
    }

    return key === false ? results : null;
}

/* =============================================================================

    SWITCH TAB

============================================================================= */

(function() {

	var tabs = document.querySelectorAll('.info .tab');
	var tabContents = document.querySelectorAll('.info .tab-content');

	for ( var i = 0; i < tabs.length; i++ ) {
		tabs[i].addEventListener('click', function() {

			// Remove all active class off the tab
			for ( var j = 0; j < tabs.length; j++ ) {
				tabs[j].classList.remove('active');
			}

			// Add it back in to the current tab
			this.classList.add('active');

			// Remove all active class off the tab
			for ( var k = 0; k < tabContents.length; k++ ) {
				tabContents[k].classList.remove('active');
			}

			// Display the current tab content
			var currentTab = 'tab-' + this.innerText.toLowerCase();
			document.querySelector('.info .' + currentTab).classList.add('active');

		}, false);
	}


})();

/* =============================================================================

    SHINY

============================================================================= */

(function() {

	// Get the button trigger for shiny version
	var shinyTrigger = document.querySelector('.shiny-trigger');

	// Set first load as false first
	var loaded = false;

	// Add "click" event to the button
	shinyTrigger.addEventListener('click', function() {

		// Toggle the trigger class to tell whether it's active or not
		this.classList.toggle('active');

		// If shiny version hasn't been loaded yet, then load it
		if ( !loaded ) {

			// Hide the normal version
			document.querySelector('.image-normal').classList.remove('active');

			// Get the pokemon name
			var name = document.querySelector('.header .name').innerText;

			// Add the shiny version ( including class "active" to display it straight away )
			document.querySelector('.image').innerHTML +=
				'<picture>' +
				'<source data-srcset="/legend/img/pokemon/' + no + '/shiny-500x500.webp" ' +
				'media="(min-width: 1024px)" type="image/webp">' +
				'<source data-srcset="/legend/img/pokemon/' + no + '/shiny-500x500.png" ' +
				'media="(min-width: 1024px)" type="image/png">' +
				'<source data-srcset="/legend/img/pokemon/' + 
				no + '/shiny-300x300.webp 1x, /legend/img/pokemon/' +
				no + '/shiny-600x600.webp 2x, /legend/img/pokemon/' +
				no + '/shiny-900x900.webp 3x" ' +
				'media="(max-width: 1023px)" type="image/webp">' +
				'<source data-srcset="/legend/img/pokemon/' + 
				no + '/shiny-300x300.png 1x, /legend/img/pokemon/' +
				no + '/shiny-600x600.png 2x, /legend/img/pokemon/' +
				no + '/shiny-900x900.png 3x" ' +
				'media="(max-width: 1023px)" type="image/png">' +
				'<img data-src="/legend/img/pokemon/' + no + '/shiny-500x500.png" ' + 
				'src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"' + 
				' class="lazyload image-shiny active" alt="' + name + '">' +
				'</picture>';

			// Set loaded as "true" so future toggle won't add further request
			loaded = true;

		// If the shiny version is already loaded, simply toggle the 2 versions
		} else {
			document.querySelector('.image-normal').classList.toggle('active');
			document.querySelector('.image-shiny').classList.toggle('active');
		}

	}, false);

})();

/* =============================================================================

    OPENGRAPH & TWITTER CARD

============================================================================= */

(function() {

	// Prepare the image, url, title and description
	var image = '/legend/img/pokemon/' + no + '/full-900x900.png';
	var url = 'https://vincascalvii.github.io/legend/detail/?no=' + no;

	// Update OpenGraph info
	document.querySelector('meta[property="og:image"]').content = image;
	document.querySelector('meta[property="og:url"]').content = url;

	// Update Twitter card info
	document.querySelector('meta[name="twitter:image"]').content = image;
	document.querySelector('meta[name="twitter:url"]').content = url;

})();
