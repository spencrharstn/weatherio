function getLocation() {
    var location = document.getElementById("location");
    location.innerHTML = "Locating...";

    navigator.geolocation.getCurrentPosition(success, error);   //use geolocation api to get user's current location
    
    
    function success(position) {
        //debugger;
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        location.innerHTML = 'Latitude is ' + latitude + '° Longitude is ' + longitude + '°';
        weather(latitude, longitude);
        suntimes(position);
        $('#gmaps').html('<a href=\'https://maps.google.com/maps?q=' + latitude +',' + longitude + '\' target=\'_blank\'>' + "View on Google Maps");
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
    //debugger;
    $.getJSON(url + '?lat=' + position.coords.latitude + '&lng=' + position.coords.longitude, function (data) {
        $('#sun').html("Sunrise: " + data.results.sunrise + ' Sunset: ' + data.results.sunset);
    });
};


getLocation();