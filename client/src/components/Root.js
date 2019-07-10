import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

import SystemError from './common/SystemError'
import configService from '../services/configService'
import ConfigContext from '../contexts/ConfigContext'
import App from './App'

function Root() {
  const [config, setConfig] = useState(null)
  useEffect(() => {
    configService.getConfig()
      .then(setConfig)
      .catch((err) => {
        toast.error(SystemError)
        console.error('[Root] failed to get config', err)
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
