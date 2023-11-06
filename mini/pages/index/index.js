
const app = getApp();
const systemInfo = app.globalData.systemInfo;

Page({
  data: {
    safeArea: systemInfo.safeArea,
    screenHeight: systemInfo.screenHeight,
    hotKey: ''
  },
  onSubmitHandle(e) {

  },
  bindKeyInput: function (e) {
    this.setData({
      hotKey: e.detail.value
    })
  },

})
