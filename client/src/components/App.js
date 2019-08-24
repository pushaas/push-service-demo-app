import React, { Fragment, useContext } from 'react'
import { Route, NavLink } from 'react-router-dom'

import ConfigContext from '../contexts/ConfigContext'
import Banner from './Banner'
import Home from './Home'
import Read from './Read'
import ReadArticle from './ReadArticle'
import Publish from './Publish'

function App() {
  const config = useContext(ConfigContext)
  const loading = (null)
  const loaded = (
    <Fragment>
      <Banner />
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
        <Route path="/publish/:id?" exact component={Publish} />
      </main>
    </Fragment>
  )

  return (
    <div className="App">
      {config ? loaded : loading}
    </div>
  )
}

export default App
