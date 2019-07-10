const PushApiClient = require('push-api-client-javascript')
const env = require('../util/env')

const endpoint = env.PUSHAAS_ENDPOINT()
const username = env.PUSHAAS_USERNAME()
const password = env.PUSHAAS_PASSWORD()

const options = {
  endpoint,
  username,
  password,
}

const axiosOptions = {
  timeout: 2000,
}

module.exports = new PushApiClient(options, axiosOptions)
