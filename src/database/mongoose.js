const mongoose = require('mongoose')

const dbName = 'dayapp'
const connectionURL = `mongodb://127.0.0.1:27017/${dbName}`
const Capital = require('../models/Capital')

try {
  mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
} catch (error) {
    handleError(error)
}