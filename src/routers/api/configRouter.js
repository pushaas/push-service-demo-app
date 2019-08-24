const express = require('express')

const pushService = require('../../services/pushService')

const router = express.Router()

router.get('/', (req, res) => {
  pushService.getConfig()
    .then(data => res.json(data))
    .catch((err) => {
      console.error('[configRouter.get] error getting config data from push-api', err)
      res.status(500)
      res.end()
    })
})

module.exports = router
