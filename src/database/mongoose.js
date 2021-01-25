const mongoose = require('mongoose')

const host = process.env.HOST
const dbName = process.env.DBNAME
const port = process.env.DBPORT
const password = process.env.PASSWORD
const login = process.env.LOGIN

const connectionURL = `mongodb://${login}:${password}@${host}:${port}/${dbName}`

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