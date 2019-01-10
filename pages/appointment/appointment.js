// pages/appointment/appointment.js
var app = getApp()
var $ = require('../../utils/util.js');
var api = require('../../api/appointment.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tapindex: 1,
    type: 1,
    time: "",
    runday: "",
    member_orderlist: "",
    memberId: "",
    appointment: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getdata()
  },
  getdata() {
    var that = this;
    wx.setNavigationBarColor({
      backgroundColor: '#282B30', // 必写项
      frontColor: '#ffffff', // 必写项
    })
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        that.setData({
          memberId: res.data.memberId,
          time: res.data.createTime,
          runday: res.data.day
        })
        that.appointment()
      },
      fail: function (res) {
        $.alert("请先登录")
        setTimeout(function () {

          wx.navigateTo({
            url: '../land/land',
          })

        }, 2000) //延迟时间 这里是1秒

      },
    })
  },
  appointment: function () {
    var that = this;
    that.setData({
      tapindex: 1,
    })
    var val = {
      memberId: that.data.memberId,
      state: '0',
      // page: '10',
      // size: '10',
      // start: '0',
    }
    $.Requests(api.appointmentlist.url, val).then((res) => {


      var that = this;
      if (res.data == null) {
        that.setData({
          type: 2
        })
      } else {
        that.setData({
          appointment: res.data.content,
          type: 1
        })


      }
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
    this.getdata()
  },
  datalis: function (e) {
    wx.navigateTo({
      url: '../bookingoreder/bookingoreder?icon=' + e.currentTarget.dataset.icon + "&gymName=" + e.currentTarget.dataset.gymname + "&uesCode=" + e.currentTarget.dataset.uescode + "&bookingName=" + e.currentTarget.dataset.bookingname + "&type=" + e.currentTarget.dataset.type + "&price=" + e.currentTarget.dataset.price + "&address=" + e.currentTarget.dataset.address + "&dingdanid=" + e.currentTarget.dataset.dingdanid + "&orderno=" + e.currentTarget.dataset.orderno + "&remark=" + e.currentTarget.dataset.remark
    })
  },
  allOrders: function () { //未开始订单
    this.setData({
      tapindex: 1,
      type: 1
    });
  },
  toBePaid: function () { //yishiyong 订单
    var that = this;
    that.setData({
      tapindex: 2,


    });
    var val = {
      memberId: that.data.memberId,
      state: '1',
      // page: '10',
      // size: '10',
      // start: '0',
    }
    $.Requests(api.appointmentlist.url, val).then((res) => {


      var that = this;
      if (res.data.content == '') {
        that.setData({
          type: 2
        })
      } else {
        that.setData({
          appointment: res.data.content,
          type: 1
        })


      }

    })
  },
  receiptOfGoods: function () { //已取消订单
    var that = this;
    that.setData({
      tapindex: 3,
    });
    var val = {
      memberId: that.data.memberId,
      state: '2',
      // page: '10',
      // size: '10',
      // start: '0',
    }
    $.Requests(api.appointmentlist.url, val).then((res) => {



      if (res.data.content.length == 0) {
        that.setData({
          type: 2
        })
      } else {
        that.setData({
          appointment: res.data.content,
          type: 1
        })


      }
    })
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