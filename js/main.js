window.addEventListener('load', async () => {
  const locationInput = document.getElementById('locationInput');
  const checkinInput = document.getElementById('checkinInput');
  const checkoutInput = document.getElementById('checkoutInput');
  const searchButton = document.getElementById('searchButton');
  const countrySelect = document.getElementById('countrySelect');

  // Fetch the list of country names from a REST API
  const countriesUrl = 'https://restcountries.com/v2/all?fields=name';
  const response = await fetch(countriesUrl);
  const countries = await response.json();

  // Populate the dropdown list with the country names
  countries.forEach(country => {
    const option = document.createElement('option');
    option.value = country.name;
    option.text = country.name;
    countrySelect.appendChild(option);
  });

  searchButton.addEventListener('click', async () => {

    const apiKey = '3f62a0a69amsh1a88001e18de088p19ac4ajsn3529f7e09f40';
    const location = locationInput.value;
    const checkinDate = checkinInput.value;
    const checkoutDate = checkoutInput.value;
    const countryName = countrySelect.value;

    const url = `https://priceline-com-provider.p.rapidapi.com/v1/hotels/locations?name=${location}&search_type=HOTEL`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    const matchingItems = data.filter(item => item.cityName.toLowerCase() === location.toLowerCase());

    let cityId = '';
    if (matchingItems.length === 1) {
      if (matchingItems[0].countryName.toLowerCase() === countryName.toLowerCase()) {
        cityId = matchingItems[0].cityId;
      } else {
        alert('City not found in specified country. Please try again.');
        return;
      }
    } else if (matchingItems.length > 1) {
      const matchingItem = matchingItems.find(item => item.countryName.toLowerCase() === countryName.toLowerCase());
      if (matchingItem) {
        cityId = matchingItem.cityId;
      } else {
        alert('City not found in specified country. Please try again.');
        return;
      }
    } else {
      alert('City not found. Please try again.');
      return;
    }

    const itemList = data.map(item => {
      if (item.cityName.toLowerCase() === location.toLowerCase() && item.countryName.toLowerCase() === countryName.toLowerCase()) {
        return { itemName: item.itemName, address: item.address, id: item.id, cityID: item.cityID, provinceName: item.provinceName, country: item.country };
      }
    }).filter(item => item);

    sessionStorage.setItem('cityId', cityId);
    sessionStorage.setItem('itemList', JSON.stringify(itemList));
    sessionStorage.setItem('location', location);
    sessionStorage.setItem('checkinDate', checkinDate);
    sessionStorage.setItem('checkoutDate', checkoutDate);

    window.location.href = 'hotelsearchresults.html';
  });
});
