var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stateSchema = new Schema(
  {
    name: { type: String },
    area: { type: Number },
    population: { type: Number },
    state: { type: mongoose.Schema.Types.ObjectId, ref: 'Country' },
    neighbouring_states: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'State' },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('State', stateSchema);
