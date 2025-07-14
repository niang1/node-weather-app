const axios = require('axios');
const handleAxiosError = require('./errorHandling');
const geocode = (address, callback) => {
  const url = `https://api.maptiler.com/geocoding/${encodeURIComponent(
    address
  )}.json?key=WpelftvIT8wQLX6z0cEI&limit=1`;
  axios
    .get(url)
    .then((response) => {
      callback(undefined, {
        latitude: response.data.features[0].center[1],
        longitude: response.data.features[0].center[0],
        location: response.data.features[0].place_name,
      });
    })
    .catch((error) => {
      handleAxiosError(error, callback);
    });
};

/* geocode('_', (error, data) => {
  console.log('error :', error);
  console.log('data', data);
});
 */

module.exports = geocode;
