// DEPENDENCIES (DOM Elements)

$(".btn").on("click", function (event) {
  var input = $(".form-control").val();
  findCity(input);
  $("#city").text(input);
  var newCity = document.createElement("li");
  $(newCity).text(input);
  document.getElementById("searches").appendChild(newCity);
  localStorage.setItem("city-" + input, input);
});
// function to get items stored in local storage.
function getCities() {
  // For loop, index = 0(starting point), loclastorage.length(ending point), i++ increment by 1)
  for (i = 0; i < localStorage.length; i++) {
    console.log(localStorage.key(i));
    // Set if statement if in local storage it has a key value pair of city to greb that info only
    if (localStorage.key(i).includes("city-")) {
      key = localStorage.key(i);
      // set variable to get item from local storage
      var savedCity = localStorage.getItem(key);
      // set variable to create element
      var newCity = document.createElement("li");
      // Used .text to enter text into li
      $(newCity).text(savedCity);
      document.getElementById("searches").appendChild(newCity);
    }
  }
}

getCities();

// Set up function to find city using open weather api
function findCity(cityName) {
  // fetch city using open weather api for weather map
  fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=a5b57bc8823bf94184cc2bc3ace08ba4`
  )
    // Then method to function using the arguement response then return it in json format
    .then(function (response) {
      return response.json();
    })
    // Then method again with the argument data
    .then(function (data) {
      // console.log(data);
      // Setting variables lat and lon to have the value of the city data
      let lat = data[0].lat;
      let lon = data[0].lon;
      // Calling getCurrent function (function written outside of this function get location)
      // added &units=imperial at end to change temp to f
      getCurrent(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a5b57bc8823bf94184cc2bc3ace08ba4&units=imperial`
      );
      getForecast(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=a5b57bc8823bf94184cc2bc3ace08ba4&units=imperial`
      );
    });
}
//setting function so when i call it in findCity function it knows what to do with it.
function getCurrent(currentUrl) {
  // fetch url passed through
  fetch(currentUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // used .text to put data into card

      let icon = data.weather[0].icon;
      $("#icon").attr(
        "src",
        `https://openweathermap.org/img/wn/${icon}@2x.png`
      );
      $("#temp").text("Temp: " + data.main.temp);
      $("#humidity").text("Humidity is: " + data.main.humidity);
      $("#wind").text("Wind Speed is: " + data.wind.speed);
      console.log(temp);
    });
}

function getForecast(currentUrl) {
  fetch(currentUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.list[0]);
      // console.log(data);
      let x = 0;
      for (i = 0; i < data.list.length; ) {
        let currentItem = data.list[i];
        $(".date-" + x).text(currentItem.dt_txt.substring(5, 10));
        let icon = currentItem.weather[0].icon;

        console.log(icon);
        $("#icon" + x).attr(
          "src",
          `https://openweathermap.org/img/wn/${icon}@2x.png`
        );

        $("#temp" + x).text("Temp: " + currentItem.main.temp + "\u2109");
        $("#wind" + x).text("Wind Speed: " + currentItem.wind.speed + "mph");
        $("#humidity" + x).text("Humidity: " + currentItem.main.humidity + "%");
        console.log(currentItem.dt_txt);
        console.log(data.list[i].dt_txt);
        i = i + 8;
        x = x + 1;
      }
    });
}

// 5 day url
// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=a5b57bc8823bf94184cc2bc3ace08ba4

// // current weather url
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=a5b57bc8823bf94184cc2bc3ace08ba4;

// // long lat url
// http://api.openweathermap.org/geo/1.0/direct?q=&limit=5&appid=a5b57bc8823bf94184cc2bc3ace08ba4

// // weather icons
// https://openweathermap.org/weather-conditions
// http://openweathermap.org/img/wn/10d@2x.png
