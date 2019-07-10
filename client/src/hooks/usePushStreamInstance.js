import { useEffect } from 'react'

import pushStreamService from '../services/pushStreamService'

const usePushStreamInstance = (setPushStreamInstance, port, host, channel) => {
  useEffect(() => {
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
    instance.addChannel(channel)
    instance.connect()

    return () => {
      instance.disconnect()
    }
  }, [setPushStreamInstance, port, host, channel])
}

export default usePushStreamInstance
