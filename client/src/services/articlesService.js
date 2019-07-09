const getArticles = () => fetch('/api/articles')
  .then(res => res.json())

const getArticle = (id) => fetch(`/api/articles/${id}`)
  .then(res => res.json())

const postArticle = (data) => fetch('/api/articles', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data)
})

const putArticle = (id, data) => fetch(`/api/articles/${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data)
})

const deleteArticle = (id) => fetch(`/api/articles/${id}`, {
  method: 'DELETE',
})

export default {
  deleteArticle,
  getArticle,
  getArticles,
  postArticle,
  putArticle,
}
