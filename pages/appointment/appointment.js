// pages/appointment/appointment.js
var app = getApp();
var selapi = require('../../api/selfdails.js');
var CONFIG = require('../../config.js');
var $ = require('../../utils/util.js');
var api = require('../../api/appointment.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: CONFIG.config.imgUrl,
    tapindex: 1,
    type: 1,
    flag:'',
    page:1,
    time: "",
    runday: "",
    member_orderlist: "",
    memberId: "",
    appointment: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {
  //   var that = this;
  //   wx.getStorage({
  //     key: 'userinfo',
  //     success: function (res) {
  //       
  //       that.setData({
  //         memberId: res.data.memberId,
  //         time: res.data.createTime,
  //         runday: res.data.day
  //       })
  //       that.appointment()
  //     },
  //     fail: function (res) {
  //       $.alert("请先登录")
  //       setTimeout(function () {

  //         wx.navigateTo({
  //           url: '../land/land',
  //         })

  //       }, 2000) //延迟时间 这里是1秒

  //     },
  //   })
  // },
  appointment: function (e) {
    if(e != undefined){
      
      var vals = {
        formId: e.detail.formId
      }
      $.Requests_json(selapi.addFromID.url + '/' + app.globalData.wxopenid, [vals]).then((res) => {

        
        
        

      })
    }

    var that = this;
    that.setData({
      tapindex: 1,
      page:1,
      appointment:[]
    })
    var val = {
      memberId: that.data.memberId,
      state: '1',
      page: that.data.page,
      // size: '10',
      // start: '0',
    }
    $.Requests(api.appointmentlist.url, val).then((res) => {
      
      
      var that = this;
      if (res.data.content.length == 0) {
        that.setData({
          type: 2
        })
      } else {
        if(res.data.content.length < 20){
          that.setData({
            appointment: that.data.appointment.concat(res.data.content),
            type: 1,
            flag: false
          })

        }else{
          that.setData({
            appointment: that.data.appointment.concat(res.data.content),
            type: 1,
            flag: true
          }) 
        }
       


      }
    })
  },
  appoint: function () {
    var that =this;
    var val = {
      memberId: that.data.memberId,
      state: '1',
      page: that.data.page,
      // size: '10',
      // start: '0',
    }
    $.Requests(api.appointmentlist.url, val).then((res) => {
      
      
      var that = this;
      if (res.data.content.length == 0) {
        that.setData({
          type: 2
        })
      } else {
        if (res.data.content.length < 20) {
          that.setData({
            appointment: that.data.appointment.concat(res.data.content),
            type: 1,
            flag: false
          })

        } else {
          that.setData({
            appointment: that.data.appointment.concat(res.data.content),
            type: 1,
            flag: true
          })
        }



      }
    })
  },
  onReachBottom: function () { //滑动的底部加载下一页


    var thisobj = this;
    if (thisobj.data.flag) {

      thisobj.setData({
        page: thisobj.data.page + 1
      })
      if (thisobj.data.tapindex == 1) {
        thisobj.appoint()
      }
      if (thisobj.data.tapindex == 2) {
        thisobj.toBePa()
      }
      if (thisobj.data.tapindex == 3) {
        thisobj.receipt()
      }
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
    var that = this;
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

        }, 1000) //延迟时间 这里是1秒

      },
    })
  },
  datalis: function (e) {
    
    wx.navigateTo({
      url: '../bookingoreder/bookingoreder?icon=' + e.currentTarget.dataset.icon + "&gymName=" + e.currentTarget.dataset.gymname + "&uesCode=" + e.currentTarget.dataset.uescode + "&bookingName=" + e.currentTarget.dataset.bookingname + "&type=" + e.currentTarget.dataset.type + "&price=" + e.currentTarget.dataset.price + "&address=" + e.currentTarget.dataset.address + "&dingdanid=" + e.currentTarget.dataset.dingdanid + "&orderno=" + e.currentTarget.dataset.orderno + "&remark=" + e.currentTarget.dataset.remark + "&bookingTime=" + e.currentTarget.dataset.bookingtime
    })
  },
  allOrders: function () { //未开始订单
    this.setData({
      tapindex: 1,
      type: 1
    });
  },
  toBePaid: function (e) { //yishiyong 订单
    var vals = {
      formId: e.detail.formId
    }
    $.Requests_json(selapi.addFromID.url + '/' + app.globalData.wxopenid, [vals]).then((res) => {

      
      
      

    })
    var that = this;
    that.setData({
      tapindex: 2,
      appointment:[],
      page:1
     
    });
    var val = {
      memberId: that.data.memberId,
      state: '2',
      // page: '10',
      // size: '10',
      // start: '0',
    }
    $.Requests(api.appointmentlist.url, val).then((res) => {


      var that = this;
      if (res.data.content.length == 0) {
        that.setData({
          type: 2
        })
      } else {
        if (res.data.content.length < 20) {
          that.setData({
            appointment: that.data.appointment.concat(res.data.content),
            type: 1,
            flag: false
          })

        } else {
          that.setData({
            appointment: that.data.appointment.concat(res.data.content),
            type: 1,
            flag: true
          })
        }



      }

    })
  },
  toBePa: function () { //yishiyong 订单
    var that = this;
  
    var val = {
      memberId: that.data.memberId,
      state: '2',
      page:that.data.page
    }
    $.Requests(api.appointmentlist.url, val).then((res) => {


      var that = this;
      if (res.data.content.length == 0) {
        that.setData({
          type: 2
        })
      } else {
        if (res.data.content.length < 20) {
          that.setData({
            appointment: that.data.appointment.concat(res.data.content),
            type: 1,
            flag: false
          })

        } else {
          that.setData({
            appointment: that.data.appointment.concat(res.data.content),
            type: 1,
            flag: true
          })
        }



      }

    })
  },
  receiptOfGoods: function (e) { //已取消订单
    var vals = {
      formId: e.detail.formId
    }
    $.Requests_json(selapi.addFromID.url + '/' + app.globalData.wxopenid, [vals]).then((res) => {

      
      
      

    })
    var that = this;
    that.setData({
      tapindex: 3,
      page:1,
      appointment:[]
    });
    var val = {
      memberId: that.data.memberId,
      state: '0',
      page: that.data.page,
      // size: '10',
      // start: '0',
    }
    $.Requests(api.appointmentlist.url, val).then((res) => {



      if (res.data.content.length == 0) {
        that.setData({
          type: 2
        })
      } else {
        if (res.data.content.length < 20) {
          that.setData({
            appointment: that.data.appointment.concat(res.data.content),
            type: 1,
            flag: false
          })

        } else {
          that.setData({
            appointment: that.data.appointment.concat(res.data.content),
            type: 1,
            flag: true
          })
        }



      }
    })
  },
  receipt: function () { //已取消订单
    var that = this;
    var val = {
      memberId: that.data.memberId,
      state: '0',
      page: that.data.page,
      // size: '10',
      // start: '0',
    }
    $.Requests(api.appointmentlist.url, val).then((res) => {


      if (res.data.content.length == 0) {
        that.setData({
          type: 2
        })
      } else {
        if (res.data.content.length < 20) {
          that.setData({
            appointment: that.data.appointment.concat(res.data.content),
            type: 1,
            flag: false
          })

        } else {
          that.setData({
            appointment: that.data.appointment.concat(res.data.content),
            type: 1,
            flag: true
          })
        }



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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})