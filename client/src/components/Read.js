import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'

import articlesService from '../services/articlesService'
import ConfigContext from '../contexts/ConfigContext'
import usePushStreamArticleMessage from '../hooks/usePushStreamArticleMessage'
import usePushStreamInstance from '../hooks/usePushStreamInstance'

function Read({ match }) {
  const config = useContext(ConfigContext)
  const [articles, setArticles] = useState([])
  const [pushStreamInstance, setPushStreamInstance] = useState(null)

  const onCreate = (article) => {
    setArticles([article, ...articles])
    toast.success('A new article is out! 🤩')
  }
  const onDelete = (article) => setArticles(articles.filter(a => a.id !== article.id))
  const onUpdate = (article) => setArticles(articles.map(a => a.id === article.id ? article : a))

  const { port, hostname: host } = config.pushStream
  const channel = config.channels.articles
  usePushStreamInstance(setPushStreamInstance, port, host, channel)
  usePushStreamArticleMessage(pushStreamInstance, setPushStreamInstance, onCreate, onDelete, onUpdate)

  useEffect(() => {
    articlesService.getArticles()
      .then(setArticles)
      .catch((err) => {
        toast.error('Failed to get articles. Ensure that both the push-service-demo-app and the push-api are running')
        console.error('Failed to get articles', err)
      })
  }, [])

  return (
    <div className="Read">
      <h2 className="App-subtitle">Read Articles</h2>
      <div className="Read-articles">
        {articles.map(article => (
          <article key={article.id} className="Read-article">
              <h3 className="Read-title">{article.title}</h3>
              <div className="Read-links">
                <NavLink to={{pathname: `${match.url}/${article.id}`, state: { article }}} className="App-link">Read more</NavLink>
                <NavLink to={{pathname: `/publish/${article.id}`, state: { article }}} className="App-link">Edit article</NavLink>
              </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default Read
