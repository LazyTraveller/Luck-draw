Page({
  data: {
    rotate:{},
    angle:0
  },
  onLoad: function (options) {
    
  },
  try:function(){
    var _this=this;
 var animation= wx.createAnimation({
    timingFunction: 'ease',
    duration:4000
  });
  this.animation=animation;
  animation.rotate(_this.data.angle+3080).step();
  this.setData({
    rotate:animation,
    angle: _this.data.angle + 3080
  })
  },
})