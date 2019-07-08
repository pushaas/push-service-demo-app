import React, { Fragment, useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

import './Root.css'

import articlesService from '../services/articlesService'
import configService from '../services/configService'
import pushStreamService from '../services/pushStreamService'

import ConfigContext from '../contexts/ConfigContext'

function NewTabLink({ href, children }) {
  return (
    <a className="App-link" href={href} target="_blank" rel="noopener noreferrer">{children}</a>
  )
}

function Home() {
  return (
    <div className="Home">
      <p>
        Welcome to the <NewTabLink href="https://github.com/rafaeleyng/push-service-demo-app">Push Service Demo App</NewTabLink>!
      </p>
      <p>
        <small>
          Open a couple of tabs and check how the articles are updated in real time.
        </small>
      </p>
    </div>
  )
}

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
    console.log('### useEffect')
    const onMessage = (text, id, channel, eventId, isLastMessageFromBatch, time) => {
      if (text === 'ping') {
        return
      }

      const message = JSON.parse(text)
      const { action, data } = message
      console.log('### message', message)
      if (action === 'create') {
        setArticles([data, ...articles])
        return
      }
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

function ReadArticle({ match }) {
  return (
    <div>
      {match.params.id}
    </div>
  )
}

function Publish() {
  const [title, setTitle, handleTitleChange] = useFormInput('')
  const [text, setText, handleTextChange] = useFormInput('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title) {
      alert('Title is required')
      return
    }

    if (!text) {
      alert('Text is required')
      return
    }

    const articleData = {
      title,
      text,
    }

    articlesService.postArticle(articleData)
      .then(() => {
        setTitle('')
        setText('')
      })
      .catch((err) => {
        toast.error('Failed to post article. Ensure that both the push-service-demo-app and the push-api are running')
        console.error('Failed to post article', err)
      })
  }

  return (
    <div className="Publish">
      <h2 className="App-subtitle">Publish Articles</h2>
      <form className="Publish-form" autoComplete="off" onSubmit={handleSubmit}>
        <div className="Publish-field">
          <label htmlFor="title">Title</label>
          <input name="title" value={title} onChange={handleTitleChange} />
        </div>
        <div className="Publish-field">
          <label htmlFor="text">Text</label>
          <textarea name="title" value={text} onChange={handleTextChange} />
        </div>

        <div className="Publish-field">
          <button type="submit" className="Publish-button">Publish</button>
        </div>
      </form>
    </div>
  )
}

function App() {
  const config = useContext(ConfigContext)
  const loading = (null)
  const loaded = (
    <Fragment>
      <header className="App-header">
        <h1 className="App-title">Push Service Demo App</h1>
        <nav>
          <NavLink exact to="/" className="App-link App-nav" activeClassName="App-nav-active">Home</NavLink>
          <NavLink exact to="/read" className="App-link App-nav" activeClassName="App-nav-active">Read Articles</NavLink>
          <NavLink exact to="/publish" className="App-link App-nav" activeClassName="App-nav-active">Publish Articles</NavLink>
        </nav>
      </header>

      <hr />

      <main className="App-main">
        <Route path="/" exact component={Home} />
        <Route path="/read" exact component={Read} />
        <Route path="/read/:id" exact component={ReadArticle} />
        <Route path="/publish" exact component={Publish} />
      </main>
    </Fragment>
  )

  return (
    <div className="App">
      {config ? loaded : loading}
    </div>
  )
}

function Root() {
  const [config, setConfig] = useState(null)
  useEffect(() => {
    configService.getConfig()
      .then(setConfig)
      .catch((err) => {
        toast.error('Failed to get config. Ensure that both the push-service-demo-app and the push-api are running')
        console.error('Failed to get config', err)
      })
  }, [])

  return (
    <Router>
      <ToastContainer />
      <ConfigContext.Provider value={config}>
        <App />
      </ConfigContext.Provider>
    </Router>
  )
}

export default Root

const useFormInput = (initial) => {
  const [value, setValue] = useState(initial)
  const handleChange = (e) => setValue(e.target.value)
  return [value, setValue, handleChange]
}
