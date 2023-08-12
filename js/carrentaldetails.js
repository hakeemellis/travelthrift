document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("search-button");
  searchButton.addEventListener("click", () => {
    // User inputs
    const pickupLocation = document.getElementById("pickup-location").value;
    const pickupDate = document.getElementById("pickup-dateandtime").value;
    const returnLocation = document.getElementById("return-location").value;
    const returnDate = document.getElementById("return-dateandtime").value;

    // API endpoint and parameters
    const endpoint = "https://priceline-com-provider.p.rapidapi.com/v1/cars-rentals/search";
    const params = `?date_time_pickup=${pickupDate}&location_pickup=${pickupLocation}&location_return=${returnLocation}&date_time_return=${returnDate}`;

    // Store user inputs in sessionStorage
    sessionStorage.setItem("pickupLocation", pickupLocation);
    sessionStorage.setItem("returnLocation", returnLocation);

    // Fetch request
    fetch(endpoint + params, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "3f62a0a69amsh1a88001e18de088p19ac4ajsn3529f7e09f40",
        "x-rapidapi-host": "priceline-com-provider.p.rapidapi.com"
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      // Store the API response in sessionStorage
      sessionStorage.setItem("searchResults", JSON.stringify([data]));

      // Redirect the user to a new page to display the search results
      window.location.href = "carrentalsearchresults.html";
    })
    .catch(error => {
      console.error("There was a problem with the fetch operation:", error);
    });
  });

    // Copyright Notice //
    console.log(`
    Copyright (c) 2023 Hakeem Ellis
    All rights reserved.
  
    This work is licensed under the terms of the Custom Code license.
    For a copy, see https://github.com/hakeemellis/portfolio/blob/main/LICENSE.md.
  
    Contact: utilize the contact form at https://hakeemellis.com/
    `);
});
