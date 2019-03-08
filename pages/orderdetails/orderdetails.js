// pages/orderdetails/orderdetails.js
var app = getApp()
var CONFIG = require('../../config.js');
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
    imgurl: CONFIG.config.imgUrl,
    goodsname: '',
    invaliddatetime: '',
    choosebtn: true,
    gymname: '',
    usecode: '',
    ordertype: '',
    downTime: '',
    orderno: '',
    actualmoney: '',
    orderstate: '',
    updatetimestr: '',
    img: '',
    orderid: '',
    price: '',
    psytype: '',
    createtime: '',
    num: '',
    createtimestr: '',
    discountmoney: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    that.setData({
      img: options.img,
      goodsname: options.goodsname,
      ordertype: options.ordertype,
      usecode: options.usecode,
      invaliddatetime: options.invaliddatetime || '',
      updatetimestr: options.updatetimestr || '',
      gymname: options.gymname,
      actualmoney: options.actualmoney,
      orderno: options.orderno,
      orderid: options.id,
      createtimestr: options.createtimestr,
      orderstate: options.orderstate,
      price: options.price,
      psytype: options.psytype,
      createtime: options.createtime,
      num: options.num,
      discountmoney: options.discountmoney,

    });
    that.countdown();
    if (options.ordertype == 'sp') {
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
  secconds: function () {
    var that = this;
    var val = {
      orderNo: that.data.orderno
    };
    $.Requests(api.secconds.url, val).then((res) => {
      if (res.data != '') {
        wx.navigateTo({
          url: '../management/management',
          success: function (e) {
            var page = getCurrentPages().pop();
            if (page == undefined || page == null) return;
            page.onLoad();
          }
        })
      }
    })
  },
  payindex: function () {
    var that = this;
    var val = {
      orderNo: that.data.orderno
    }

    $.Requests_json(api.continue.url, val).then((res) => {



      var obj = JSON.parse(res.data.result);

      wx.requestPayment({
        'timeStamp': obj.pay_info.timestamp,
        'nonceStr': obj.pay_info.nonce_str,
        'package': "prepay_id=" + obj.pay_info.prepay_id,
        'signType': obj.pay_info.sign_type,
        'paySign': obj.pay_info.pay_sign,
        'success': function (res) {
          $.alert("支付成功！")

          setTimeout(function () {
            that.secconds();
          }, 2000)



        },
        'fail': function (res) {


        }
      })
    })
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
  jx_order: function () {
    var that = this;
    that.payindex()
  },
  qxorder: function () {
    var that = this;
    var val = {
      id: that.data.orderid
    }
    $.Requests_json(api.qxorder.url, val).then((res) => {


      if (res.status == 0) {
        setTimeout(function () {


          $.alert("取消订单成功！")

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
  // 倒计时
  countdown: function () {
    var that = this;
    var ordertime = that.data.createtimestr;
    //ios时间不显示问题，采用截取数据 拼接   解决
    var ordertimeyea = ordertime.substring(0, 4)
    var ordertimemon = ordertime.substring(5, 7)
    var ordertimeday = ordertime.substring(8, 10)
    var ordertimehou = ordertime.substring(12, 14)
    var ordertimesec = ordertime.substring(15, 17)
    var ordertimemin = ordertime.substring(18, 20)
    var trueorder = ordertimeyea + '/' + ordertimemon + '/' + ordertimeday + ' ' + ordertimehou + ':' + ordertimesec + ':' + ordertimemin;
    var trueordertime = new Date(trueorder).getTime();

    var EndTime = Math.floor(new Date(trueorder).getTime() / 1000000); //订单下单时间转毫
    var NowTime = Math.floor(new Date().getTime() / 1000000);

    var total_micro_second = NowTime - EndTime; //单位毫秒
    var timeshow = 900000 - total_micro_second;


    // 渲染倒计时时钟
    if (timeshow >= 1000) {
      setTimeout(function () {
        if (that.data.choosebtn) {
          timeshow -= 1000;
          that.dateformat(timeshow)
          that.countdown();
        }

      }, 1000)
    }

  },

  // 时间格式化输出，如11天03小时25分钟19秒  每1s都会调用一次
  dateformat: function (micro_second) {
    var that = this;
    // 
    // 总秒数
    var second = micro_second / 1000000000;
    //  
    // 天数
    var day = Math.floor(second / 3600 / 24);
    // 小时
    var hr = Math.floor(second / 3600 % 24).toString().length == 1 ? '0' + Math.floor(second / 3600 % 24) : Math.floor(second / 3600 % 24);
    // 分钟
    var min = Math.floor(second / 60 % 60).toString().length == 1 ? '0' + Math.floor(second / 60 % 60) + 1 : Math.floor(second / 60 % 60) + 1;
    // 秒
    var sec = Math.floor(second % 60).toString().length == 1 ? '0' + Math.floor(second % 60) : Math.floor(second % 60);
    var iitime = min + ":" + sec;
    //  
    if (min == '00' && sec == '00') {

      that.setData({
        choosebtn: false
      })

    } else {
      that.setData({
        downTime: iitime
      })
    }

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