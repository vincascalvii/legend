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
		document.querySelector('.stat-hp').innerHTML = data[0]['stats']['hp'];
		document.querySelector('.stat-atk').innerHTML = data[0]['stats']['atk'];
		document.querySelector('.stat-def').innerHTML = data[0]['stats']['def'];
		document.querySelector('.stat-spa').innerHTML = data[0]['stats']['spa'];
		document.querySelector('.stat-spd').innerHTML = data[0]['stats']['spd'];
		document.querySelector('.stat-spe').innerHTML = data[0]['stats']['spe'];
		document.querySelector('.stat-total').innerHTML = data[0]['stats']['total'];

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
			for ( var k = 0; k < tabs.length; k++ ) {
				tabs[k].classList.remove('active');
			}

			// Display the current tab content
			var currentTab = 'tab-' + this.innerText.toLowerCase();
			document.querySelector('.info .' + currentTab).classList.add('active');

		}, false);
	}


})();