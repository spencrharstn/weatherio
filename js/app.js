function weather() {
    var location = document.getElementById("location");
    var apiKey = '9add6004cd6af626a252478801c67b84';
    var url = 'https://api.forecast.io/forecast/';

    navigator.geolocation.getCurrentPosition(success, error);   //use geolocation api to get user's current location
    location.innerHTML = "Locating...";

    function success(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;

        location.innerHTML = 'Latitude is ' + latitude + '° Longitude is ' + longitude + '°';

        //returns JSON with data from darksky
        $.getJSON(url + apiKey + '/' + latitude + ',' + longitude + '?callback=?', function (data) {
            $('#temp').html(data.currently.temperature + '° F');
            //debugger;
            $('#minutely').html(data.minutely.summary);
        });
    }

    function error() {
        location.innerHTML = "Unable to retrieve your location.";
    }

}

weather();