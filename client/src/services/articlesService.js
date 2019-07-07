const postArticle = (data) => fetch('/api/articles', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data)
})

const getArticles = () => fetch('/api/articles')
  .then(res => res.json())

export default {
  getArticles,
  postArticle,
}
