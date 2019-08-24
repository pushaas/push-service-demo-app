import React, { useContext } from 'react'

import ConfigContext from '../contexts/ConfigContext'

function Banner() {
  const config = useContext(ConfigContext)
  const { status: { varsOk, servicesOk } } = config

  const wrapWithBanner = (message) => (
    <div className="Banner">
      <p><small>{message}</small></p>
      <p><small>This app will work, but news won't be updated in real time.</small></p>
    </div>
  )

  if (!varsOk) {
    return wrapWithBanner('The environment variables required to connect to the Push Service were not set. Did you create the Push Service instance and bind it to your app?')
  }

  if (!servicesOk) {
    return wrapWithBanner('The Push Service could not be reached. Did you create the Push Service instance and bind it to your app?')
  }

  return null
}

export default Banner
