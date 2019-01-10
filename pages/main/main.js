// pages/main/main.js
var $ = require('../../utils/util.js');
var api = require('../../api/selfdails.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    memberId: "",
    membershow: false,
    vip: "",
    viptime: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getdata()
  },
  datails: function () {
    wx.navigateTo({
      url: '../interests/interests',
    })
  },
  getdata() {
    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        that.setData({
          memberId: res.data.memberId
        })
        that.member()
      },
      fail: function (res) {
        $.alert("请先登录")
        setTimeout(function () {

          wx.navigateTo({
            url: '../land/land',
          })

        }, 2000)
      },
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  myinformation: function () {
    wx.navigateTo({
      url: '../perinformation/perinformation',
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  member: function () {
    var that = this;
    var val = {
      memberId: that.data.memberId,

    }
    $.Requests(api.member.url, val).then((res) => {
      console.log("会员卡查询", val)
      console.log("会员卡查询", res)
      if (res.data.length == 0) {

        that.setData({
          membershow: false
        })
      } else {
        that.setData({
          membershow: true,
          vip: res.data[0].vip,
          viptime: res.data[0].vipEndTime
        })
      }

    })
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