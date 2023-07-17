const itemList = JSON.parse(sessionStorage.getItem("itemList"));

async function fetchHotelDetails(id) {
  const response = await fetch(`https://priceline-com-provider.p.rapidapi.com/v1/hotels/details?hotel_id=${id}`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "priceline-com-provider.p.rapidapi.com",
      "x-rapidapi-key": "3f62a0a69amsh1a88001e18de088p19ac4ajsn3529f7e09f40"
    }
  });
  const data = await response.json();
  return data;
}

async function loadHotels() {
  const hotelDetails = [];
  const loader = document.getElementById("loader");
  loader.style.display = "block";
  
  for (const item of itemList) {
    const data = await fetchHotelDetails(item.id);
    hotelDetails.push(data);
  }
  
  loader.style.display = "none";
  
  for (const hotel of hotelDetails) {
    const hotelInfo = `
      <div class="container-fluid container-lg border border-dark border-1 boxwidth">
      <a href="hotelsdetailed.html?id=${hotel.hotelId}">
        <div class="hotel-info">
          <h2>${hotel.name}</h2>
          <img src='${hotel.thumbnailUrl}'>
          <p>Address: ${hotel.location.address.addressLine1}
          <p>Guest Rating: ${hotel.overallGuestRating}</p>
          <p>Hotel Amenities:<br>
          ${hotel.hotelFeatures.features[0]} | ${hotel.hotelFeatures.features[1]} | ${hotel.hotelFeatures.features[2]} | ${hotel.hotelFeatures.features[3]} | ${hotel.hotelFeatures.features[4]}</p>
        </div>
        </a>
      </div>
      <br>
      <br>
    `;
    document.getElementById("hotel-list").insertAdjacentHTML("beforeend", hotelInfo);
  }
}

loadHotels();


//Loading Detailed

// Retrieve the hotel ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const hotelId = urlParams.get("id");

// Fetch the hotel details
async function fetchHotelDetails(id) {
  const response = await fetch(`https://priceline-com-provider.p.rapidapi.com/v1/hotels/details?hotel_id=${id}`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "priceline-com-provider.p.rapidapi.com",
      "x-rapidapi-key": "3f62a0a69amsh1a88001e18de088p19ac4ajsn3529f7e09f40"
    }
  });
  const data = await response.json();
  return data;
}

// Load the hotel details
async function loadHotelDetails() {
  const hotelDetails = await fetchHotelDetails(hotelId);
  const hotelInfo = `
    <div class="hotel-info">
      <h2>${hotelDetails.name}</h2>
      <p>Address: ${hotelDetails.location.address.addressLine1}
      <p>Guest Rating: ${hotelDetails.overallGuestRating}</p>
      <div class="container container-lg">
      <img src='${hotelDetails.images[0].imageUrl}'/>
      <img src='${hotelDetails.images[1].imageUrl}'/>
      <img src='${hotelDetails.images[3].imageUrl}'/>
      <img src='${hotelDetails.images[4].imageUrl}'/>
      </div>
      <br>
      <br>
      <h2>Description</h2>
      <div class="container-fluid container-lg border border-dark border-1">
      <p>${hotelDetails.description}</p>
      </div>
      <br>
      <br>
      <h2>Reviews</h2>
      <div class="container-fluid container-lg border border-dark border-1">
      <p>"${hotelDetails.guestReviews[0].reviewTextPositive}</p>"
      <p>Reviewer: ${hotelDetails.guestReviews[0].firstName}</p>
      </div>
      <br>
      <br>
      <a href="../html/hotelsearchresults.html">
      <button type="button" class="btn btn-lg btn-dark rounded-pill hotelbuttonleft">Back to Search</button></a>
    </div>
  `;
  document.getElementById("hotel-details").innerHTML = hotelInfo;
}

loadHotelDetails();



  