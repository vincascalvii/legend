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

		console.log(data);

		// Change background colour
		document.querySelector('main').classList.add(data[0]['types'][0].toLowerCase());

		// Populate name
		document.querySelector('.name').innerHTML = data[0]['name'];

		// Populate types
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
		document.querySelector('.stat-m-atk .stat-value').innerHTML = data[0]['stats']['m_atk'];
		document.querySelector('.stat-m-def .stat-value').innerHTML = data[0]['stats']['m_def'];
		document.querySelector('.stat-r-atk .stat-value').innerHTML = data[0]['stats']['r_atk'];
		document.querySelector('.stat-r-def .stat-value').innerHTML = data[0]['stats']['r_def'];
		document.querySelector('.stat-spe .stat-value').innerHTML = data[0]['stats']['spe'];
		document.querySelector('.stat-total .stat-value').innerHTML = data[0]['stats']['total'];

		// Populate stat bars
		document.querySelector('.stat-hp .stat-bar-fill').style.width = 
			(( parseInt(data[0]['stats']['hp']) / 120 ) * 100 ) + '%';
		document.querySelector('.stat-m-atk .stat-bar-fill').style.width = 
			(( parseInt(data[0]['stats']['m_atk']) / 120 ) * 100 ) + '%';
		document.querySelector('.stat-m-def .stat-bar-fill').style.width = 
			(( parseInt(data[0]['stats']['m_def']) / 120 ) * 100 ) + '%';
		document.querySelector('.stat-r-atk .stat-bar-fill').style.width = 
			(( parseInt(data[0]['stats']['r_atk']) / 120 ) * 100 ) + '%';
		document.querySelector('.stat-r-def .stat-bar-fill').style.width = 
			(( parseInt(data[0]['stats']['r_def']) / 120 ) * 100 ) + '%';
		document.querySelector('.stat-spe .stat-bar-fill').style.width = 
			(( parseInt(data[0]['stats']['spe']) / 120 ) * 100 ) + '%';

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

		// Populate moveset by level up
		for ( var ml = 0; ml < data[0]['moves_level'].length; ml++ ) {
			var moveLevel = document.createElement('div');
				moveLevel.classList.add('move');
				moveLevel.innerHTML = '<p class="move-label"><span class="move-name">' + 
					data[0]['moves_level'][ml]['name'] + '</span><span class="type ' +
					data[0]['moves_level'][ml]['type'].toLowerCase() + '">' + 
					data[0]['moves_level'][ml]['type'] + '</span><span class="move-level">' + 
					data[0]['moves_level'][ml]['level'] + '</span></p>' + 
					'<p class="move-details"><span class="move-category">' + 
					data[0]['moves_level'][ml]['category'] + '</span><span class="move-power">PWR: ' +
					data[0]['moves_level'][ml]['power'] + '</span><span class="move-accuracy">ACC: ' +
					data[0]['moves_level'][ml]['accuracy'] + '</span><span class="move-stamina">STA: ' +
					data[0]['moves_level'][ml]['stamina'] + '</span></p>' +
					'<p class="move-effect">' + data[0]['moves_level'][ml]['effect'] + '</p>';
			document.querySelector('.moves-level').appendChild(moveLevel);
		}

		// Populate moveset by tutor
		for ( var mt = 0; mt < data[0]['moves_tutor'].length; mt++ ) {
			var moveLevel = document.createElement('div');
				moveLevel.classList.add('move');
				moveLevel.innerHTML = '<p class="move-label"><span class="move-name">' + 
					data[0]['moves_tutor'][mt]['name'] + '</span><span class="type ' +
					data[0]['moves_tutor'][mt]['type'].toLowerCase() + '">' + 
					data[0]['moves_tutor'][mt]['type'] + '</span></p>' + 
					'<p class="move-details"><span class="move-category">' + 
					data[0]['moves_tutor'][mt]['category'] + '</span><span class="move-power">PWR: ' +
					data[0]['moves_tutor'][mt]['power'] + '</span><span class="move-accuracy">ACC: ' +
					data[0]['moves_tutor'][mt]['accuracy'] + '</span><span class="move-stamina">STA: ' +
					data[0]['moves_tutor'][mt]['stamina'] + '</span></p>' +
					'<p class="move-effect">' + data[0]['moves_tutor'][mt]['effect'] + '</p>';
			document.querySelector('.moves-tutor').appendChild(moveLevel);
		}

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