const express = require('express')

require('./database/mongoose')
const capitalRouter = require('./routers/capital')
const infoRouter = require('./routers/info')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(capitalRouter)
app.use(infoRouter)


app.listen(port, () => {
  console.log('server is working on port ' + port)
})
