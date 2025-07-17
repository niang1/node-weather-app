const axios = require('axios');
const handleAxiosError = require('./errorHandling');

const forecast = (latitude, longitude) => {
  url = `https://api.weatherstack.com/current?access_key=5ca7dfbc6505505ad4ec849c3de81481&query=${latitude},${longitude}`;
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response) => {
        // console.log(response.data);
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

        resolve(
          `<div class="weather_div"><img src=${response.data.current.weather_icons[0]}><span style="margin-left:16px">  ${response.data.location.localtime} |  ${data.location} : ${data.weather_desciption}. It is currently ${data.temperature} degres out. It feels like ${data.feelslike} degres </span></div>`
        );

        /*   callback(
        undefined,
        `<div class="weather_div"><img src=${response.data.current.weather_icons[0]}><span style="margin-left:16px">  ${response.data.location.localtime} |  ${data.location} : ${data.weather_desciption}. It is currently ${data.temperature} degres out. It feels like ${data.feelslike} degres </span></div>`
      ); */
        //callback(undefined, response.data);
      })
      .catch((error) => {
        reject(handleAxiosError(error));
      });
  });
};

module.exports = forecast;
