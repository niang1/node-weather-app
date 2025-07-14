const axios = require('axios');
const handleAxiosError = require('./errorHandling');

const forecast = (latitude, longitude, callback) => {
  url = `https://api.weatherstack.com/current?access_key=8a39e442031729cca3eaa72d0d2b7633&query=${latitude},${longitude}`;
  axios
    .get(url)
    .then((response) => {
      const data = {
        temperature: response.data.current.temperature,
        feelslike: response.data.current.feelslike,
        weather_desciption: response.data.current.weather_descriptions[0],
        location:
          response.data.location.country +
          ',' +
          response.data.location.region +
          ',' +
          response.data.location.name,
      };
      callback(
        undefined,
        `${data.location} : ${data.weather_desciption}. It is currently ${data.temperature} degres out. It feels like ${data.feelslike} degres`
      );
      //callback(undefined, response.data);
    })
    .catch((error) => {
      handleAxiosError(error, callback);
    });
};

module.exports = forecast;
