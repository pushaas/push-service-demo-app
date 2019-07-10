import React, { useContext, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'

import ConfigContext from '../contexts/ConfigContext'
import usePushStreamArticleMessage from '../hooks/usePushStreamArticleMessage'
import usePushStreamInstance from '../hooks/usePushStreamInstance'

function ReadArticle({ location: { state: { article: originalArticle }} }) {
  const config = useContext(ConfigContext)
  const [article, setArticle] = useState({ ...originalArticle })
  const [redirect, setRedirect] = useState(false)
  const [pushStreamInstance, setPushStreamInstance] = useState(null)

  const onCreate = () => {} // you can't create this article at this page, it was already created ;)
  const onDelete = () => {
    setRedirect(true)
    toast.warn('The article you were reading was removed! 😭')
  }
  const onUpdate = (updatedArticle) => {
    setArticle({...updatedArticle})
    toast.info('The article was updated, check it out! 😉')
  }

  const { port, hostname: host } = config.pushStream
  const channel = config.channels.article.replace('<article>', article.id)
  usePushStreamInstance(setPushStreamInstance, port, host, channel)
  usePushStreamArticleMessage(pushStreamInstance, setPushStreamInstance, onCreate, onDelete, onUpdate)

  if (redirect) {
    return (
      <Redirect to="/read"/>
    )
  }

  return (
    <div className="ReadArticle">
      <div className="ReadArticle-article">
        <h3 className="ReadArticle-title">{article.title}</h3>
        <p className="ReadArticle-text">{article.text}</p>
      </div>
    </div>
  )
}

export default ReadArticle
