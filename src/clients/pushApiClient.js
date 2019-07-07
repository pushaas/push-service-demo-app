const PushApiClient = require('push-api-client-javascript')

const endpoint = process.env.PUSHAAS_ENDPOINT
const username = process.env.PUSHAAS_USERNAME
const password = process.env.PUSHAAS_PASSWORD

module.exports = new PushApiClient({
  endpoint,
  username,
  password,
})
