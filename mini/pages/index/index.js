const { sendMessage, getWebsocket } = require("../../utils/util");

const app = getApp();
const systemInfo = app.globalData.systemInfo;

Page({
  data: {
    safeArea: systemInfo.safeArea,
    screenHeight: systemInfo.screenHeight,
    hotKey: ''
  },
  async onReady() {
    this.webScoket = await getWebsocket();
    this.webScoket.onClose((res) => {
      this.onCloseHandle(res)
    });
    this.webScoket.onError((res) => {
      this.onErrorHandle(res)
    });
    this.webScoket.onMessage((res) => {
      this.onMessageHandle(res)
    });
  },
  async onCloseHandle(e) {
    this.webScoket = await getWebsocket();
    console.error(e);
  },
  async onErrorHandle(e) {
    this.webScoket = await getWebsocket();
    console.error(e)
  },
  onMessageHandle(resultData) {
    const data = resultData.data || resultData;
    let jsonData = JSON.parse(data)
    console.log(jsonData)
    // total_res = total_res + resultData
    // $('#output_text').val(total_res)
    // // console.log(resultData)
    // // 提问失败
    // if (jsonData.header.code !== 0) {
    //     alert(`提问失败: ${jsonData.header.code}:${jsonData.header.message}`)
    //     console.error(`${jsonData.header.code}:${jsonData.header.message}`)
    //     return
    // }
    // if (jsonData.header.code === 0 && jsonData.header.status === 2) {
    //     this.ttsWS.close()
    //     bigModel.setStatus("init")
    // }
  },
  onSubmitHandle(e) {
    sendMessage(this.data.hotKey, this.webScoket)
  },
  bindKeyInput: function (e) {
    this.setData({
      hotKey: e.detail.value
    })
  },

})
