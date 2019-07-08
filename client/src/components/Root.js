import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

import configService from '../services/configService'
import ConfigContext from '../contexts/ConfigContext'
import App from './App'

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
