const pushService = require('../services/pushService')

const {
  PUSHAAS_ENDPOINT,
  PUSHAAS_USERNAME,
  PUSHAAS_PASSWORD,
} = require('./env')

const checkEnv = () => {
  let hasError = false

  console.error('[setupEnv] the app will now check if some required environment variables are defined')

  const checkVar = (varFn, name) => {
    if (!varFn()) {
      hasError = true
      console.error(`[setupEnv] ERROR required ${name} variable is NOT set. Did you create an instance of the push-service and bind it to the current app?`)
    } else {
      console.info(`[setupEnv] OK required ${name} variable is set.`)
    }
  }

  checkVar(PUSHAAS_ENDPOINT, 'PUSHAAS_ENDPOINT')
  checkVar(PUSHAAS_USERNAME, 'PUSHAAS_USERNAME')
  checkVar(PUSHAAS_PASSWORD, 'PUSHAAS_PASSWORD')

  if (hasError) {
    pushService.setVarsOk(false)
    console.error('[setupEnv] ERROR some errors were found while checking the environment variables. Please read the logs above')
  } else {
    console.info('[setupEnv] OK all required environment variables are set')
  }
}

module.exports = checkEnv
