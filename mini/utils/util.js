const CryptoJS = require('./cryptojs');

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

function getWebsocketUrl() {
  return new Promise((resolve) => {
      var apiKey = API_KEY
      var apiSecret = API_SECRET
      var url = 'wss://spark-api.xf-yun.com/v3.1/chat'
      var host = location.host
      var date = new Date().toGMTString()
      var algorithm = 'hmac-sha256'
      var headers = 'host date request-line'
      var signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v1.1/chat HTTP/1.1`
      var signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret)
      var signature = CryptoJS.enc.Base64.stringify(signatureSha)
      var authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`
      var authorization = btoa(authorizationOrigin)
      url = `${url}?authorization=${authorization}&date=${date}&host=${host}`
      resolve(url)
  })
}

module.exports = {
  formatTime,
  getWebsocketUrl
}
