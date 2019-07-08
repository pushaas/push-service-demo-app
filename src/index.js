require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const pushService = require('./services/pushService')
const apiRouter = require('./routers/api')

const main = async () => {
  try {
    await pushService.ensureArticlesChannel()
  } catch (err) {
    console.error('Could not ensure articles channel', err)
    return
  }

  const app = express()
  app.use(bodyParser.json())
  app.use(morgan('tiny'))
  app.use('/api', apiRouter)

  const port = process.env.PORT || 8888
  app.listen(port, () => console.log(`push-service-demo-app listening on port ${port}`))
}

main()
