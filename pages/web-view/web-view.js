// pages/web-view/web-view.js
var cfExt = wx.getExtConfigSync ? wx.getExtConfigSync() : require('../../config.js');
var cf = cfExt.config ? wx.getExtConfigSync() : require('../../config.js');
var rpn = require("../../utils/rpn.js");
var app = getApp();
var $ = require('../../utils/util.js');
var api = require('../../api/selfdails.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderno: '',
    // url: cf.config.configUrl +'wx_pay_temp/find/index'
    url: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
    
    let that = this;
    let webUrl = '';
    if (options.orderno) {
      that.setData({
        orderno: options.orderno
      })
      that.payindex();
    }
  },
  payindex: function() {
    var that = this;
    var val = {
      orderNo: that.data.orderno
    }

    $.Requests_json(api.getlakala.url, val).then((res) => {
      
      
      
      var obj = JSON.parse(res.data.result);
      
      
      that.setData({
        url: obj.confirm_url
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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