const express = require('express')

const router = express.Router()

router.use('/healthcheck', require('./api/healthcheckRouter'))
router.use('/config', require('./api/configRouter'))
router.use('/articles', require('./api/articlesRouter'))

module.exports = router
