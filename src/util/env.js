const DEFAULT_PORT = 8888

const PORT = () => process.env.PORT || DEFAULT_PORT
const PUSHAAS_ENDPOINT = () => process.env.PUSHAAS_ENDPOINT
const PUSHAAS_USERNAME = () => process.env.PUSHAAS_USERNAME
const PUSHAAS_PASSWORD = () => process.env.PUSHAAS_PASSWORD

const setupEnv = () => {
  let hasError = false

  if (!PORT()) {
    console.info(`[setupEnv] PORT variable not set, using default ${DEFAULT_PORT}`)
  }

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
    console.error('[setupEnv] ERROR some errors were found while checking the environment. Please read the logs above')
  } else {
    console.info('[setupEnv] OK all required environment variables are set')
  }
}

module.exports = {
  setupEnv,

  PORT,
  PUSHAAS_ENDPOINT,
  PUSHAAS_USERNAME,
  PUSHAAS_PASSWORD,
}
