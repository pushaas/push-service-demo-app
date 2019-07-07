const express = require('express')
const bodyParser = require('body-parser')
const uuidv4 = require('uuid/v4')

/*
  env
*/
const port = process.env.PORT || 8888
const endpoint = process.env.PUSHAAS_ENDPOINT
const username = process.env.PUSHAAS_USERNAME
const password = process.env.PUSHAAS_PASSWORD

// const pushApiClient = new PushApiClient({
//   endpoint,
//   username,
//   password,
// })

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
})

newsRouter.delete('/:id', (req, res) => {
  const { id } = req.params
  news = news.filter(n => n.id !== id)

  res.status(204)
  res.end()
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
const main = () => {
  const app = express()
  app.use(bodyParser.json())
  app.use('/api', apiRouter)
  app.listen(port, () => console.log(`push-service-demo-app listening on port ${port}`)) // eslint-disable-line no-console
}

main()
