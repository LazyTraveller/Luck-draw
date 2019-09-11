var app = getApp()
var hongbao = 0


Page({
  data: {
    "bnrUrl": [{
      "url": "../images/box-1.jpg", 'title': '中国好红军中国好红军中国好红军中国好红军中国好红军中国好红军'
    }, {
      "url": "../images/box-2.jpg"
    }, {
      "url": "../images/box-1.jpg"
    }, {
      "url": "../images/box-1.jpg"
    }],
    awardsList: {},
    awards:{},
    money: 0,
    count: 50,
    animationData: {},
    disabled:"disabled",
    able:"able",
    turning:false,
    scale:1,
    contentHeight:null,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isShare: false,
    isHongbao: false,
    isMini: false
  },
  //跳转到个人中心
  goToList: function() {
    var that = this
    app.globalData.moneyData = {
      count: that.data.count,
      money: that.data.money
    }
    wx.navigateTo({
      url: '../list/list',
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var size = this.setCanvasSize();//动态设置画布大小
    var initUrl = this.data.placeholder;
    this.createQrCode(initUrl, "mycanvas", size.w, size.h);


  },
 
  /**
   * 抽奖处理函数：
   */
  getLottery: function () {
    var that = this;
    if (that.data.count < 5) {   //判断用户钻石数量是否大于等于5
      that.setData({
        isShare: true
      })
      return 
    } 
    //减少钻石数量：
    this.setData({
      count:that.data.count-5,
      turning:true
    });
    setTimeout(function(){
      that.setData({
        turning:false
      })
    },4500)
    var cot = that.data.count
    // var awardIndex = Math.random() * 6 >>> 0;
    // 获取奖品配置
    var awardsConfig = app.awardsConfig,
        runNum = 4,
        awardIndex=0;
    // if (awardIndex < 2) awardsConfig.chance = false
    // console.log(awardIndex)
    //设置概率：随机从数组中抽取一个数，数组中越大的数出现的次数越少，以此实现概率差异
    // 150:1,100:2,30:3,10:4,5:5,2:6
    var Parr =wx.getStorageSync("chance").chance
    //  [150, 140, 100, 100, 30, 30, 10, 10, 10, 10, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
    var PrandomNum = Math.random() * wx.getStorageSync("chance").number >>> 0;
    console.log(Parr[PrandomNum])
    switch (Parr[PrandomNum]){
      case 2:
        awardIndex =6
        break
      case 5:
        awardIndex = 5
        break
      case 10:
        awardIndex = 4
        break
      case 30:
        awardIndex =3
        break
      // case 60:
      //   awardIndex = 3
      //   break
      case 100:
        awardIndex = 2
        break
      case 150:
        awardIndex = 1
        break
    }
    console.log("奖品序号："+awardIndex);
    // 旋转抽奖
    app.runDegs = app.runDegs || 0
    console.log('deg', app.runDegs)
    app.runDegs = app.runDegs + (360 - app.runDegs % 360) + (360 * runNum - awardIndex * (360 / 7))
    console.log('deg', app.runDegs)

    var animationRun = wx.createAnimation({
      duration: 4000,
      timingFunction: 'ease'
    })
    that.animationRun = animationRun
    animationRun.rotate(app.runDegs).step()
    that.setData({
      animationData: animationRun.export()
    })

     // 记录奖品
    // var winAwards = wx.getStorageSync('winAwards') || {data:[]}
    // winAwards.data.push(awardsConfig.awards[awardIndex].name + '1个')
    // wx.setStorageSync('winAwards', winAwards)

    // 中奖提示
    setTimeout(function() {
      if(awardIndex == 0){
        that.setData({
          isHongbao: true
        })
        hongbao = Math.random().toFixed(4)
      } else if(awardIndex == 1){
          that.togglePopup3()
      }
       else if(awardIndex == 2){
        wx.showModal({
          title: '恭喜',
          content: '您获得10钻石',
          showCancel: false
        })
        let timer = setInterval(function(){  
          that.setData({
            count: that.data.count + 1
          })
          let a = parseInt(that.data.count - cot)
          if(a==10){
            clearInterval(timer)
          }
        },50)
        
      } 
      else if(awardIndex == 3){
        that.setData({
          isShare: true
        })
        return
      } else if(awardIndex == 4){
        wx.showModal({
          title: '恭喜',
          content: '您获得宝箱',
          showCancel: false
        })
      }else if(awardIndex == 5){
        wx.showModal({
          title: '恭喜',
          content: '您获得1元红包已存入账户',
          showCancel: false
        })
        let m = parseFloat(parseFloat(that.data.money) + 1).toFixed(4)
        that.setData({
          money: m
        })
      } else{
        wx.showModal({
          title: '恭喜',
          content: '您获得5元红包已存入账户',
          showCancel: false
        })
        let m = parseFloat(parseFloat(that.data.money) + 5).toFixed(4)
        that.setData({
          money: m
        })
      }
    }, 4000);
  },
  onShow: function(e){
    var that = this
    let m = parseFloat(parseFloat(that.data.money) + 1).toFixed(4)
   
   
    if(hongbao!=0){
      var money = parseFloat(that.data.money)
      var hongbao1 = parseFloat(hongbao)
      that.setData({
        money: money+hongbao1
      })
      hongbao = 0
    }
    const ip_area = getApp()
    var ip = ip_area.data.ip;
    wx.request({
      url: ip + '/Swiper/SelectAllSwider',
      data: '',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 改变默认值为这个配置
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          bnrUrl: res.data
        })
      },
    })

    wx.request({
      url: ip + '/Lottery/SelectAllLottery',
      data: '',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 改变默认值为这个配置
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          awards: res.data
        })
      },
    })
    wx.request({
      url: ip + '/LotteryUser/SelectAllLotteryUser',
      data: '',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 改变默认值为这个配置
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          LotteryUser: res.data
        })
      },
    })
    wx.request({
      url: ip + '/Rule/SelectAllRule',
      data: '',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 改变默认值为这个配置
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          Rule: res.data
        })
      },
    })
    app.awardsConfig = {

      count: 50,
      awards: that.data.awards
      // [
      //   { 'index': 0, 'name': '随机红包法撒旦'},
      //   { 'index': 1, 'name': '幸运奖'},
      //   { 'index': 2, 'name': '10钻'},
      //   { 'index': 3, 'name': '大量钻石'},
      //   // { 'index': 4, 'name': '宝箱'},
      //   { 'index': 5, 'name': '1元红包' },
      //   { 'index': 6, 'name': '5元红包'}

      // ]

    }
// this.Test(e)
  },
  // onReady
  onReady: function (e) {
   
    var that = this;
    
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
        contentHeight:res.windowHeight
        });
        if(res.windowWidth<360){
          that.setData({
            scale:0.9
          })
        }else if(res.windowWidth>500){
          that.setData({
            scale: 1.4
          })
        }
      },
    })
    that.onShow()
    console.log(that.data.awards)
    // getAwardsConfig
    
    console.log(app.awardsConfig.awards)

    console.log("fsdfsd")
    // wx.setStorageSync('awardsConfig', JSON.stringify(awardsConfig))
    that.setData({
      count: app.awardsConfig.count
    })

    // 绘制转盘
    var awardsConfig = app.awardsConfig.awards,
    
        len = awardsConfig.length,
        rotateDeg = 360 / len / 2 + 90,
        html = [],
        turnNum = 1 / len;  // 文字旋转 turn 值
    var ctx = wx.createContext();
    for (var i = 0; i < len; i++) {
      // 保存当前状态
      ctx.save();
      // 开始一条新路径
      ctx.beginPath();
      // 位移到圆心，下面需要围绕圆心旋转
      ctx.translate(150, 150);
      // 从(0, 0)坐标开始定义一条新的子路径
      ctx.moveTo(0, 0);
      // 旋转弧度,需将角度转换为弧度,使用 degrees * Math.PI/180 公式进行计算。
      ctx.rotate((360 / len * i - rotateDeg) * Math.PI/180);
      // 绘制圆弧
      ctx.arc(0, 0, 150, 0,  2 * Math.PI / len, false);

      // 颜色间隔
      if (i % 2 == 0) {
          ctx.setFillStyle('rgba(255,184,32,.1)');
      }else{
          ctx.setFillStyle('rgba(255,203,63,.1)');
      }

      // 填充扇形
      ctx.fill();
      // 绘制边框
      ctx.setLineWidth(0.5);
      ctx.setStrokeStyle('rgba(228,55,14,.1)');
      ctx.drawImage("../../image/+10.png", -23, -75, 46, 25);
      ctx.stroke();
      // ctx.drawImage("../../image/+10.png1", -23, -75, 46, 25);
      // 恢复前一个状态
      ctx.restore();

      // 奖项列表
      html.push({ turn: i * turnNum + 'turn', lineTurn: i * turnNum + turnNum / 2 + 'turn', award: awardsConfig[i].name, img: awardsConfig[i].img });      
    };

    that.setData({
        awardsList: html
      });

    app.globalData.moneyData = {
      count: that.data.count,
      money: that.data.money
    }
  },
  onLoad: function () {
    var that = this
    if (app.globalData.userInfo) {
      console.log(app.globalData.userInfo)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      wx.setNavigationBarTitle({
        title: '来抽奖吧',
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        wx.setNavigationBarTitle({
          title: '来抽奖吧',
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          wx.setNavigationBarTitle({
            title: '来抽奖吧',
          })
        }
      })
    }
    wx.showShareMenu({
      withShareTicket: true
    })
    // var m = that.data.money.toFixed(4)
    // that.setData({
    //   money: m
    // })
  },
  getUserInfo: function (e) {
    console.log(e)
    if (e.detail.errMsg =='getUserInfo:fail auth deny'){
      wx.showModal({
        title: '提示',
        content: '您需要进行授权才能进行抽奖哦',
        showCancel: false
      })
      return
    }else{
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      wx.setNavigationBarTitle({
        title: '来抽奖吧',
      })
    }
  },
  togglePopup: function() {
    this.setData({
      isShare: !this.data.isShare
    });
  },
  togglePopup2: function() {
    this.setData({
      isHongbao: !this.data.isHongbao
    });
  },
  togglePopup3: function () {
    this.setData({
      isMini: !this.data.isMini
    });
  },
  onShareAppMessage: function(){
    var that = this
    return {
      title: '抽奖',
      path: '/pages/canvas/canvas',
      complete: function (res) {
        if (res.errMsg == 'shareAppMessage:ok') {
          //判断是否分享到群
          if (res.hasOwnProperty('shareTickets')) {
            
            wx.showModal({
              title: '提示',
              content: '哼做的不错好东西就是要乐于分享',
              showCancel: false
            })
            that.setData({
              count: that.data.count+30,
              isShare: false
            })  
          } else {
            wx.showModal({
              title: '提示',
              content: '好东西要分享给大家哦',
              showCancel: false
            })
          }
        }
      }
    }
  },
  goToHongBao: function(){
    var that = this
    wx.navigateTo({
      url: '../hongBao/hongBao?hongbao=' + hongbao,
    })
    that.togglePopup2()
    // hongbao = 0
  },
  goToMini: function (){
    wx.navigateToMiniProgram({
      appId: 'wx533ce57289698a02',
    })
  }
})
