const express = require('express')
const uuidv4 = require('uuid/v4')

const pushService = require('../../services/pushService')

const router = express.Router()

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

router.get('/', (req, res) => {
  res.json(news)
})

router.post('/', (req, res) => {
  const toCreate = {
    id: uuidv4(),
    published: new Date(),
    text: req.body.text || 'Default text',
    title: req.body.title || 'Default title',
  }
  news = [toCreate, ...news]

  res.status(201)
  res.end()

  // notify the creation of this new on the news channel
  pushService.postMessageNewsCreation(toCreate)

  // create a specific channel for this new
  pushService.createChannelNew(toCreate)
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  const toDelete = news.find(n => n.id === id)
  news = news.filter(n => n !== toDelete)

  res.status(204)
  res.end()

  // notify the deletion of this new on the news channel
  pushService.postMessageNewsDeletion(toDelete)

  // delete specific channel for this new
  pushService.deleteChannelNew(toDelete)
})

module.exports = router
