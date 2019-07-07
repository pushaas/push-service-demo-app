import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'

import './App.css'
import newsService from '../services/newsService'


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
          Open a couple of tabs and check how the news are updated in real time.
        </small>
      </p>
    </div>
  )
}

function Read() {
  const [news, setNews] = useState([])

  useEffect(() => {
    newsService.getNews()
      .then((data) => setNews(data))
  }, [])

  return (
    <div className="Read">
      <h2 className="App-subtitle">Read The News</h2>
      <div className="Read-news">
        {news.map(n => (
          <article className="Read-new">
              <h3 className="Read-title">{n.title}</h3>
              <p className="Read-text">{n.text}</p>
          </article>
        ))}
      </div>
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

    const newData = {
      title,
      text,
    }

    newsService.postNew(newData)
      .then(() => {
        setTitle('')
        setText('')
      })
  }

  return (
    <div className="Publish">
      <h2 className="App-subtitle">Publish News</h2>
      <form className="Publish-form" onSubmit={handleSubmit}>
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
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Push Service Demo App</h1>
          <nav>
            <NavLink to="/read/" className="App-link App-nav" activeClassName="App-nav-active">Read The News</NavLink>
            <NavLink to="/publish/" className="App-link App-nav" activeClassName="App-nav-active">Publish News</NavLink>
          </nav>
        </header>

        <hr />

        <main className="App-main">
          <Route path="/" exact component={Home} />
          <Route path="/read/" component={Read} />
          <Route path="/publish/" component={Publish} />
        </main>
      </div>
    </Router>
  )
}

export default App

const useFormInput = (initial) => {
  const [value, setValue] = useState(initial)
  const handleChange = (e) => setValue(e.target.value)
  return [value, setValue, handleChange]
}
