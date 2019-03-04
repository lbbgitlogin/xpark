// pages/appointmenttime/appointmenttime.js
//index.js
// 引入SDK核心类
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js')
var qqmapsdk;
//获取应用实例
var util = require("../../utils/util.js")
var app = getApp()
var $ = require('../../utils/util.js');
var api = require('../../api/indexAPI.js');
var time = 0;
var touchDot = 0; //触摸时的原点
var interval = "";
var flag_hd = true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    memberFitnessId: "",
    orderNo: "",
    price: "",
    areaId: "",
    formatDate: "", //今日日期
    scrolltop: "",
    ishidden: false,
    ground_appointment: "",
    heightt: "",
    member_fitness: "",
    shoplist: "",
    groundlength: "",
    scrootop: "",
    shopname: "",
    ptitemlist: "",
    latitude: "",
    ptitemlistid: "",
    longitude: "",
    day: "",
    zzlist: "",
    tk_schedulelist: "",
    gymId: "",
    balance: "",
    classifyClick: "",
    mobile: "",
    memberId: "",
    nearshop: "",
    address: "",
    weekend: "",
    weekArr: "",
    sk_schedulelist: "",
    hasUserInfo: false,
    countNum: 5,
    daytime: "",
    daynewday: "",
    weekend: "",
    type: 1,
    sta: "",
    hidden: false,
    province: "", //省
    city: "", //市
    timenum: false,
    tbodyHeight: "",
    homeAds: true,
    tapindex: 1,
    categoryId: "",
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    var that = this;

    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        that.setData({
          hidden: true,
          balance: res.data.cash + res.data.give,
          address: options.address || '',
          shopname: options.shopname || '',
          areaId: options.areaId || '',
          id: options.id || '',
          memberCourseId: options.memberCourseId || '',
          orderNo: options.orderNo || '',
          price: options.price || '',
          memberFitnessId: options.memberFitnessId || '',
          sta: options.sta || ''
        })

        that.showtime();

      },
      fail: function (res) {
        that.setData({
          hidden: true
        })

      },
    })

    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
    var day = now.getDate() < 10 ? "0" + (now.getDate()) : now.getDate();
    var formatDate = year + '-' + month + '-' + day;



    var day = now.getDate();

    var weekend = '日一二三四五六'.charAt(new Date().getDay());

    this.setData({
      day: day,
      weekend: weekend,

    })

    let time = util.formatDate(new Date());
    let date = util.getDates(7, time);


    this.setData({
      datee: date,
      areaId: options.areaId || ''
    })


    var res = wx.getSystemInfoSync();

    this.setData({
      sysW: res.windowHeight / 12, //更具屏幕宽度变化自动设置宽度

    })
    wx.hideTabBar();
    var that = this;


    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
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
        }
      })
    }
    wx.getSystemInfo({
      success: function (res) {
        var h = 750 * res.windowHeight / res.windowWidth


      }
    })
    app.GetUserInfo(function () {

    });
  },
  ground_appointment: function () {
    var that = this;
    var val = {
      areaId: that.data.areaId
    }
    $.Requests(api.ground_appointment.url, val).then((res) => {


      that.setData({
        groundlength: res.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  showtime: function () {
    var that = this;
    var val = {
      areaId: that.data.areaId
    }
    $.Requests(api.ground_appointment.url, val).then((res) => {

      var now = new Date();
      var nowTime = now.getTime();
      var oneDayTime = 24 * 60 * 60 * 1000;
      var daytime = {};
      var daynewday = {};
      var weekend = {};

      for (var i = 0; i < 7; i++) {

        //显示周一
        var ShowTime = nowTime + i * oneDayTime;
        //初始化日期时间
        var myDate = new Date(ShowTime);


        var year = myDate.getFullYear();
        var month = myDate.getMonth() + 1 < 10 ? "0" + (myDate.getMonth() + 1) : myDate.getMonth() + 1;
        var date = myDate.getDate() < 10 ? "0" + (myDate.getDate()) : myDate.getDate();

        var str = "星期" + "日一二三四五六".charAt(myDate.getDay());

        daytime[i] = {};
        daytime[i].time = year + "-" + month + "-" + date;
        daytime[i].des = res.data[i];
        //场次数据在这加
        daynewday[i] = year + '-' + month + "-" + date;
        weekend[i] = str;
        var timelist = {};
        timelist.time = daytime;
        timelist.week = weekend;
        timelist.des = res.data
      }
      that.setData({
        daytime: daytime,
        weekend: weekend,
        timelist: timelist,
        daynewday: daynewday,
      })


      //  that.setData({
      //    ground_appointment:res.data
      //  })

    })


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
  ballappointment: function (e) {

    var that = this;

    if (that.data.sta == 1) {

      wx.navigateTo({
        url: '../coachappointment/coachappointment',
      })

    } else {


      wx.navigateTo({
        url: '../ballappointment/ballappointment?areaId=' + that.data.areaId + "&day=" + e.target.dataset.day + "&id=" + that.data.id + "&memberFitnessId=" + that.data.memberFitnessId + "&orderNo=" + that.data.orderNo + "&price=" + that.data.price + "&address=" + that.data.address + "&shopname=" + that.data.shopname,
      })


    }

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