// pages/Approach/Approach.js
var app = getApp();
var api = require('../../api/approach.js');
var $ = require('../../utils/util.js');
var QRCode = require('../../utils/weapp.qrcode.esm.js');
import drawQrcode from '../../utils/weapp.qrcode.esm.js'
var qrcode;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    memberId:"",
    uesCode:"",
    text: "",
    gymName: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'gymId',
      success: function (res) {
        that.setData({
          gymName: res.data.gymName,
        

        })

      },
      fail: function (res) {
        $.alert("请选择门店")
        setTimeout(function () {

          wx.switchTab({
            url: '../index/index',
          })

        }, 2000)

      },
    })

    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        that.setData({
          memberId: res.data.memberId
        })
        that.qrCode();


      },
      fail: function (res) {
  
    

        wx.reLaunch({
            url: '../land/land',
          })


        
      },
    })

  },
  qrCode:function(){
     var that = this;
    var val = {
      memberId: that.data.memberId,
    }
    $.Requests(api.qrCode.url, val).then((res) => {
   
      
      if (res.status == 0){
        var that = this;
        that.setData({
          uesCode:res.data
        })
        drawQrcode({
          width: 168, //二维码宽高,宽高要与canvas标签宽高一致
          height: 168,
          canvasId: 'myQrcode',
          text: that.data.uesCode //二维码内容
        })


      }else{
        $.alert("获取二维码失败")
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