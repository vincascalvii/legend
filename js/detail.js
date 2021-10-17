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
		document.querySelector('main').classList.add(data[0]['type_1'].toLowerCase());

		// Populate name
		document.querySelector('.name').innerHTML = data[0]['name'];

		// Populate types
		document.querySelector('.types span:first-child').innerHTML = data[0]['type_1']
		document.querySelector('.types span:first-child')
			.classList.add(data[0]['type_1'].toLowerCase());
		if ( data[0]['type_2'] != '' && data[0]['type_2'] != null ) {
			var type2 = document.createElement('span');
				type2.classList.add(data[0]['type_2'].toLowerCase());
				type2.innerHTML = data[0]['type_2']
			document.querySelector('.types').appendChild(type2);
		}

		// Populate abilities
		document.querySelector('.ability-1 .ability-name').innerHTML = data[0]['ability_1']['name'];
		document.querySelector('.ability-1 .ability-desc').innerHTML = data[0]['ability_1']['desc'];
		document.querySelector('.ability-2 .ability-name').innerHTML = data[0]['ability_2']['name'];
		document.querySelector('.ability-2 .ability-desc').innerHTML = data[0]['ability_2']['desc'];

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
			(( parseInt(data[0]['stats']['hp']) / 300 ) * 100 ) + '%';
		document.querySelector('.stat-atk .stat-bar-fill').style.width = 
			(( parseInt(data[0]['stats']['atk']) / 300 ) * 100 ) + '%';
		document.querySelector('.stat-def .stat-bar-fill').style.width = 
			(( parseInt(data[0]['stats']['def']) / 300 ) * 100 ) + '%';
		document.querySelector('.stat-spa .stat-bar-fill').style.width = 
			(( parseInt(data[0]['stats']['spa']) / 300 ) * 100 ) + '%';
		document.querySelector('.stat-spd .stat-bar-fill').style.width = 
			(( parseInt(data[0]['stats']['spd']) / 300 ) * 100 ) + '%';
		document.querySelector('.stat-spe .stat-bar-fill').style.width = 
			(( parseInt(data[0]['stats']['spe']) / 300 ) * 100 ) + '%';

		// Populate battle condition
		for ( var weak = 0; weak < data[0]['weak'].length; weak++ ) {
			document.querySelector('.condition-weak .condition-types').innerHTML += 
				'<span class="type '  + data[0]['weak'][weak].toLowerCase() +  '">' + 
				data[0]['weak'][weak] + '</span>';
		}
		for ( var resist = 0; resist < data[0]['resist'].length; resist++ ) {
			document.querySelector('.condition-resist .condition-types').innerHTML += 
				'<span class="type '  + data[0]['resist'][resist].toLowerCase() +  '">' + 
				data[0]['resist'][resist] + '</span>';
		}
		for ( var immune = 0; immune < data[0]['immune'].length; immune++ ) {
			document.querySelector('.condition-immune .condition-types').innerHTML += 
				'<span class="type '  + data[0]['immune'][immune].toLowerCase() +  '">' + 
				data[0]['immune'][immune] + '</span>';
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

	for ( var i = 0; i < tabs.length; i++ ) {
		tabs[i].addEventListener('click', function() {

			// Remove all active class off the tab
			for ( var j = 0; j < tabs.length; j++ ) {
				tabs[j].classList.remove('active');
			}

			// Add it back in to the current tab
			this.classList.add('active');

			// Remove all active class off the tab
			var tabContents = document.querySelectorAll('.info .tab-content');
			for ( var k = 0; k < tabContents.length; k++ ) {
				tabContents[k].classList.remove('active');
			}

			// Display the current tab content
			var currentTab = 'tab-' + this.innerText.toLowerCase();
			document.querySelector('.info .' + currentTab).classList.add('active');

		}, false);
	}


})();