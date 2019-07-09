const uuidv4 = require('uuid/v4')

const dataToArticle = data => ({
  id: data.id || uuidv4(),
  published: data.published || new Date(),
  updated: new Date(),
  text: data.text || 'Default text',
  title: data.title || 'Default title',
})

let articles = []

const getAll = () => articles

const get = id => articles.find(a => a.id === id)

const create = (data) => {
  const article = dataToArticle(data)
  articles = [article, ...articles]
  return article
}

const update = (id, data) => {
  const article = dataToArticle(data)
  const existing = articles.find(a => a.id === id)
  articles = articles.map(a => (a === existing ? article : a))
  return article
}

const remove = (id) => {
  const article = articles.find(a => a.id === id)
  articles = articles.filter(a => a !== article)
  return article
}

module.exports = {
  dataToArticle,

  getAll,
  get,
  create,
  update,
  remove,
}
