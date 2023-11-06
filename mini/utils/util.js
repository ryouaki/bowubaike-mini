const CryptoJS = require('./cryptojs/index.js');
const base64 = require('./base64/index.js');

const API_KEY = 'b5eebfa6e21f449c6491eb7caeffae60';
const API_SECRET = 'YTVjYTdlOTJjZDNiNzRmZjU2NzQ4OGI2';

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
  var url = "wss://spark-api.xf-yun.com/v2.1/chat";
  var host = "spark-api.xf-yun.com";
  var apiKeyName = "api_key";
  var date = new Date().toGMTString();
  var algorithm = "hmac-sha256";
  var headers = "host date request-line";
  var signatureOrigin = "host: ".concat(host, "\ndate: ").concat(date, "\nGET /v2.1/chat HTTP/1.1");
  var signatureSha = CryptoJS.HmacSHA256(signatureOrigin, API_SECRET);
  var signature = CryptoJS.enc.Base64.stringify(signatureSha);
  var authorizationOrigin = "".concat(apiKeyName, "=\"").concat(API_KEY, "\", algorithm=\"").concat(algorithm, "\", headers=\"").concat(headers, "\", signature=\"").concat(signature, "\"");
  var authorization = base64.encode(authorizationOrigin);
  url = "".concat(url, "?authorization=").concat(authorization, "&date=").concat(encodeURI(date), "&host=").concat(host);
  return url
}

function getWebsocket() {
  return new Promise((resolve, reject) => {
    let _webSocket = wx.connectSocket({
      url: getWebsocketUrl(),
      fail: () =>  {
        _webSocket = undefined;
      }
    });
    resolve(_webSocket)
  })
}

function sendMessage(message, socket) {
  const app = getApp();
  const uuid = app.globalData.code;
  const prompt = {
    "header": {
      "app_id": '240be67e',
      "uid": uuid
    },
    "parameter": {
      "chat": {
        "domain": "generalv2",
        "temperature": 0.5,
        "max_tokens": 256
      }
    },
    "payload": {
      "message": {
        "text": [
          {
            "role": "user",
            "content": `假设你是导游或者博物馆解说，如果不是文物名称或者旅游景点名称，请返回"对不起，请提问与旅游景点和历史文物相关问题"，请回答问题"${message}"`
          }
        ]
      }
    }
  };

  return new Promise((resolve, reject) => {
    socket && socket.send({
      data: JSON.stringify(prompt),
      success() {
        resolve();
      },
      fail(res) {
        console.log(res);
        reject(res)
      }
    })
  })
}

module.exports = {
  formatTime,
  getWebsocketUrl,
  getWebsocket,
  sendMessage
}
