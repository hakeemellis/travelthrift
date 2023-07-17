const REQUEST_OPTIONS = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '5385ac0834mshc6cebf6a84fd8a7p181be2jsn44955000864b',
		'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com',
	},
};
const searchData = window.name && JSON.parse(window.name);
const { origin, destination, departDate, returnDate } = searchData;

async function getFlightsData() {
	try {
		const response = await fetch(
			`https://priceline-com-provider.p.rapidapi.com/v2/flight/departures?adults=1&departure_date=${departDate}&sid=iSiX639&origin_airport_code=${origin}&destination_airport_code=${destination}`,
			REQUEST_OPTIONS,
		);
		const data = await response.json();
		updateDOM(data.getAirFlightDepartures.results.result);
	} catch (error) {
		console.error(error);
	}
}
getFlightsData(); // if commented, uncomment to make things work

function updateDOM(airports) {
	// remove laoding spinner from DOM
	document.getElementById('laodingContainer').remove();

	// render data
	let imgIteration = 0;
	for (let i = 0; i < Object.keys(airports.airport_data).length; i++) {
		const airport = airports.airport_data[`airport_${i}`];
		const airline = airports.airline_data[`airline_${imgIteration}`];
		const flightDetialsCardComponent = /*html*/ `
         <article class="flight-details-card">
            <h3 class="flight-title">
               <a href="#">
                  &ldquo;${airport.name}&rdquo; Flight
               </a>
            </h3>

            <figure class="flight-image">
               <img src="${airline.logo}" alt="${airline.name} airline" />
               <figcaption>${airline.name}</figcaption>
            </figure>

            <ul class="flight-other-info">
            <li>Country : <strong>${airport.country}</strong> (${airport.country_code})</li>
            <li>City : <strong>${airport.city}</strong> (${airport.cirty_id})</li>
            <li>State : <strong>${airport.state}</strong></li>
            <li>Flight Code : <strong>${airport.code}</strong></li>
            <li>Departure Date : <strong>${departDate}</strong></li>
            <li>Return Date : <strong>${returnDate}</strong></li>
            </ul>
         </article>
      `;

		imgIteration += 1;
		if (imgIteration === Object.keys(airports.airline_data).length) imgIteration = 0;

		// add fligh result card to the DOM
		document.getElementById('flightsList').insertAdjacentHTML('beforeend', flightDetialsCardComponent);
	}
}
