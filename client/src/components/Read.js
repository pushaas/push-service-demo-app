import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'

import articlesService from '../services/articlesService'
import pushStreamService from '../services/pushStreamService'

import ConfigContext from '../contexts/ConfigContext'

function Read({ match }) {
  const config = useContext(ConfigContext)
  const [articles, setArticles] = useState([])
  const [pushStreamInstance, setPushStreamInstance] = useState(null)

  useEffect(() => {
    articlesService.getArticles()
      .then(setArticles)
      .catch((err) => {
        toast.error('Failed to get articles. Ensure that both the push-service-demo-app and the push-api are running')
        console.error('Failed to get articles', err)
      })
  }, [])

  useEffect(() => {
    const { port } = config.pushStream
    const host = config.pushStream.hostname
    const articlesChannel = config.channels.articles

    const settings = {
      host,
      port,
      modes: 'eventsource',
      messagesPublishedAfter: 900,
      messagesControlByArgument: true,
      onerror: (err) => console.error('[onerror]', err),
    }

    const instance = pushStreamService.newPushStreamInstance(settings)
    setPushStreamInstance(instance)
    instance.addChannel(articlesChannel)
    instance.connect()

    return () => {
      instance.disconnect()
    }
  }, [setPushStreamInstance, config])

  useEffect(() => {
    if (!pushStreamInstance) {
      return
    }

    const onMessage = (text, id, channel, eventId, isLastMessageFromBatch, time) => {
      if (text === 'ping') {
        return
      }

      const message = JSON.parse(text)
      const { action, data: article } = message
      if (action === 'create') {
        setArticles([article, ...articles])
        return
      }

      if (action === 'delete') {
        setArticles(articles.filter(a => a.id !== article.id))
        return
      }

      if (action === 'delete') {
        setArticles(articles.filter(a => a.id !== article.id))
        return
      }

      if (action === 'update') {
        setArticles(articles.map(a => a.id === article.id ? article : a))
        return
      }

      console.warn('[Read] unhandled message', message)
    }
    pushStreamInstance.onmessage = onMessage
  }, [pushStreamInstance, articles])

  return (
    <div className="Read">
      <h2 className="App-subtitle">Read Articles</h2>
      <div className="Read-articles">
        {articles.map(article => (
          <article key={article.id} className="Read-article">
              <h3 className="Read-title">{article.title}</h3>
              <NavLink to={`${match.url}/${article.id}`} className="App-link">Read more</NavLink>
          </article>
        ))}
      </div>
    </div>
  )
}

export default Read
