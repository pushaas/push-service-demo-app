require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const pushService = require('./services/pushService')
const apiRouter = require('./routers/api')

const checkServices = require('./util/checkServices')
const env = require('./util/env')
const initArticlesData = require('./util/initArticlesData')

// verifies the required environment variables
const initEnvironment = () => env.setupEnv()

// verifies whether the services this app depends on are running
const initCheckServices = async () => {
  await checkServices()
}

// initializes sample data
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

  const port = env.PORT() || 8888
  app.listen(port, () => console.log(`push-service-demo-app listening on port ${port}`))
}

const main = async () => {
  initEnvironment()
  await initCheckServices()
  await initData()
  initApp()
}

main()
