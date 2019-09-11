// pages/list/tiXian/tiXian.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: '',
    moneyData: {},
    inputValue: ''
  },
  tixianAll(){
    var that = this
    let moy = parseFloat(that.data.moneyData.money)
    that.setData({
      inputValue: moy.toFixed(2)
    })
  },
  tixian(){
    var that = this
    var value = that.data.inputValue
    if(value == '') return
    else{
      if (parseInt(value) < 10 || parseInt(value)>100){
        wx.showModal({
          title: '系统信息',
          content: '提现金额应在10.00元到100.00元之间',
          showCancel: false
        })
      }
      else{
        wx.showModal({
          title: '系统信息',
          content: '提现成功，1-3个工作日到账',
          showCancel: false
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      userInfo: app.globalData.userInfo,
      moneyData: app.globalData.moneyData
    })
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