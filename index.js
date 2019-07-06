const express = require('express')
const bodyParser = require('body-parser')

/*
  healthcheck router
*/
const healthcheckRouter = express.Router()
healthcheckRouter.get('/', (req, res) => {
  res.json({ status: 'WORKING' })
})

/*
  news router
*/
let news = []
const newsRouter = express.Router()
newsRouter.get('/', (req, res) => {
  res.json(news)
})

newsRouter.post('/', (req, res) => {
  const data = {
    title: req.body.title || 'Default title',
    text: req.body.text || 'Default text',
    published: Date.now(),
  }

  news = [data, ...news]
  res.status(201)
  res.end()
})

/*
  news router
*/
const port = process.env.PORT || 3000
const app = express()
app.use(bodyParser.json())
app.use('/healthcheck', healthcheckRouter)
app.use('/news', newsRouter)

app.listen(port, () => console.log(`push-service-demo-app listening on port ${port}`))
