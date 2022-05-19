var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var countrySchema = new Schema(
  {
    name: { type: String ,required :true },
    continent: { type: String },
    area: { type: Number },
    population: { type: Number },
    states: [{ type: mongoose.Schema.Types.ObjectId, ref: 'State' }],
    ethnicity: [{ type: String }],
    neighbouring_countries: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Country' },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Country', countrySchema);