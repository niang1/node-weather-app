function fetch(location) {
  message_loading.innerHTML = 'Loading....';
  message_weather.innerHTML = '';
  axios
    .get(`/weather?address=${encodeURIComponent(location)}`)
    .then((response) => {
      if (response.data.error) {
        message_loading.innerHTML = '';
        message_weather.innerHTML = response.data.error;
        message_weather.style.color = '#a73e3eff';
      } else {
        message_loading.innerHTML = '';
        message_weather.innerHTML = response.data.forecast;
        message_weather.style.color = '#27934eff';
      }
    });
}

const formWeather = document.querySelector('form');
const search = document.querySelector('input');
let message_loading = document.getElementById('message_loading');
let message_weather = document.getElementById('message_weather');

formWeather.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;
  fetch(location);
});
