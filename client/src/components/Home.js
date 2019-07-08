import React from 'react'

import NewTabLink from './common/NewTabLink'

function Home() {
  return (
    <div className="Home">
      <p>
        Welcome to the <NewTabLink href="https://github.com/rafaeleyng/push-service-demo-app">Push Service Demo App</NewTabLink>!
      </p>
      <p>
        <small>
          Open a couple of tabs. Create, edit and delete some articles.
        </small>
      </p>
      <p>
        <small>
          Check how everything updates in real time in all tabs!
        </small>
      </p>
    </div>
  )
}

export default Home
