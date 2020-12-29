const mongoose = require('mongoose')

const capitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  en_name: {
    type: String,
    required: true
  },
  longitude: {
    type: Number,
    required: true,
    trim: true
  },
  lattitude: {
    type: Number,
    required: true,
    trim: true
  }
})

const Capital = mongoose.model('Capital', capitalSchema)

module.exports = Capital
