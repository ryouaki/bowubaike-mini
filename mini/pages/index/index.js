const { sendMessage } = require("../../utils/xfsdk/index");

const app = getApp();
const systemInfo = app.globalData.systemInfo;

Page({
  data: {
    safeArea: systemInfo.safeArea,
    screenHeight: systemInfo.screenHeight,
    hotKey: '',
    history: [],
    times: 5
  },
  onMessageHandle(success, jsonData) {
    if (!success) return;
    const { header, payload = {} } = jsonData;
    const { text = [] } = payload.choices || {};
    const history = [].concat(this.data.history);
    if (header.code === 0) {
      switch (header.status) {
        case 0:
          history.unshift({
            uidkey: header.sid,
            question: this.data.hotKey,
            data: text.map((item) => {
              return item.content
            }).join()
          })
          break;
        case 1:
        case 2:
          const item = history[0];
          item.data = item.data + text.map((item) => {
            return item.content
          }).join()
          break;
      }
      this.setData({
        history
      })
    }
    this.setData({
      hotKey: ''
    })
  },
  onSubmitHandle() {
    if (this.data.times > 1) {
      this.setData({
        times: this.data.times - 1
      }, () => {
        sendMessage(this.data.hotKey, this.onMessageHandle.bind(this))
      })
    }
  },
  bindKeyInput: function (e) {
    if (this.data.times > 0) {
      this.setData({
        hotKey: e.detail.value
      })
    }
  }
})
