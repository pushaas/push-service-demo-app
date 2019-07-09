const PushApiClient = require('push-api-client-javascript')

// TODO improve the check of these variables
const endpoint = process.env.PUSHAAS_ENDPOINT
const username = process.env.PUSHAAS_USERNAME
const password = process.env.PUSHAAS_PASSWORD

const options = {
  endpoint,
  username,
  password,
}

const axiosOptions = {
  timeout: 2000,
}

module.exports = new PushApiClient(options, axiosOptions)
