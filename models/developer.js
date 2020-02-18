const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Geolocation Schema
const GeoSchema = new Schema({
  type:{
    type:String,
    default:"Point"
  },
  coordinates:{
    type:[Number],
    index:"2dsphere"
  }
});

//Create Developer Schema and model
const DeveloperSchema = new Schema({
  name:{
    type:String,
    required:[true,'Name field is required!']
  },
  technology:{
    type:String
  },
  available:{
    type:Boolean,
    default:false
  },
  geometry:GeoSchema
});

const Developer = mongoose.model('developer',DeveloperSchema);

module.exports = Developer;
