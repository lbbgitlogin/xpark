// pages/orderdetails/orderdetails.js
var app = getApp()
var $ = require('../../utils/util.js');
var api = require('../../api/selfdails.js');
var QRCode = require('../../utils/weapp.qrcode.esm.js');
import drawQrcode from '../../utils/weapp.qrcode.esm.js'
var qrcode;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsname: '',
    gymname: '',
    usecode: '',
    ordertype: '',
    orderno: '',
    orderstate: '',
    orderid: '',
    price: '',
    psytype: '',
    createtime: '',
    num: '',
    discountmoney: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      
     var that =this;
    that.setData({
      goodsname: options.goodsname,
      ordertype: options.ordertype,
      usecode: options.usecode,
      gymname: options.gymname,
      orderno: options.orderno,
      orderid:options.id,
      orderstate: options.orderstate,
      price: options.price,
      psytype: options.psytype,
      createtime: options.createtime,
      num: options.num,
      discountmoney: options.discountmoney,
      
    });
    if (options.ordertype == 'sp'){
      that.draw()
    }
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
  draw() {
    var that = this;
    drawQrcode({
      width: 168, //二维码宽高,宽高要与canvas标签宽高一致
      height: 168,
      canvasId: 'myQrcode',
      text: that.data.usecode //二维码内容
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
  qxorder:function(){
    var that = this;
     var val={
       id: that.data.orderid
     }
    $.Requests_json(api.qxorder.url, val).then((res) => {

      
      if (res.status == 0) {
        setTimeout(function () {


          $.alert("取消预约成功！")

        }, 1000)
        setTimeout(function () {

          wx.navigateTo({
            url: '../management/management',
            success: function (e) {
              var page = getCurrentPages().pop();
              if (page == undefined || page == null) return;
              page.onLoad();
            }
          })

        }, 2000)
      }

    })
    
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