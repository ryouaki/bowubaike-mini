const CryptoJS = require('../cryptojs/index.js');
const base64 = require('../base64/index.js');

const API_KEY = '';
const API_SECRET = '';
const APP_ID = '';

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
  return new Promise((resolve) => {
    let _webSocket = wx.connectSocket({
      url: getWebsocketUrl(),
      fail: () =>  {
        _webSocket = undefined;
      }
    });
    resolve(_webSocket)
  })
}

function sendMessage(data, socket) {
  return new Promise((resolve, reject) => {
    socket.send({
      data: data,
      success() {
        resolve();
      },
      fail(res) {
        resolve(res);
      }
    })
  })
}

module.exports = {
  async sendMessage(message, cb) {
    const socket = await getWebsocket();
    socket.onError(() => {
      cb(false, '请求服务器发生错误')
    });
    socket.onOpen(async () => {
      const app = getApp();
      const uuid = app.globalData.code;
      const prompt = {
        "header": {
          "app_id": APP_ID,
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
                "content": `假设你是导游或者博物馆解说或者动物学家植物学家，如果不是文物名称或者旅游景点名称或者动物名称或者植物名称，请返回"对不起，请提问与旅游景点和历史文物，动植物相关问题"，请回答问题"${message}"`
              }
            ]
          }
        }
      };
      const ret = await sendMessage(JSON.stringify(prompt), socket);
      if (ret) {
        cb(false, '发送数据失败')
      }
    })
    socket.onMessage((resultData) => {
      const data = resultData.data || resultData;
      let jsonData = JSON.parse(data)
      cb(true, jsonData)
    })
  }
}