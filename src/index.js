require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const uuidv4 = require('uuid/v4')
const PushApiClient = require('push-api-client-javascript')

/*
  env
*/
const port = process.env.PORT || 8888
const endpoint = process.env.PUSHAAS_ENDPOINT
const username = process.env.PUSHAAS_USERNAME
const password = process.env.PUSHAAS_PASSWORD

const pushApiClient = new PushApiClient({
  endpoint,
  username,
  password,
})

/*
  push channels
*/
const newsChannel = () => 'channel-news'
const newChannel = id => `channel-new-${id}`

/*
  healthcheck router
*/
const healthcheckRouter = express.Router()

healthcheckRouter.get('/', (req, res) => {
  res.json({ status: 'WORKING' })
})

/*
  config router
*/
const configRouter = express.Router()

configRouter.get('/', (req, res) => {
  res.json({})
})

/*
  news router
*/
let news = [
  {
    id: uuidv4(),
    published: new Date(),
    text: 'Brazil x France will match up next Sunday in Paris.',
    title: 'Soccer World Cup Finals!',
  },
  {
    id: uuidv4(),
    published: new Date(),
    text: 'We\'ve played the game and it is awesome. Great graphics and game mechanics, plus 4 new civilizations.',
    title: 'Age Of Empires 2 Definitive Edition',
  },
]

const newsRouter = express.Router()

newsRouter.get('/', (req, res) => {
  res.json(news)
})

newsRouter.post('/', (req, res) => {
  const data = {
    id: uuidv4(),
    published: new Date(),
    text: req.body.text || 'Default text',
    title: req.body.title || 'Default title',
  }
  news = [data, ...news]

  res.status(201)
  res.end()

  // notify the creation of this new on the news channel
  const message = {
    channels: [newsChannel()],
    content: JSON.stringify({
      action: 'create',
      data,
    }),
  }
  pushApiClient.postMessage(message)
    .then(() => console.log('[newsRouter.post] did send message with new', data.id))
    .catch(() => console.error('[newsRouter.post] failed to send message with new', data.id))

  // create a specific channel for this new
  const channel = {
    id: newChannel(data.id),
    ttl: 86400, // 1 day in seconds
  }
  pushApiClient.createChannel(channel)
    .then(() => console.log('[newsRouter.post] did create channel', channel.id))
    .catch(() => console.error('[newsRouter.post] failed to create channel', channel.id))
})

newsRouter.delete('/:id', (req, res) => {
  const { id } = req.params
  const deletedNew = news.find(n => n.id === id)
  news = news.filter(n => n !== deletedNew)

  res.status(204)
  res.end()

  // notify the creation of this new on the news channel
  const message = {
    channels: [newsChannel()],
    content: JSON.stringify({
      action: 'delete',
      data: deletedNew,
    }),
  }
  pushApiClient.postMessage(message)
    .then(() => console.log('[newsRouter.delete] did send message with deleted', id))
    .catch(() => console.error('[newsRouter.delete] failed to send message with deleted', id))

  // delete specific channel for this new
  pushApiClient.deleteChannel(id)
    .then(() => console.log('[newsRouter.delete] did delete channel', id))
    .catch(() => console.error('[newsRouter.delete] failed to delete channel', id))
})

/*
  api router
*/
const apiRouter = express.Router()
apiRouter.use('/healthcheck', healthcheckRouter)
apiRouter.use('/config', configRouter)
apiRouter.use('/news', newsRouter)

/*
  main
*/
const main = async () => {
  try {
    await pushApiClient.ensureChannel(newsChannel())
  } catch (err) {
    console.error('Could not ensure news channel', err)
    return
  }

  const app = express()
  app.use(bodyParser.json())
  app.use('/api', apiRouter)
  app.listen(port, () => console.log(`push-service-demo-app listening on port ${port}`))
}

main()
