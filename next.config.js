const publicApiOrigin = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'http://118.27.0.46:8000'
  } else if (process.env.NODE_ENV === 'staging') {
    return 'http://127.0.0.1:8090'
  } else {
    return 'http://127.0.0.1:18080'
  }
}

module.exports = {
  publicRuntimeConfig: {
    apiOrigin: process.env.API_ORIGIN,
    publicApiOrigin: publicApiOrigin(),
  },
}
