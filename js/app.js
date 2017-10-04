function getLocation(zip) {
    var location = document.getElementById("location");
    location.innerHTML = "Locating...";

    if (zip === undefined) {
        navigator.geolocation.getCurrentPosition(success, error);   //use geolocation api to get user's current location
    }
    else {
        alert(zip);
    }
    
    
    function success(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        location.innerHTML = 'Latitude is ' + latitude + '° Longitude is ' + longitude + '°';
        $('#gmaps').html('<a href=\'https://maps.google.com/maps?q=' + latitude + ',' + longitude + '\' target=\'_blank\'>' + "View on Google Maps");

        weather(latitude, longitude);   //get the weather
        suntimes(position);             //get the sunrise/sunset
    }

    function error() {
        location.innerHTML = "Unable to retrieve your location.";
    }

};

function weather(lat, long) {
    var apiKey = '9add6004cd6af626a252478801c67b84';
    var url = 'https://api.forecast.io/forecast/';

    //returns JSON with data from darksky
    $.getJSON(url + apiKey + '/' + lat + ',' + long + '?callback=?', function (data) {
        $('#temp').html("Current temperature is: " + data.currently.temperature + '° F');
        $('#minutely').html(data.minutely.summary);
    });
}

function suntimes(position) {
    var output = document.getElementById("sun");
    var url = 'https://api.sunrise-sunset.org/json'
  
    $.getJSON(url + '?lat=' + position.coords.latitude + '&lng=' + position.coords.longitude + '&formatted=0', function (data) {
        sunrise = new Date(data.results.sunrise.toString());    //get the sun times as a date object
        sunset = new Date(data.results.sunset.toString());
        sunrise = sunrise.toLocaleTimeString()                  //get the times as local time
        sunset = sunset.toLocaleTimeString()

        $('#sun').html("Sunrise: " + sunrise + ' Sunset: ' + sunset);
    });
};


//getLocation();