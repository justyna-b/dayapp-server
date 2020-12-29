const express = require('express')
const router = new express.Router()
const fetch = require('node-fetch')

const Capital = require('../models/Capital')

//get info for today
//take city name from path and check in db for localization
router.get('/info/today/:city', async (req, res) => {
  const city = await Capital.findOne({ name: req.params.city })
  console.log(today)
  console.log(city.longitude)
  try {
    fetch(`https://api.sunrise-sunset.org/json?lat=${city.lattitude}&lng=${city.longitude}&date=today`)
      .then(response => response.text())
      .then(text => res.status(200).send(text))
  } catch (error) {
    res.status(500).send()
  }
})

//get info for another date (not today)
//date format : date=2020-12-29
router.get('/info/:date/:city', async (req, res) => {
  const city = await Capital.findOne({ name: req.params.city })
  console.log(today)
  console.log(city.longitude)
  try {
    fetch(`https://api.sunrise-sunset.org/json?lat=${city.lattitude}&lng=${city.longitude}&date=${req.params.date}`)
      .then(response => response.text())
      .then(text => res.status(200).send(text))
  } catch (error) {
    res.status(500).send()
  }
})

module.exports = router
