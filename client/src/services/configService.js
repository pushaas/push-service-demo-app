const getConfig = () => fetch('/api/config')
  .then(res => res.json())

export default {
  getConfig,
}
