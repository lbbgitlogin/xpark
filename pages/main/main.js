// pages/main/main.js
var $ = require('../../utils/util.js');
var CONFIG = require('../../config.js');
var api = require('../../api/selfdails.js');
var guideapi = require('../../api/guide.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: CONFIG.config.imgUrl,
    memberId: "",
    membershow: false,
    vip: "",
    gymId: "",
    viptime: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getdata()
    wx.getStorage({
      key: 'gymId',
      success: function (res) {
        that.setData({
          gymId: res.data.gymId
        })
      }
    })
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



        setTimeout(function () {

          wx.reLaunch({
            url: '../land/land',
          })

        }, 100)


      },
    })
  },
  guide: function () {
    var that = this;
    var val = {}
    $.Requests(guideapi.guide.url + '/' + that.data.gymId, val).then((res) => {
      if (res.data.length == 0) {
        $.alert("暂无内容！")
      } else {
        wx.navigateTo({
          url: '../guide/guide',
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  // myinformation: function () {
  //   wx.navigateTo({
  //     url: '../perinformation/perinformation',
  //   })
  // },

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


      if (res.data == '' || res.data == null) {

        that.setData({
          membershow: false
        })
      } else {
        that.setData({
          membershow: true,
          vip: res.data[0].vip,
          viptime: res.data[0].vipEndTime.substring(0, res.data[0].vipEndTime.length - 10),
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