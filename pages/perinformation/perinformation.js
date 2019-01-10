// pages/perinformation/perinformation.js
var app = getApp();
var $ = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pickerData: ["男", "女"],
    pickerweight: [],
    pickerheight: [],
    pickerIndex: 0,
    pickerhe: 65,
    pickerwe: 65,
    phone:"",
    StrBirthday: "请选择生日",
    userheight: "请选择身高",
    userweight: "请选择体重"
  },
  bindDateChange: function(e) { //选择日期
    this.setData({
      StrBirthday: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载  //需要去app.js查询数据库信息是否有数据
   */
  onLoad: function(options) {
var that =this;
    that.pickerheig();
    that.pickerweig();
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        that.setData({
          phone: res.data.mobile,
        })
      },
      fail:function(){
        $.alert("请先登录")
        setTimeout(function () {

          wx.navigateTo({
            url: '../land/land',
          })

        }, 2000) //延迟时间 这里是1秒
      }
    })
  },
   pickerheig:function(){
     var pickerheight = [];
     for (var i = 100; i <= 230; i++) {

       pickerheight.push(i);

     }
     this.setData({
       pickerheight: pickerheight
     })


   },
  pickerweig: function () {
    var pickerweight = [];
    for (var i = 35; i <= 200; i+= 0.5) {

      pickerweight.push(i);

    }
    this.setData({
      pickerweight: pickerweight
    })


  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  pickerClick: function(event) { //性别选择

    
    this.setData({
      pickerIndex: event.detail.value,
      isCoupon: event.detail.value
    });
  },
  pickerClickheight: function (event) { //身高选择

    
    this.setData({
      pickerhe: event.detail.value
    });
  },
  pickerClickweight: function (event) { //体重选择

    
    this.setData({
      pickerwe: event.detail.value
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})