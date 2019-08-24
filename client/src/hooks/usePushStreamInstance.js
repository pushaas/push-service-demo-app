import { useEffect } from 'react'
import { toast } from 'react-toastify'

import pushStreamService from '../services/pushStreamService'
import SystemError from '../components/common/SystemError'

const usePushStreamInstance = (setPushStreamInstance, pushStreamConfig, channel) => {
  useEffect(() => {
    if (!pushStreamConfig) {
      return () => {}
    }

    const { port, hostname: host } = pushStreamConfig
    const settings = {
      host,
      port,
      modes: 'eventsource',
      messagesPublishedAfter: 900,
      messagesControlByArgument: true,
      onerror: (err) => {
        toast.error(SystemError)
        console.error('[usePushStreamInstance.onerror] failed to connect to push-stream', err)
      },
    }

    const instance = pushStreamService.newPushStreamInstance(settings)
    setPushStreamInstance(instance)
    instance.addChannel(channel)
    instance.connect()

    return () => {
      instance.disconnect()
    }
  }, [setPushStreamInstance, pushStreamConfig, channel])
}

export default usePushStreamInstance
