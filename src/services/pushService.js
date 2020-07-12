const ARTICLE = 'article'
const CREATE = 'create'
const DELETE = 'delete'
const UPDATE = 'update'

const pushApiClient = require('../clients/pushApiClient')

const buildMessage = (channels, action, type, data) => ({
  channels,
  content: JSON.stringify({
    action,
    type,
    data,
  }),
})

/*
  articles channel
*/
const articlesChannelId = () => 'articles'

const ensureArticlesChannel = (silent = false) => {
  const channelId = articlesChannelId()
  return pushApiClient.ensureChannel(channelId)
    .then(() => console.log('[ensureArticlesChannel] did ensure channel', channelId))
    .catch(err => console.error('[ensureArticlesChannel] failed to ensure channel', channelId, silent ? '' : err))
}

const sendCreationOnArticlesChannel = article => pushApiClient.postMessage(buildMessage([articlesChannelId()], CREATE, ARTICLE, article))
  .then(() => console.log('[sendCreationOnArticlesChannel] did send message with article creation', article.id))
  .catch(err => console.error('[sendCreationOnArticlesChannel] failed to send message with article creation', article.id, err))

const sendDeletionOnArticlesChannel = article => pushApiClient.postMessage(buildMessage([articlesChannelId()], DELETE, ARTICLE, article))
  .then(() => console.log('[sendDeletionOnArticlesChannel] did send message with article deletion', article.id))
  .catch(err => console.error('[sendDeletionOnArticlesChannel] failed to send message with article deletion', article.id, err))

const sendUpdateOnArticlesChannel = article => pushApiClient.postMessage(buildMessage([articlesChannelId()], UPDATE, ARTICLE, article))
  .then(() => console.log('[sendUpdateOnArticlesChannel] did send message with article update', article.id))
  .catch(err => console.error('[sendUpdateOnArticlesChannel] failed to send message with article update', article.id, err))

/*
  article-<id> channel
*/
const articleChannelId = id => `article-${id}`

const articleChannelData = (article) => {
  const channelId = articleChannelId(article.id)
  return {
    id: channelId,
    ttl: 86400, // 1 day in seconds
  }
}

const createArticleChannel = (article) => {
  const channel = articleChannelData(article)
  return pushApiClient.createChannel(channel)
    .then(() => console.log('[createArticleChannel] did create channel', channel.id))
    .catch(err => console.error('[createArticleChannel] failed to create channel', channel.id, err))
}

const deleteArticleChannel = (article) => {
  const channelId = articleChannelId(article.id)
  return pushApiClient.deleteChannel(channelId)
    .then(() => console.log('[deleteArticleChannel] did delete channel', channelId))
    .catch(err => console.error('[deleteArticleChannel] failed to delete channel', channelId, err))
}

const ensureArticleChannel = (article, silent = false) => {
  const channel = articleChannelData(article)
  return pushApiClient.ensureChannel(channel.id, channel)
    .then(() => console.log('[ensureArticleChannel] did ensure channel', channel.id))
    .catch(err => console.error('[ensureArticleChannel] failed to ensure channel', channel.id, silent ? '' : err))
}

const sendDeletionOnArticleChannel = article => pushApiClient.postMessage(buildMessage([articleChannelId(article.id)], DELETE, ARTICLE, article))
  .then(() => console.log('[sendDeletionOnArticleChannel] did send message with article deletion', article.id))
  .catch(err => console.error('[sendDeletionOnArticleChannel] failed to send message with article deletion', article.id, err))

const sendUpdateOnArticleChannel = article => pushApiClient.postMessage(buildMessage([articleChannelId(article.id)], UPDATE, ARTICLE, article))
  .then(() => console.log('[sendUpdateOnArticleChannel] did send message with article update', article.id))
  .catch(err => console.error('[sendUpdateOnArticleChannel] failed to send message with article update', article.id, err))

/*
  config
*/
let varsOk = true
const setVarsOk = (status) => { varsOk = status }

let servicesOk = true
const setServicesOk = (status) => { servicesOk = status }

const getConfig = () => pushApiClient.getConfig()
  .then(data => ({
    ...data,
    status: {
      varsOk,
      servicesOk,
    },
    channels: {
      articles: articlesChannelId(),
      article: articleChannelId('<article>'),
    },
  }))
  .catch((err) => {
    console.error('[pushService] failed to get config from push-api, returning only local config')
    console.error('[pushService] err:', err.message)
    return {
      status: {
        varsOk,
        servicesOk,
      },
      channels: {},
    }
  })

module.exports = {
  // articles
  ensureArticlesChannel,
  sendCreationOnArticlesChannel,
  sendDeletionOnArticlesChannel,
  sendUpdateOnArticlesChannel,

  // article-<id>
  createArticleChannel,
  deleteArticleChannel,
  ensureArticleChannel,
  sendDeletionOnArticleChannel,
  sendUpdateOnArticleChannel,

  // config
  setVarsOk,
  setServicesOk,
  getConfig,
}
