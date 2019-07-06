import React from 'react'
import './App.css'

import { BrowserRouter as Router, Route, Link } from "react-router-dom"

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
  return (
    <div className="Read">
      Read
    </div>
  )
}

function Publish() {
  return (
    <div className="Publish">
      Publish
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
            <Link to="/read/" className="App-link App-nav">Read The News</Link>
            <Link to="/publish/" className="App-link App-nav">Publish News</Link>
          </nav>
        </header>

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
