/**
 * Created by sophia on 10/19/16.
 */
$(document).ready(function () {
    var degree = "&#176F";
    var temp;
    var windSpeed;

    var displayWeatherData = function (weatherData) {
        var city = weatherData.name;
        var country = weatherData.sys.country;
        temp = weatherData.main.temp;
        var conditions = weatherData.weather[0].description;
        var icon = weatherData.weather[0].icon;
        windSpeed = weatherData.wind.speed;
        $("#location").html(city + ', ' + country);
        $("#temp").html(temp + degree);
        $("#windSpeed").html("wind " + windSpeed + " MPH");
        $("#conditions").html(conditions);
        $("#icon > img").attr(
            'src',
            'http://openweathermap.org/img/w/' + icon + '.png'
        );
    }

    var getWeatherData = function (position) {
        var long = position.coords.longitude;
        var lat = position.coords.latitude;
        var endpoint = 'http://api.openweathermap.org/data/2.5/weather';
        var params = {
            lon: long,
            lat: lat,
            appid: 'b1b15e88fa797225412429c1c50c122a',
            units: 'imperial'
        };

        $.ajax({
            url: endpoint,
            method: 'GET',
            data: params
        }).done(function (data) {
            console.log(data);
            if (data) {
                displayWeatherData(data);
            }
        });
    };
// convert temperature function
    $("#temp").click(function () {
        if (degree === "&#176F") {
            temp = (temp - 32) * (5 / 9);
            degree = "&#176C";
            $("#temp").html(+temp.toFixed(2) + degree);
        } else if (degree === "&#176C") {
            temp = (temp * (9 / 5)) + 32;
            degree = "&#176F";
            $("#temp").html(+temp.toFixed(2) + degree);
        }
    });

    if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(
            function (pos) {
                if (pos) {
                    getWeatherData(pos);
                }
            }
        );
})