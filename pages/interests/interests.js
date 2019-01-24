// pages/interests/interests.js
var CONFIG = require('../../config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: CONFIG.config.imgUrl,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  opencard: function(e) {
    
    wx.navigateTo({
      url: '../buycard/buycard?vipnum=' + e.currentTarget.dataset.vip,
    })
    
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
  //滑动屏幕操作
  swiperChange: function(e) {
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