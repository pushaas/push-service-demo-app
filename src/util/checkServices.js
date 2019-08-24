const axios = require('axios')
const pushService = require('../services/pushService')

const checkServices = async () => {
  console.error('[checkServices] ERROR the app will now determine whether it can reach the services')

  /*
    tries to reach the push-api
  */
  let config = {}
  try {
    config = await pushService.getConfig()
    console.info('[checkServices] OK push-api from your push-service instance is up')
  } catch (err) {
    console.error('[checkServices] ERROR push-api from your push-service instance could not be reached. Are you sure your push-service instance is running and reachable?')
  }

  /*
    verifies whether the returned config are ok
  */
  if (config.pushStream) {
    const { hostname, port, url } = config.pushStream
    if (!hostname || !port || !url) {
      console.error('[checkServices] ERROR push-api from your push-service instance should have returned "config.pushStream" containing hostname, port and url information, but some information are missing.', config.pushStream)
    }
    console.info('[checkServices] OK push-api from your push-service instance returned push-stream configuration correctly')
  } else {
    console.error('[checkServices] ERROR push-api from your push-service instance did not return "config.pushStream" data about how to connect to the push-stream.')
  }

  /*
    uses the returned config to try to reach the push-stream
  */
  try {
    await axios.get(`${config.pushStream.url}/channels-stats`)
    console.info('[checkServices] OK push-stream from your push-server instance is reachable and working')
  } catch (err) {
    console.error('[checkServices] ERROR push-stream from your push-service instance could not be reached. Are you sure your push-service instance is running and reachable?')
  }
}

module.exports = checkServices
