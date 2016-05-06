
// Using Open Weather Map API
/* Resource for onload function and server status syntax:
 *  Javascript & JQuery by Jon Duckett
 *  Page 379.
 */

/* Build URL skeleton for API call */
var url = 'http://api.openweathermap.org/data/2.5/weather?';
var apiKey = '&appid=f39710ba306d73251b63bf0fa55f9a21';
var units = '&units=imperial';


document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons() {
  // Call weather Function for Zip Code lookup
  document.getElementById('zipSubmit').addEventListener('click', function(event) {
    weather(url, 'zip');

  });

  // Call weather function for City, State lookup
  document.getElementById('citySubmit').addEventListener('click', function(event) {
    weather(url, 'city');

  });

  document.getElementById('httpbin').addEventListener('click', function(event) {
    sendContent();
  });
}


function weather(url, val) {
  var zip = document.getElementById('zipCode').value;
  var city = document.getElementById('cityName').value;
  var state = document.getElementById('stateName').value;

  // zip code url
  if (val === 'zip') {
    url = url + 'zip=' + zip + ',us' + units + apiKey;
  }

  // city, state url
  if (val === 'city') {
    url = url + 'q=' + city + ',' + state + ',us' + units + apiKey;
  }

  // new request to Open Weather API
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

    // Asynchronous Request
    xhr.onload = function() {
      if(xhr.status === 200) {
        var responseObject = JSON.parse(xhr.responseText);

        // log request to console
        console.log(responseObject);

        // Create new row with 3 elements (location, temperature, and humidity of specified Zip / City, St)
        var row = document.getElementById('weatherData');
        var newRow = document.createElement('tr');
        var element1 = document.createElement('td');
        var element2 = document.createElement('td');
        var element3 = document.createElement('td');

        var locText = document.createTextNode(responseObject.name); // Location name
        var tempText = document.createTextNode(responseObject.main.temp); // Location temperature
        var humidityText = document.createTextNode(responseObject.main.humidity); // Location humidity

        // Append new row information to existing table
        row.appendChild(newRow);
        newRow.appendChild(element1);
        element1.appendChild(locText);

        newRow.appendChild(element2);
        element2.appendChild(tempText);

        newRow.appendChild(element3);
        element3.appendChild(humidityText);

      }

    };

    //xhr.open('GET', url, true);
    xhr.send(null);
    event.preventDefault();
}


function sendContent(){
  // new request to Open Weather API
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://httpbin.org/post', true);
  xhr.setRequestHeader('Content-Type', 'application/json');

    // Asynchronous Request
    xhr.onload = function() {
      if(xhr.status === 200) {
        var responseObject = JSON.parse(xhr.responseText);
        console.log(responseObject);

        var response = document.getElementById('returnVal');
        var responseText = document.createTextNode(responseObject.data);
        response.appendChild(responseText);
      }
    };

    // Send data submitted by user
    xhr.send(JSON.stringify(document.getElementById('data').value));
    event.preventDefault();


}
