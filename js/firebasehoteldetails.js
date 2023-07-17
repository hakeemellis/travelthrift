document.addEventListener('DOMContentLoaded', () => {
  loadHotels();

  async function fetchHotelDetails(hotelId) {
    const docRef = await firebase.firestore().collection("hotels").doc(hotelId).get();
    return docRef.data();
  }

  async function loadHotels() {
    const loader = document.getElementById("loader");
    loader.style.display = "block";
    
    const querySnapshot = await firebase.firestore().collection("searches").get();
    
    const hotelDetails = [];
    for (const doc of querySnapshot.docs) {
      const data = await fetchHotelDetails(doc.id);
      console.log(data); // log the hotel data to the console
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
});

