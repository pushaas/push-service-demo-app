import React from 'react'

const SystemError = () => (
  <div>
    <p>We couldn't connect the push service.</p>
    <p>Check whether the following projects are running correctly:</p>
    <ul>
      <li>push-service-demo-app API</li>
      <li>push-stream</li>
      <li>push-api</li>
    </ul>
  </div>
)

export default SystemError
