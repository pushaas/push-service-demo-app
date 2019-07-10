import { useEffect } from 'react'

const usePushStreamArticleMessage = (
  pushStreamInstance,
  setPushStreamInstance,
  onCreate = () => {},
  onDelete = () => {},
  onUpdate = () => {},
) => {
  useEffect(() => {
    if (!pushStreamInstance) {
      return
    }

    const onMessage = (text) => {
      if (text === 'ping') {
        return
      }

      const message = JSON.parse(text)
      const { action, data: article } = message

      switch (action) {
        case 'create':
          onCreate(article)
          return
        case 'delete':
          onDelete(article)
          return
        case 'update':
          onUpdate(article)
          return
        default:
          console.warn('[Read] unhandled message', message)
          return
      }
    }
    pushStreamInstance.onmessage = onMessage
  }, [pushStreamInstance, setPushStreamInstance, onCreate, onDelete, onUpdate])
}

export default usePushStreamArticleMessage
