var express = require('express');
var router = express.Router();
var Country = require('../models/Country');
var State = require('../models/State');

// Get all countries
router.get('/', (req, res, next) => {
  Country.find({}, (err, countries) => {
    if (err) return next(err);
    res.status(200).json({ countries });
  });
});

// Save a country
router.post('/', (req, res, next) => {
  var data = req.body;
  data.ethnicity = data.ethnicity.trim().split(',');
  Country.create(data, (err, country) => {
    if (err) return next(err);
    res.status(200).json({ country });
  });
});

// Update a country
router.put('/:id', (req, res, next) => {
  var id = req.params.id;
  var data = req.body;
  data.ethnicity = data.ethnicity.trim().split(',');
  data.neighbouring_countries = data.neighbouring_countries.trim().split(',');
  Country.findByIdAndUpdate(id, data, (err, country) => {
    if (err) return next(err);
    res.status(200).json({ country });
  });
});

// Delete a country
router.delete('/:id', (req, res, next) => {
  Country.findByIdAndDelete(data, (err, country) => {
    if (err) return next(err);
    State.deleteMany({ country: id }, (err, states) => {
      if (err) return next(err);
      res.status(200).json({ country });
    });
  });
});

// Add neighbouring country
router.put('/addNeighbourCountry/:id', (req, res, next) => {
  var countryId = req.params.id;
  var name = req.body.name;

  Country.findOne({ name }, (err, country) => {
    if (err) return next(err);
    Country.findByIdAndUpdate(
      countryId,
      { $push: { neighbouring_countries: country._id } },
      (err, updatedCountry) => {
        if (err) return next(err);
        res.status(200).json({ updatedCountry });
      }
    );
  });
});

// List All Neighbouring countries
router.get('/allNeighbouringCountries/:id', (req, res, next) => {
  var id = req.params.id;
  Country.findById(id, (err, country) => {
    if (err) return next(err);
    res.status(200).json({ neighbours: country.neighbouring_countries });
  });
});

// List All religions of the country
router.get('allReligions/:id', (req, res, next) => {
  var id = req.params.id;
  Country.findById(id, (err, country) => {
    if (err) return next(err);
    res.status(200).json({ religions: country.ethnicity });
  });
});

// List countries based on religion
router.get('/filter/religion', (req, res, next) => {
  const { relgion } = req.body;
  Country.find({ ethnicity: { $in: ['religion'] } }, (err, countries) => {
    if (err) return next(err);
    res.status(200).json({ countries });
  });
});

// List countries based on  continents
router.get('/filter/continent', (req, res, next) => {
  const { continent } = req.body;
  Country.find({ continent: continent }, (err, countries) => {
    if (err) return next(err);
    res.status(200).json({ countries });
  });
});

// List countries based on  population
router.get('/filter/population', (req, res, next) => {
  const { minPopulation, maxPopulation } = req.body;
  Country.find(
    { population: { $gte: minPopulation, $lte: maxPopulation } },
    (err, countries) => {
      if (err) return next(err);
      res.status(200).json({ countries });
    }
  );
});

// Adding a state
router.post('/:id', (req, res, next) => {
  var data = req.body;
  var countryId = req.params.id;
  State.create(data, (err, state) => {
    if (err) return next(err);
    Country.findByIdAndUpdate(
      countryId,
      { $push: { states: state._id } },
      (err, country) => {
        res.status(200).json({ state });
      }
    );
  });
});



module.exports = router;
