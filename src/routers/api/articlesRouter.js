const express = require('express')
const uuidv4 = require('uuid/v4')

const pushService = require('../../services/pushService')

const router = express.Router()

let articles = [
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

router.get('/', (req, res) => {
  res.json(articles)
})

router.post('/', (req, res) => {
  const article = {
    id: uuidv4(),
    published: new Date(),
    text: req.body.text || 'Default text',
    title: req.body.title || 'Default title',
  }
  articles = [article, ...articles]

  res.status(201)
  res.end()

  pushService.postMessageArticleCreation(article) // notify the creation of this article on the articles channel
  pushService.createArticleChannel(article) // create a specific channel for this article
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  const article = articles.find(n => n.id === id)
  articles = articles.filter(n => n !== article)

  res.status(204)
  res.end()

  pushService.postMessageArticleDeletion(article) // notify the deletion of this article on the articles channel
  pushService.deleteArticleChannel(article) // delete specific channel for this article
})

module.exports = router
