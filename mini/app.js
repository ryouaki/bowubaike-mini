// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.getLocation({
      type: 'wgs84',
      success (res) {
        console.log(res)
      }
     })
     
  },
  globalData: {
    userInfo: null
  }
})
