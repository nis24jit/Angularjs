/**
 * Created by Sudhina on 30/10/16.
 */
angular.module('mainApp').factory('weatherService',
    function ($http) {
        return {
            getWeather: function (city, country) {
                var query = city + ',' + country;
                return $http.get('http://api.openweathermap.org/data/2.5/weather',

                    {
                        params: {
                            q: query
                        }
                    }
                ).then(function (response) { //then() returns a promise which   ➥is resolved with return value of success callback

                    return response.data.weather[0].description; ///extract   ➥weather data

                });
            }
        }
    });
