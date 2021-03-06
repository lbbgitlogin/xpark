// pages/coupon/coupon.js
var app = getApp()
var $ = require('../../utils/util.js');
var api = require('../../api/coupon.js');
Page({

  /**
   * 页面的初始数据
   */

  data: {
    gymId: '',
    memberId: '',
    code: '',
    couponlist: '',
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
          memberId: res.data.memberId
        })
        wx.getStorage({
          key: 'gymId',
          success: function (res) {
            that.setData({
              gymId: res.data.gymId
            })
            that.couponlist();
          }
        })


      },
      fail: function (res) {
        wx.reLaunch({
          url: '../land/land',
        })

      },
    })

  },
  exchange: function () {
    var that = this;
    var val = {
      memberId: that.data.memberId,
      gymId: that.data.gymId,
      redeemCode: that.data.code
    }
    $.Requests_json(api.exchange.url, val).then((res) => {

      if (res.status == 0) {
        that.couponlist()
      } else {
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '兑换码错误，请仔细检查'
        });
      }



    })


  },
  code: function (e) { //输入验证码
    this.setData({
      code: e.detail.value,
    });
  },
  couponlist: function () {
    var that = this;
    var val = {
      memberId: that.data.memberId,
      gymId: that.data.gymId,
    }
    $.Requests(api.couponlist.url, val).then((res) => {


      that.setData({
        couponlist: res.data
      })
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