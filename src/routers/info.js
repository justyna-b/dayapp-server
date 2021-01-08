const express = require('express')
const router = new express.Router()
const fetch = require('node-fetch')

const Capital = require('../models/Capital')

//get info for today
//take city name from path and check in db for localization
//get woeid from db
router.get('/info/today/:city', async (req, res) => {
  const city = await Capital.findOne({ en_name: req.params.city })
  let info = {
    sunset: '',
    sunrise: '',
    temp: '',
    goldenHour: '',
    weather: '',
    dayLength: '',
    humidity: '',
    city: ''
  }
  try {
    let weather = await fetch(
      `https://www.metaweather.com/api/location/${city.woeid}/`
    )
    let weatherJson = await weather.json()
    info.humidity = weatherJson.consolidated_weather[0].humidity
    info.temp = weatherJson.consolidated_weather[0].the_temp.toFixed(2)
    info.weather = `https://www.metaweather.com/static/img/weather/${weatherJson.consolidated_weather[0].weather_state_abbr}.svg`

    let details = await fetch(
      `https://api.sunrise-sunset.org/json?lat=${city.latitude}&lng=${city.longitude}&date=today`
    )
    let detailsJson = await details.json()
    info.sunset = detailsJson.results.sunset
    info.sunrise = detailsJson.results.sunrise
    info.dayLength = detailsJson.results.day_length
    let temp = detailsJson.results.sunset.split(':')

    let golden = new Date()
    golden.setHours(temp[0] - 1)
    golden.setMinutes(temp[1])
    golden.setSeconds(temp[2].split(' ')[0])
    console.log(golden.toLocaleString())
    info.goldenHour = `${golden.getHours()}:${golden.getMinutes()}:${golden.getSeconds()}`
    info.city = city.name
    res.status(200).send(info)
  } catch (error) {
    res.status(500).send(error)
  }
})

//get info for another date (not today)
//date format : date=2020-12-29
router.get('/info/:date/:city', async (req, res) => {
  const city = await Capital.findOne({ en_name: req.params.city })
  console.log(city)
  let info = {
    sunset: '',
    sunrise: '',
    temp: '',
    goldenHour: '',
    weather: '',
    dayLength: '',
    humidity: '',
    city: ''
  }
  let date = req.params.date.split('-')
  date = `${date[0]}/${date[1]}/${date[2]}`
  try {
    let weather = await fetch(
      `https://www.metaweather.com/api/location/${city.woeid}/${date}`
    )
    let weatherJson = await weather.json()
    info.humidity = weatherJson[0].humidity
    info.temp = weatherJson[0].the_temp.toFixed(2)
    info.weather = `https://www.metaweather.com/static/img/weather/${weatherJson[0].weather_state_abbr}.svg`
    console.log(info.weather)

    let details = await fetch(
      `https://api.sunrise-sunset.org/json?lat=${city.latitude}&lng=${city.longitude}&date=${req.params.date}`
    )
    let detailsJson = await details.json()
    console.log(detailsJson)
    info.sunset = detailsJson.results.sunset
    info.sunrise = detailsJson.results.sunrise
    info.dayLength = detailsJson.results.day_length
    let temp = detailsJson.results.sunset.split(':')

    let golden = new Date()
    golden.setHours(temp[0] - 1)
    golden.setMinutes(temp[1])
    golden.setSeconds(temp[2].split(' ')[0])
    console.log(golden.toLocaleString())
    info.goldenHour = `${golden.getHours()}:${golden.getMinutes()}:${golden.getSeconds()}`
    info.city = city.name
    res.status(200).send(info)
  } catch (error) {
    res.status(500).send(error)
  }
})

//get names of cities from db
router.get('/cities', async (req, res) => {
  const cities = await Capital.find({})
  res.status(200).send(cities)
})

module.exports = router
