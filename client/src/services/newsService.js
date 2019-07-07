const postNew = (data) => fetch('/api/news', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data)
})

const getNews = () => fetch('/api/news')
  .then(res => res.json())

export default {
  getNews,
  postNew,
}
