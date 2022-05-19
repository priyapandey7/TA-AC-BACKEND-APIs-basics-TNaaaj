var express = require('express');
var router = express.Router();
var Country = require('../models/Country');
var State = require('../models/State');

// Get  states
router.get('/:id', (req, res, next) => {
  Country.findById(id, (err, country) => {
    if (err) return next(err);
    State.find({ country: country._id }, (err, states) => {
      if (err) return next(err);
      res.status(200).json({ states });
    });
  });
});

//Update State form any country
router.put('/:id/updateState', (req, res, next) => {
  var data = req.body;
  let id = req.params.id;
  States.findByIdAndUpdate(id, data, (err, state) => {
    if (err) return next(err);
    res.status(200).json({ state });
  });
});

//Removing State form any country
router.delete('/:id/removeState', (req, res, next) => {
  let id = req.params.id;
  States.findById(id, (err, state) => {
    if (err) return next(err);
    Countries.findByIdAndUpdate(
      state.country,
      { $pull: { neighbouring_states: id } },
      (err, country) => {
        if (err) return next(err);
        res.status(200).json({ country });
      }
    );
  });
});

module.exports = router;
