require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const pushService = require('./services/pushService')
const apiRouter = require('./routers/api')
const initArticlesData = require('./util/initArticlesData')

const initEnv = () => {
  // TODO
}

const initData = async () => {
  try {
    await pushService.ensureArticlesChannel()
  } catch (err) {
    console.error('Could not ensure articles channel', err)
    throw err
  }

  try {
    await initArticlesData()
  } catch (err) {
    console.error('Could not init sample data', err)
    throw err
  }
}

const initApp = () => {
  const app = express()
  app.use(bodyParser.json())
  app.use(morgan('tiny'))
  app.use('/api', apiRouter)

  const port = process.env.PORT || 8888
  app.listen(port, () => console.log(`push-service-demo-app listening on port ${port}`))
}

const main = async () => {
  initEnv()
  await initData()
  initApp()
}

main()
