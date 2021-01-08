const mongoose = require('mongoose')

const capitalSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  en_name: {
    type: String,
    required: true,
    trim: true
  },
  longitude: {
    type: Number,
    required: true,
    trim: true
  },
  latitude: {
    type: Number,
    required: true,
    trim: true
  },
  woeid: {
    type: Number,
    required: true,
    trim: true
  }
})

const Capital = mongoose.model('Capital', capitalSchema)

module.exports = Capital
