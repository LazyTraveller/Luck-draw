// pages/hongBao/hongBao.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    imgList: ['/image/tx.png', '/image/tx.png', '/image/tx.png', '/image/tx.png', '/image/tx.png', '/image/tx.png', '/image/tx.png', '/image/tx.png', '/image/tx.png', '/image/tx.png', '/image/tx.png', '/image/tx.png', '/image/tx.png', '/image/tx.png', '/image/tx.png', '/image/tx.png', '/image/tx.png'],
    money: 0.0130,
    hongbao: 0
  },
  goToMini(){
    wx.navigateToMiniProgram({
      appId: 'wx533ce57289698a02',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.hongbao)
    var that = this
    that.setData({
      src: app.globalData.userInfo.avatarUrl,
      money: options.hongbao
    })
    var hongbao = that.data.hongbao
    var timer = setInterval(function(){
      hongbao = (hongbao + 0.0001)
      that.setData({
        hongbao: hongbao.toFixed(4)
      })
      if (hongbao.toFixed(4) == that.data.money){
        clearInterval(timer)
      }
    },50)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})