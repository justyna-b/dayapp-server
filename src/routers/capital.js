const express = require('express')
const router = new express.Router()
const Capital = require('../models/Capital')


router.post('/city', async (req, res) => {
  const capital = new Capital(req.body)
  try {
    await capital.save()
    res
      .status(201)
      .send({ capital: capital, msg: 'The city has been added' })
  } catch (error) {
    res.status(406).send(error)
  }
})

module.exports = router
