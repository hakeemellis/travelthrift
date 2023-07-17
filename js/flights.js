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
	location.href = 'http://127.0.0.1:5500/html/flight_search_result.html';
}
