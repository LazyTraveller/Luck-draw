//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    list: [
      {
        id: '0',
        title: '奖品列表',
        text: ''
      },
      {
        id: '1',
        title: '常见问题',
        text: '怎么玩？\n这是一款抽奖游戏，用户抽到的红包可以转入微信零钱。'
      },
      {
        id: '2',
        title: '意见反馈',
        text: ''
      },
      {
        id: '3',
        title: '关于我们',
        text: '怎么玩？\n这是一款抽奖游戏，用户抽到的红包可以转入微信零钱。'
      }
    ],
    moneyData: {}
  },
  onLoad: function(options){
    console.log(app.globalData)
    var that = this
    that.setData({
      userInfo: app.globalData.userInfo,
      moneyData: app.globalData.moneyData
    })
  },
  goToTemplate: function(e){
    let list = e.currentTarget.dataset.value
    wx.navigateTo({
      url: 'template/template?list=' + JSON.stringify(list) ,
    })
  },
  goToTiXian: function(){
    wx.navigateTo({
      url: 'tiXian/tiXian',
    })
  }
})
