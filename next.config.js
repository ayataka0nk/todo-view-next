const path = require('path')

console.log('API_URL_FIRST: ' + process.env.NEXT_TODO_API_URL)
const getApiPrefix = () => {
  if (typeof process.env.NEXT_TODO_API_URL === 'undefined') {
    console.log('API_URL_IF_default: ' + process.env.NEXT_TODO_API_URL)
    //設定がなければ自身のAPI
    return 'http://localhost:3000'
  } else {
    console.log('API_URL_IF: ' + process.env.NEXT_TODO_API_URL)
    return process.env.NEXT_TODO_API_URL
  }
}

module.exports = {
  env: { apiPrefix: getApiPrefix() },
}
