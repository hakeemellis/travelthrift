// Retrieve the search results from session storage
const searchResults = JSON.parse(sessionStorage.getItem("searchResults"));

// Select the element where you want to display the search results
const resultsContainer = document.getElementById("results-container");

// Define an array of partner keys to display
const partnerKeys = ["AL", "AV", "BU", "ET", "EY", "FX", "HZ", "NA", "NC", "SX", "ZR", "ZT"];

if (searchResults || resultsContainer) {
  // Get the pickup and return locations from sessionStorage
  const pickupLocation = sessionStorage.getItem("pickupLocation");
  const returnLocation = sessionStorage.getItem("returnLocation");

  // Filter the search results by the pickup location and return location
  const filteredResults = searchResults.filter(
    (result) => result.airports[pickupLocation] || result.airports[returnLocation]
);

  for (let i = 0; i < filteredResults.length; i++) {
    const result = filteredResults[i];

    // Create a new div element
    const searchResultDiv = document.createElement("div");

    // Set the HTML content of the div element to display information about the search result
    searchResultDiv.innerHTML = `
        <div class="search-result">
          <center>
          <h2>${result.airports[pickupLocation].displayName} <p>to</p> ${result.airports[returnLocation].displayName}</h2>
          <p>Rates: <b>${result.posCurrencyCode}</b></p>
          <br>
          </center>
        </div>
      `;

    // Loop over the partner keys and create an img and p element for each partner
    for (let j = 0; j < partnerKeys.length; j++) {
      const partnerKey = partnerKeys[j];
      const partner = result.partners[partnerKey];

      const partnerDiv = document.createElement("div");
      partnerDiv.innerHTML = `
      <center>
      <div class="container-fluid container-lg border border-dark border-3 boxwidth">
        <img src="${partner.images.SIZE192X96.replace("?v=3.0", "")}"/>
        <p>${partner.partnerNameShort}</p>
        <p>${partner.phoneNumber}</p>
      </div>
      </center>
      <br>
      `;

      // Append the partner div to the search result div
      searchResultDiv.appendChild(partnerDiv);
    }

    // Append the search result div to the results container element
    resultsContainer.appendChild(searchResultDiv);
  }
} else {
  console.error("Unable to display search results");
}
