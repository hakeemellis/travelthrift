document.getElementById('submitFlightFormBtn').addEventListener('click', submitRequest);

function submitRequest(event) {
	event.preventDefault();

	const flightInputs = document.querySelectorAll('.js-flight-form-input');

	// create an array of arrays from flight-data inputs
	const flightsData = Array.from(flightInputs, input => [input.name, input.value]);

	// create an object containing search data
	const searchData = Object.fromEntries(flightsData);

	// stringify and svae search data object to the 'name' property of window (accessible in other pages)
	window.name = JSON.stringify(searchData);

	// redirect user to search result page
	location.href = 'flight_search_result.html';
}


  // Copyright Notice //
  console.log(`
  Copyright (c) 2023 Hakeem Ellis
  All rights reserved.

  This work is licensed under the terms of the Custom Code license.
  For a copy, see https://github.com/hakeemellis/portfolio/blob/main/LICENSE.md.

  Contact: utilize the contact form at https://hakeemellis.com/
  `);