// index.js
// 获取应用实例
const app = getApp()

Page({
  navClick(e) {
    const { dataset } = e.currentTarget;
    const { method = "defaultHandle" } = dataset;
    this[`${method}_handle`](e);
  },
  defaultHandle (e) {

  },
  askme_handle (e) {
    wx.navigateTo({
      url: '/pages/askme/index',
    })
  },
  tourist_handle (e) {
    wx.navigateTo({
      url: '/pages/tourist/index',
    })
  },
  museum_handle (e) {
    wx.navigateTo({
      url: '/pages/museum/index',
    })
  }
})
