const DEFAULT_PORT = 8888

const PORT = () => process.env.PORT || DEFAULT_PORT
const PUSHAAS_ENDPOINT = () => process.env.PUSHAAS_ENDPOINT
const PUSHAAS_USERNAME = () => process.env.PUSHAAS_USERNAME
const PUSHAAS_PASSWORD = () => process.env.PUSHAAS_PASSWORD

const setupEnv = () => {
  let hasError = false

  const requiredServiceVar = (name) => {
    hasError = true
    console.error(`[setupEnv] required ${name} variable is not set. This variable is set when the push-service instance is bound to the app. Did you create an instance of the push-service and bind it to the current app?`)
  }

  if (!PORT()) {
    console.info(`[setupEnv] PORT variable not set, using default ${DEFAULT_PORT}`)
  }

  if (!PUSHAAS_ENDPOINT()) {
    requiredServiceVar('PUSHAAS_ENDPOINT')
  }
  if (!PUSHAAS_USERNAME()) {
    requiredServiceVar('PUSHAAS_USERNAME')
  }
  if (!PUSHAAS_PASSWORD()) {
    requiredServiceVar('PUSHAAS_PASSWORD')
  }

  if (hasError) {
    throw new Error('[setupEnv] some errors were found while checking the environment. Please read the logs above.')
  }
}

module.exports = {
  setupEnv,

  PORT,
  PUSHAAS_ENDPOINT,
  PUSHAAS_USERNAME,
  PUSHAAS_PASSWORD,
}
