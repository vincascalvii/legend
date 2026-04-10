/* ================================================================

	DETAIL

================================================================ */

// Get the Legend number from URL query
var num = getParameter('num');
if (num != '' && num != null) {

	// Fetch the data
	fetch('/legend/data/detail/' + num + '.json')
	.then(function(response) {
		if (!response.ok) throw new Error("HTTP error " + response.status);
	    return response.json();
	})
	.then(function(data) {
		var data = data[0];
		const dbNum = data['number'];
		const dbName = data['name'];
		const dbAttr1 = data['attributes'][0];
		const dbAttr2 = data['attributes'][1] ?? null;

		// Change background colour
		document.getElementById('background').classList.add(dbAttr1.toLowerCase());

		// Populate name
		document.getElementById('name').innerHTML = dbName;

		// Populate type
		const type = data['type'];
		const elType = document.getElementById('type');
		elType.innerHTML = type;
		elType.classList.add(type.toLowerCase());

		// Populate attributes
		const elAttrs = document.getElementById('attrs');
		const elAttr1 = document.getElementById('attr1');
		elAttr1.innerHTML = dbAttr1;
		elAttr1.classList.add(dbAttr1.toLowerCase());
		if (dbAttr2 !== null) {
			elAttrs.innerHTML += `<span class="attribute ${dbAttr2.toLowerCase()}">${dbAttr2}</span>`;
		}

		// Populate number
		document.querySelector('.number').innerHTML = '#' + dbNum;

		// Get the previous and next numbers
		let arrowNumbers = getArrowNumber(dbNum);

		// If previous number is not null, add the arrow
		const elPrevNum = document.getElementById('prev-arr');
		if (arrowNumbers[0] !== null) {
			document.getElementById('prev-num').innerHTML = '#' + arrowNumbers[0];
			elPrevNum.href = '/legend/detail?num=' + arrowNumbers[0];

		// Otherwise, hide it
		} else {
			elPrevNum.style.display = 'none';
		}

		// If next number is not null, add the arrow
		const elNextNum = document.getElementById('next-arr');
		if (arrowNumbers[1] !== null) {
			document.getElementById('next-num').innerHTML = '#' + arrowNumbers[1];
			elNextNum.href = '/legend/detail?num=' + arrowNumbers[1];

		// Otherwise, hide it
		} else {
			elNextNum.style.display = 'none';
		}

		// Populate image
		document.getElementById('image').innerHTML = 
			'<img src="/legend/img/lumies/' + num + '/full-600x600.png" class="image-normal active" alt="' + dbName + '">';

		// Populate traits
		document.getElementById('tr1-name').innerHTML = data['traits'][0]['name'];
		document.getElementById('tr1-desc').innerHTML = data['traits'][0]['desc'];
		if (data['traits'][1]) {
			document.getElementById('tr2-name').innerHTML = data['traits'][1]['name'];
			document.getElementById('tr2-desc').innerHTML = data['traits'][1]['desc'];
		}

		// Populate description
		document.getElementById('desc').innerHTML = data['description'];

		// Populate additional details
		document.getElementById('gen-male').innerHTML = data['gender']['male'];
		document.getElementById('gen-female').innerHTML = data['gender']['female'];
		document.getElementById('species').innerHTML = data['species'];
		document.getElementById('weight').innerHTML = data['weight'];
		document.getElementById('height').innerHTML = data['height'];

		// Populate stats
		const dbHp = data['stats']['hp'];
		const dbAtk = data['stats']['atk'];
		const dbDef = data['stats']['def'];
		const dbSpa = data['stats']['spa'];
		const dbSpd = data['stats']['spd'];
		const dbSpe = data['stats']['spe'];
		const dbTtl = data['stats']['total'];
		document.getElementById('stt-hp').innerHTML = dbHp;
		document.getElementById('stt-atk').innerHTML = dbAtk;
		document.getElementById('stt-def').innerHTML = dbDef;
		document.getElementById('stt-spa').innerHTML = dbSpa;
		document.getElementById('stt-spd').innerHTML = dbSpd;
		document.getElementById('stt-spe').innerHTML = dbSpe;
		document.getElementById('stt-ttl').innerHTML = dbTtl;

		// Populate stat bars
		document.getElementById('sttbar-hp').style.width = getStatBarPercent(dbHp);
		document.getElementById('sttbar-atk').style.width = getStatBarPercent(dbAtk);
		document.getElementById('sttbar-def').style.width = getStatBarPercent(dbDef);
		document.getElementById('sttbar-spa').style.width = getStatBarPercent(dbSpa);
		document.getElementById('sttbar-spd').style.width = getStatBarPercent(dbSpd);
		document.getElementById('sttbar-spe').style.width = getStatBarPercent(dbSpe);

		// Populate weaknesses & resistances
		const dbTypeEff = data['type_eff'];
		const dbAttrEff = data['attr_eff'];
		popEff(dbTypeEff['weakness'], 'type', 'wkn', 'Weakness (x2)');
		popEff(dbTypeEff['resistance'], 'type', 'res', 'Resistance (x½)');
		popEff(dbAttrEff['major_weakness'], 'attr', 'mj-wkn', 'Major Weakness (x4)');
		popEff(dbAttrEff['weakness'], 'attr', 'wkn', 'Weakness (x2)');
		popEff(dbAttrEff['resistance'], 'attr', 'res', 'Resistance (x½)');
		popEff(dbAttrEff['major_resistance'], 'attr', 'mj-res', 'Major Resistance (x¼)');
		popEff(dbAttrEff['immunity'], 'attr', 'imm', 'Immunity (x0)');

		// Populate moves
		fetch('/legend/data/moves.json')
		.then(function(response) {
			if (!response.ok) throw new Error("HTTP error " + response.status);
			return response.json();
		})
		.then(function(moves) {
			console.log(moves[0]);
			const mvLvlCon = document.getElementById('mv-lvl');
			const mvTutCon = document.getElementById('mv-tut');
			popMoves(moves[0], data['moves_level'], mvLvlCon);
			popMoves(moves[0], data['moves_tutor'], mvTutCon);
		})
		.catch(function(error) {
			console.log('Fetch error: ', error);
		});
		
		// Populate evolution
		const dbEvol = data['evolution'];
		const elEvol = document.getElementById('evol');
		if (dbEvol.length > 0) {
			for (var evo = 0; evo < dbEvol.length; evo++) {
			    elEvol.innerHTML += `
					<a href="/legend/detail?num=${dbEvol[evo]['id']}" class="evo-block" 
						aria-label="${dbEvol[evo]['id']} link">
			    		<img data-src="/legend/img/lumies/${dbEvol[evo]['id']}/thumb-120x120.png"
							src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
							class="lazyload evo-thumb" alt="${dbEvol[evo]['id']} evolution thumbnail">
						<p class="evo-req">${dbEvol[evo]['req']}</p>
					</a>
				`;
			}
		}

		// Manipulate the page title, description along with their OG and Twitter meta
		const metaTitle = `${dbName} - Lumi Design - Calvin Lam`;
		const metaDesc = `Learn more about ${dbName}, such as its type, attributes, traits, stats and moves.`;
		document.title = metaTitle;
		document.querySelector('meta[name="description"]').content = metaDesc;
		document.querySelector('meta[property="og:title"]').content = metaTitle;
		document.querySelector('meta[property="og:description"]').content = metaDesc;
		document.querySelector('meta[name="twitter:title"]').content = metaTitle;
		document.querySelector('meta[name="twitter:description"]').content = metaDesc;

	})
	.catch(function(error) {
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

	// Get the tab and tab content
	var tabs = document.querySelectorAll('.info .tab');
	var tabContents = document.querySelectorAll('.info .tab-content');

	// Loop through the tabs
	for (var i = 0; i < tabs.length; i++) {
		tabs[i].addEventListener('click', function() {

			// Remove all active class off the tab
			for (var j = 0; j < tabs.length; j++) {
				tabs[j].classList.remove('active');
			}

			// Add it back in to the current tab
			this.classList.add('active');

			// Remove all active class off the tab
			for (var k = 0; k < tabContents.length; k++) {
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
/*
(function() {

	// Get the button trigger for shiny version
	var shinyTrigger = document.querySelector('.shiny-trigger');

	// Add "click" event to the button
	shinyTrigger.addEventListener('click', function() {

		// Toggle the trigger class to tell whether it's active or not
		this.classList.toggle('active');

		// Toggle between the two images
		document.querySelector('.image-normal').classList.toggle('active');
		document.querySelector('.image-shiny').classList.toggle('active');
	}, false);
})();
*/


/* =============================================================================

    OPENGRAPH & TWITTER CARD

============================================================================= */

(function() {

	// Prepare the image, url, title and description
	var image = '/legend/img/lumies/' + num + '/full-600x600.png';
	var url = 'https://vincascalvii.github.io/legend/detail/?num=' + num;

	// Update OpenGraph info
	document.querySelector('meta[property="og:image"]').content = image;
	document.querySelector('meta[property="og:url"]').content = url;

	// Update Twitter card info
	document.querySelector('meta[name="twitter:image"]').content = image;
	document.querySelector('meta[name="twitter:url"]').content = url;
})();



/* =============================================================================

    HELPER FUNCTIONS

============================================================================= */

// Get the previous & next number
// "original" is the current number
function getArrowNumber(original) {

	// Convert the original number string to a number
	let number = parseInt(original, 10);

	// Calculate the previous and next numbers
	let prevNumber = number - 1;
	let nextNumber = number + 1;

	// Convert the numbers back to strings
	let prevString = prevNumber.toString();
	let nextString = nextNumber.toString();

	// Pad the strings with leading zeros
	while (prevString.length < 3) prevString = '0' + prevString;
	while (nextString.length < 3) nextString = '0' + nextString;

	// Add min-max limit
	if (prevString === '000') prevString = null;
	if (nextString === '101') nextString = null;

	// Return the numbers ( in string, array )
	return [prevString, nextString];
}

// Convert stat to bar percentage
function getStatBarPercent(stat) {
	return ((parseInt(stat) / 150) * 100) + '%';
}

// Populate attributes chart
function popEff(dbEff, strCat, strType, strLbl) {
	if (dbEff.length > 0) {
		const elCon = document.getElementById(strCat + '-' + strType);
		elCon.innerHTML = '<h3 class="condition-label">' + strLbl + '</h3>';
		const elAttrs = document.createElement('div');
		elAttrs.classList.add('condition-' + strCat + 's');
		for (var i = 0; i < dbEff.length; i++) {
			const cat = strCat === 'type' ? 'type' : 'attribute';
			elAttrs.innerHTML += '<span class="' + cat + ' ' + dbEff[i].toLowerCase() +  '">' + dbEff[i] + '</span>';
		}
		elCon.appendChild(elAttrs);
	}
}

// Populate moves
function popMoves(moves, dbMv, elMvCon) {
	for (var i = 0; i < dbMv.length; i++) {
		const id = dbMv[i]['id'];

		// If the returned "moves" have the same ID, add the HTML
		if (moves[id]) {
			const type = moves[id]['type'];
			const lvl = dbMv[i]['level'] ?? null;
			const elMv = `
				<div class="move">
					<p class="move-label">
						<span class="move-name">${moves[id]['name']}</span>
						<span class="attribute ${type.toLowerCase()}">${type}</span>
						<span class="move-level">${!lvl || lvl === '-' ? '-' : 'Level ' + lvl}</span>
					</p>
					<p class="move-details">
						<span class="move-category">${moves[id]['category']}</span>
						<span class="move-power">PWR: ${moves[id]['power']}</span>
						<span class="move-accuracy">ACC: ${moves[id]['accuracy']}</span>
						<span class="move-stamina">STA: ${moves[id]['stamina']}</span>
					</p>
					<p class="move-effect">${moves[id]['effect']}</p>
				</div>
			`;
			elMvCon.innerHTML += elMv;;
		}
	}
}