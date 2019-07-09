const express = require('express')

const articlesService = require('../../services/articlesService')
const pushService = require('../../services/pushService')

const router = express.Router()

router.get('/', (req, res) => {
  res.json(articlesService.getAll())
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  const article = articlesService.get(id)
  if (article) {
    res.json(article)
    return
  }

  res.status(404)
  res.end()
})

router.post('/', async (req, res) => {
  const article = articlesService.create(req.body)

  res.status(201)
  res.end()

  await pushService.sendCreationOnArticlesChannel(article)
  await pushService.createArticleChannel(article)
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const article = articlesService.update(id, req.body)

  res.json(article)

  await pushService.sendUpdateOnArticlesChannel(article)
  await pushService.sendUpdateOnArticleChannel(article)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const article = articlesService.remove(id)

  if (article) {
    res.status(204)
    res.end()

    await pushService.sendDeletionOnArticlesChannel(article)
    await pushService.sendDeletionOnArticleChannel(article)
    await pushService.deleteArticleChannel(article)
    return
  }

  res.status(404)
  res.end()
})

module.exports = router
