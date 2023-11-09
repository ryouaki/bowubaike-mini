// app.js
const SYSTEM_INFO = 'SYSTEM_INFO';

App({
  onLaunch() {
    const _this = this;
    wx.login({
      success: (res) => {
        _this.globalData.code = res.code;
      },
    })
    // wx.getLocation({
    //   type: 'wgs84',
    //   success (res) {
    //     if (!_this.globalData.userInfo) {
    //       _this.globalData.userInfo = {};
    //     }
    //     _this.globalData.userInfo.lat = res.latitude;
    //     _this.globalData.userInfo.lon = res.longitude;
    //   }
    //  })
  },
  onShow(options) {
    this.initSystemInfo(options);
  },
  initSystemInfo(options) {
    const systemInfo = wx.getStorageSync(SYSTEM_INFO);
    const _this = this;
    if (!systemInfo) {
      const res = wx.getSystemInfoSync();
      const system = {
        SDKVersion: res.SDKVersion,
        platform: res.platform,
        brand: res.brand,
        model: res.model,
        system: res.system,
        version: res.version,
        screenHeight: res.screenHeight,
        screenWidth: res.screenWidth,
        safeArea: res.safeArea,
        isDebug: false //res.platform === 'devtools'
      }
      wx.setStorageSync(SYSTEM_INFO, JSON.stringify(system));
      _this.globalData.systemInfo = system;
    } else {
      this.globalData.systemInfo = JSON.parse(systemInfo);
    }
    if (options) {
      this.globalData.$route = options.path;
      this.globalData.$options = options;
    }
  },
  globalData: {
    userInfo: null
  }
})
