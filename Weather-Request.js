
// Using Open Weather Map API

/* Build URL skeleton for API call */
var url = 'http://api.openweathermap.org/data/2.5/weather?';
var apiKey = '&appid=f39710ba306d73251b63bf0fa55f9a21';
var units = '&units=imperial';

document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons() {
  document.getElementById('zipSubmit').addEventListener('click', function(event) {
    weatherByZip(url);

  });

  document.getElementById('citySubmit').addEventListener('click', function(event) {
    weatherByCity(url);

  });

  event.preventDefault();
}

function weatherByZip(url) {
  var zip = document.getElementById('zipCode').value;
    url = url + 'zip=' + zip + ',us' + units + apiKey;
    //alert(url);
    var xhr = new XMLHttpRequest();

    xhr.onload = function() {
      if(xhr.status === 200) {
        var responseObject = JSON.parse(xhr.responseText);
        console.log(responseObject);
        loc = responseObject.name;

        var row = document.getElementById('weatherData');
        var newRow = document.createElement('tr');
        var element1 = document.createElement('td');
        var element2 = document.createElement('td');
        var element3 = document.createElement('td');


        //var loc = document.getElementById('location');
        var locText = document.createTextNode(responseObject.name);
        //var temp = document.getElementById('temperature');
        var tempText = document.createTextNode(responseObject.main.temp);
        //var humidity = document.getElementById('humidity');
        var humidityText = document.createTextNode(responseObject.main.humidity);
        //loc.appendChild(locText);
        //temp.appendChild(tempText);
        //humidity.appendChild(humidityText);


        row.appendChild(newRow);
        newRow.appendChild(element1);
        element1.appendChild(locText);

        newRow.appendChild(element2);
        element2.appendChild(tempText);

        newRow.appendChild(element3);
        element3.appendChild(humidityText);



      }

    };

    xhr.open('GET', url, true);
    xhr.send(null);


}

function weatherByCity(url) {
  var city = document.getElementById('cityName').value;
  var state = document.getElementById('stateName').value;
    url = url + 'q=' + city + ',' + state + ',us' + units + apiKey;

  //alert(url);
  var xhr = new XMLHttpRequest();

  xhr.onload = function() {
    if(xhr.status === 200) {
      var responseObject = JSON.parse(xhr.responseText);
      console.log(responseObject);
      loc = responseObject.name;

      var loc = document.getElementById('location');
      var locText = document.createTextNode(responseObject.name);
      var temp = document.getElementById('temperature');
      var tempText = document.createTextNode(responseObject.main.temp);
      var humidity = document.getElementById('humidity');
      var humidityText = document.createTextNode(responseObject.main.humidity);
      loc.appendChild(locText);
      temp.appendChild(tempText);
      humidity.appendChild(humidityText);

    }

  };

  xhr.open('GET', url, true);
  xhr.send(null);
}





/*
var url = 'http://api.openweathermap.org/data/2.5/weather?';
var apiKey = '&appid=f39710ba306d73251b63bf0fa55f9a21';
var zip = '97229';
  url = url + 'zip=' + zip + ',us';


function weatherByZip(zip, url) {
  //url = url + 'zip=' + zip + ',us';

}

function weatherByCity(city, url) {

}

url = url + 'q=London,uk';
url = url + apiKey;
var xhr = new XMLHttpRequest();

xhr.onload = function() {
  if(xhr.status === 200) {
    responseObject = JSON.parse(xhr.responseText);
    console.log(responseObject);
  }

};

xhr.open('GET', url, false);
xhr.send(null);
*/






/*
req.open("POST", "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=f39710ba306d73251b63bf0fa55f9a21", false);
req.setRequestHeader('Content-Type', 'application/json');
req.send(null);
console.log(JSON.parse(req.responseText));
*/
