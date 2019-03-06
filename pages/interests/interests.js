// pages/interests/interests.js
var CONFIG = require('../../config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: CONFIG.config.imgUrl,
    vipcardcolor: false,
    activeTab: 1,
    zxvip: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.vip != '') {
      if (options.vip == 1) {
        this.setData({
          zxvip: true
        })
      }
      if (options.vip == 2) {
        this.setData({
          vipcardcolor: true
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  opencard: function (e) {
    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        that.setData({
          memberId: res.data.memberId
        })
      },
      fail: function (res) {

        setTimeout(function () {

          wx.reLaunch({
            url: '../land/land',
          })

        }, 100)
        //延迟时间 这里是1秒
        return false;
      }

    })

    wx.navigateTo({
      url: '../buycard/buycard?vipnum=' + e.currentTarget.dataset.vip,
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
  //滑动屏幕操作
  swiperChange: function (e) {
    var activeTabIndex = e.detail.current
    this.setData({
      activeTab: activeTabIndex
    })
    //
    //

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