const DEFAULT_PORT = 8888

const PORT = () => process.env.PORT || DEFAULT_PORT
const PUSHAAS_ENDPOINT = () => process.env.PUSHAAS_ENDPOINT
const PUSHAAS_USERNAME = () => process.env.PUSHAAS_USERNAME
const PUSHAAS_PASSWORD = () => process.env.PUSHAAS_PASSWORD

module.exports = {
  PORT,
  PUSHAAS_ENDPOINT,
  PUSHAAS_USERNAME,
  PUSHAAS_PASSWORD,
}
