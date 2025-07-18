const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const { error } = require('console');

const publicDirPath = path.join(__dirname, '../public');
const viewsDir = path.join(__dirname, '../templates/views');
const partialDir = path.join(__dirname, '../templates/partials');

const port = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'hbs');
app.set('views', viewsDir);
hbs.registerPartials(partialDir);

app.use(express.static(publicDirPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather app',
    name: 'Mouhamadou Niang',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Mouhamadou Niang',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Mouhamadou Niang',
  });
});

app.get('/help/:anything', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Mouhamadou Niang',
    errorMessage: 'Error for this help',
  });
});

app.get('/weather', async (req, res) => {
  //console.log(res.query.address);
  if (req.query.address.trim().length == 0)
    return res.send({ error: 'You must provide a location !!!' });

  try {
    const data = await geocode(req.query.address);
    const dataForecast = await forecast(data.latitude, data.longitude);
    res.send({ forecast: dataForecast });
  } catch (e) {
    res.send({ error: e });
  }

  /*  geocode(req.query.address, (error, data) => {
    if (error) return res.send({ error });
    forecast(data.latitude, data.longitude, (error, data) => {
      if (error) return res.send({ error });
      res.send({ forecast: data });
    });
  }); */

  /* geocode(req.query.address)
    .then((data) => {
      return forecast(data.latitude, data.longitude);
    })
    .then((dataForecast) => {
      res.send({ forecast: dataForecast });
    })
    .catch((error) => {
      res.send({ error });
    }); */
});

app.get('/:anything', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Mouhamadou Niang',
    errorMessage: 'Page not found',
  });
});

app.listen(port, () => {
  console.log('Listen on port ', port);
});
