const pushService = require('../services/pushService')

const {
  PUSHAAS_ENDPOINT,
  PUSHAAS_USERNAME,
  PUSHAAS_PASSWORD,
} = require('./env')

const checkEnv = () => {
  let hasError = false

  console.error('[checkEnv] the app will now check if some required environment variables are defined')

  const checkVar = (varFn, name) => {
    if (!varFn()) {
      hasError = true
      console.error(`[checkEnv] ERROR required ${name} variable is NOT set. Did you create an instance of the push-service and bind it to the current app?`)
    } else {
      console.info(`[checkEnv] OK required ${name} variable is set.`)
    }
  }

  checkVar(PUSHAAS_ENDPOINT, 'PUSHAAS_ENDPOINT')
  checkVar(PUSHAAS_USERNAME, 'PUSHAAS_USERNAME')
  checkVar(PUSHAAS_PASSWORD, 'PUSHAAS_PASSWORD')

  if (hasError) {
    pushService.setVarsOk(false)
    console.error('[checkEnv] ERROR some errors were found while checking the environment variables. Please read the logs above')
  } else {
    console.info('[checkEnv] OK all required environment variables are set')
  }
}

module.exports = checkEnv
