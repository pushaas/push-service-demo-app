const channelNews = () => 'channel-news'
const channelNew = id => `channel-new-${id}`

const pushApiClient = require('../clients/pushApiClient')

const createChannelNew = (data) => {
  const channelId = channelNew(data.id)
  const channel = {
    id: channelId,
    ttl: 86400, // 1 day in seconds
  }

  return pushApiClient.createChannel(channel)
    .then(() => console.log('[createChannelNew] did create channel', channelId))
    .catch(() => console.error('[createChannelNew] failed to create channel', channelId))
}

const deleteChannelNew = (data) => {
  const channelId = channelNew(data.id)
  return pushApiClient.deleteChannel(channelId)
    .then(() => console.log('[newsRouter.delete] did delete channel', channelId))
    .catch(() => console.error('[newsRouter.delete] failed to delete channel', channelId))
}

const ensureChannelNews = () => pushApiClient.ensureChannel(channelNews())

const postMessageNewsCreation = (newData) => {
  const message = {
    channels: [channelNews()],
    content: JSON.stringify({
      action: 'create',
      data: newData,
    }),
  }

  pushApiClient.postMessage(message)
    .then(() => console.log('[postMessageNewsCreation] did send message with new creation', newData.id))
    .catch(() => console.error('[postMessageNewsCreation] failed to send message with new creation', newData.id))
}

const postMessageNewsDeletion = (newData) => {
  const message = {
    channels: [channelNews()],
    content: JSON.stringify({
      action: 'delete',
      data: newData,
    }),
  }

  pushApiClient.postMessage(message)
    .then(() => console.log('[postMessageNewsDeletion] did send message with new deletion', newData.id))
    .catch(() => console.error('[postMessageNewsDeletion] failed to send message with new deletion', newData.id))
}

module.exports = {
  createChannelNew,
  deleteChannelNew,
  ensureChannelNews,
  postMessageNewsCreation,
  postMessageNewsDeletion,
}
