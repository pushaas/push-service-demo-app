const articlesChannel = () => 'channel-articles'
const articleChannel = id => `channel-article-${id}`

const pushApiClient = require('../clients/pushApiClient')

const createArticleChannel = (article) => {
  const channelId = articleChannel(article.id)
  const channel = {
    id: channelId,
    ttl: 86400, // 1 day in seconds
  }

  return pushApiClient.createChannel(channel)
    .then(() => console.log('[createArticleChannel] did create channel', channelId))
    .catch(() => console.error('[createArticleChannel] failed to create channel', channelId))
}

const deleteArticleChannel = (article) => {
  const channelId = articleChannel(article.id)
  return pushApiClient.deleteChannel(channelId)
    .then(() => console.log('[deleteArticleChannel] did delete channel', channelId))
    .catch(() => console.error('[deleteArticleChannel] failed to delete channel', channelId))
}

const ensureArticlesChannel = () => pushApiClient.ensureChannel(articlesChannel())

const postMessageArticleCreation = (article) => {
  const message = {
    channels: [articlesChannel()],
    content: JSON.stringify({
      action: 'create',
      type: 'article',
      data: article,
    }),
  }

  pushApiClient.postMessage(message)
    .then(() => console.log('[postMessageArticleCreation] did send message with article creation', article.id))
    .catch(() => console.error('[postMessageArticleCreation] failed to send message with article creation', article.id))
}

const postMessageArticleDeletion = (article) => {
  const message = {
    channels: [articlesChannel()],
    content: JSON.stringify({
      action: 'delete',
      type: 'article',
      data: article,
    }),
  }

  pushApiClient.postMessage(message)
    .then(() => console.log('[postMessageArticleDeletion] did send message with article deletion', article.id))
    .catch(() => console.error('[postMessageArticleDeletion] failed to send message with article deletion', article.id))
}

module.exports = {
  createArticleChannel,
  deleteArticleChannel,
  ensureArticlesChannel,
  postMessageArticleCreation,
  postMessageArticleDeletion,
}
