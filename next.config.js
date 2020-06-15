const path = require('path')

console.log('API_URL: ' + process.env.NEXT_TODO_API_URL)
const getApiPrefix = () => {
  if (typeof process.env.NEXT_TODO_API_URL === 'undefined') {
    //設定がなければ自身のAPI

    return 'http://localhost:3000'
  } else {
    return process.env.NEXT_TODO_API_URL
  }
}

module.exports = {
  env: { apiPrefix: getApiPrefix() },
}
