// pages/management/management.js
var app = getApp();
var CONFIG = require('../../config.js');
var $ = require('../../utils/util.js');
var api = require('../../api/management.js');
var selfdailsapi = require('../../api/selfdails.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: CONFIG.config.imgUrl,
    tapindex: 1,
    type: 2,
    member_orderlist: [],
    memberId: "",
    page: 1,
    flag: true
  },
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {

        that.setData({
          memberId: res.data.memberId,
        })
        
        that.member_orderlist()
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onReachBottom: function () { //滑动的底部加载下一页


    var thisobj = this;
    console.log("thisobj.data.tapindex", thisobj.data.tapindex)
    if (thisobj.data.flag) {


      thisobj.setData({
        page: thisobj.data.page + 1
      })
      if (thisobj.data.tapindex == 1) {
        thisobj.allorder()
      }
      if (thisobj.data.tapindex == 2) {
        thisobj.tobeorder()
      }
      if (thisobj.data.tapindex == 3) {
        thisobj.receorder()
      }
      if (thisobj.data.tapindex == 4) {
        thisobj.closeorder()
      }
    }


  },
  member_orderlist: function () { //门店订单列表全部
    var that = this;
    var val = {
      memberId: that.data.memberId,
      orderState: '',
      page: that.data.page
    }
    $.Requests(api.member_orderlist.url, val).then((res) => {



      if (!$.isNull(res.data.content) && res.status == 0) {
        that.setData({
          type: 1
        })
        if (res.data.content.length < 20) {
          that.setData({
            flag: false,
            member_orderlist: that.data.member_orderlist.concat(res.data.content)
          })
        } else {

          that.setData({
            flag: true,
            member_orderlist: that.data.member_orderlist.concat(res.data.content)
          })
        }
      } else {
        that.setData({
          type: 2
        })
      }

    })
  },
  allorder: function () {
    var that = this;
    var val = {
      memberId: that.data.memberId,
      orderState: '',
      page: that.data.page
    }
    $.Requests(api.member_orderlist.url, val).then((res) => {
      console.log("订单", val)
      console.log("订单",res)
      if (res.status ==  0) {
        that.setData({
          type: 1
        })
        if (res.data.content.length < 20) {
          that.setData({
            flag: false,
            member_orderlist: that.data.member_orderlist.concat(res.data.content)
          })
        } else {

          that.setData({
            flag: true,
            member_orderlist: that.data.member_orderlist.concat(res.data.content)
          })
        }
       
      }

    })
  },
  // aaa
  qxorder: function (e) {

    var that = this;
    var val = {
      id: e.currentTarget.dataset.id
    }
    $.Requests_json(selfdailsapi.qxorder.url, val).then((res) => {


      if (res.status == 0) {
        setTimeout(function () {


          $.alert("取消订单成功！")

        }, 500)
        if (that.data.tapindex == 2) {
          that.toBePaid()
        } else {
          that.setData({
            member_orderlist: [],
          })
          that.member_orderlist()
        }

      }

    })

  },
  godetails: function (e) {

    wx.navigateTo({
      url: '../orderdetails/orderdetails?orderstate=' + e.currentTarget.dataset.orderstate + "&orderno=" + e.currentTarget.dataset.orderno + "&gymname=" + e.currentTarget.dataset.gymname + "&psytype=" + e.currentTarget.dataset.psytype + "&price=" + e.currentTarget.dataset.price + "&goodsname=" + e.currentTarget.dataset.goodsname + "&createtime=" + e.currentTarget.dataset.createtime + "&num=" + e.currentTarget.dataset.num + "&discountmoney=" + e.currentTarget.dataset.discountmoney + "&id=" + e.currentTarget.dataset.id + "&ordertype=" + e.currentTarget.dataset.ordertype + "&usecode=" + e.currentTarget.dataset.usecode + "&actualmoney=" + e.currentTarget.dataset.actualmoney + "&createtimestr=" + e.currentTarget.dataset.createtimestr + "&img=" + e.currentTarget.dataset.img + "&updatetimestr=" + e.currentTarget.dataset.updatetimestr + "&invaliddatetime=" + e.currentTarget.dataset.invaliddatetime,

    })
  },
  allOrders: function () { //全部订单
    var that = this;
    this.setData({
      tapindex: 1,
      type: 1,
      page: 1,
      member_orderlist: []
    });
    that.member_orderlist()
  },
  toBePaid: function (e) { //待支付
    var that = this;
    that.setData({
      tapindex: 2,
      member_orderlist: [],
      page: 1
    });
    var val = {
      memberId: that.data.memberId,
      orderState: '0',
      page: 1
    }
    $.Requests(api.member_orderlist.url, val).then((res) => {



      if (!$.isNull(res.data.content) && res.status == 0) {
        that.setData({
          type: 1
        })
        if (res.data.content.length < 20) {
          that.setData({
            flag: false,
            member_orderlist: that.data.member_orderlist.concat(res.data.content)
          })
        } else {

          that.setData({
            flag: true,
            member_orderlist: that.data.member_orderlist.concat(res.data.content)
          })
        }
      } else {
        that.setData({
          type: 2,

        })
      }
    })
  },
  tobeorder: function () {
    var that = this;
    var val = {
      memberId: that.data.memberId,
      orderState: '0',
      page: that.data.page
    }
    $.Requests(api.member_orderlist.url, val).then((res) => {



      if (res.status == 0) {
        that.setData({
          type: 1
        })
        if (res.data.content.length < 20) {
          that.setData({
            flag: false,
            member_orderlist: that.data.member_orderlist.concat(res.data.content)
          })
        } else {

          that.setData({
            flag: true,
            member_orderlist: that.data.member_orderlist.concat(res.data.content)
          })
        }
      }
    })
  },
  receiptOfGoods: function (e) { //已支付
    var that = this;
    that.setData({
      member_orderlist: [],
      tapindex: 3,
      type: 2,
      page: 1
    });
    var val = {
      memberId: that.data.memberId,
      orderState: '1',
      page: 1
    }
    $.Requests(api.member_orderlist.url, val).then((res) => {


      if (!$.isNull(res.data.content) && res.status == 0) {
        that.setData({
          type: 1
        })
        if (res.data.content.length < 20) {
          that.setData({
            flag: false,
            member_orderlist: that.data.member_orderlist.concat(res.data.content)
          })
        } else {

          that.setData({
            flag: true,
            member_orderlist: that.data.member_orderlist.concat(res.data.content)
          })
        }
      } else {
        that.setData({
          type: 2
        })
      }
    })
  },

  receorder: function () {
    var that = this;
    var val = {
      memberId: that.data.memberId,
      orderState: '1',
      page: that.data.page
    }
    $.Requests(api.member_orderlist.url, val).then((res) => {
      console.log("已=支付",res)
      console.log("已=支付", val)
      if (res.status == 0) {

        that.setData({
          type: 1
        })
        if (res.data.content.length < 20) {
          that.setData({
            flag: false,
            member_orderlist: that.data.member_orderlist.concat(res.data.content)
          })
        } else {

          that.setData({
            flag: true,
            member_orderlist: that.data.member_orderlist.concat(res.data.content)
          })
        }
      }
    })
  },
  closed: function (e) { //已关闭
    var that = this;
    that.setData({
      member_orderlist: [],
      tapindex: 4,
      page: 1,
      type: 1
    });
    var val = {
      memberId: that.data.memberId,
      orderState: '3',
      page: 1
    }
    $.Requests(api.member_orderlist.url, val).then((res) => {

      if (!$.isNull(res.data.content) && res.status == 0) {
        that.setData({
          type: 1
        })
        if (res.data.content.length < 20) {
          that.setData({
            flag: false,
            member_orderlist: that.data.member_orderlist.concat(res.data.content)
          })
        } else {

          that.setData({
            flag: true,
            member_orderlist: that.data.member_orderlist.concat(res.data.content)
          })
        }
      } else {
        that.setData({
          type: 2
        })
      }
    })
  },
  closeorder: function () {
    var that = this;
    var val = {
      memberId: that.data.memberId,
      orderState: '3',
      page: that.data.page
    }
    $.Requests(api.member_orderlist.url, val).then((res) => {
      if (res.status == 0) {
        that.setData({
          type: 1
        })
        if (res.data.content.length < 20) {
          that.setData({
            flag: false,
            member_orderlist: that.data.member_orderlist.concat(res.data.content)
          })
        } else {

          that.setData({
            flag: true,
            member_orderlist: that.data.member_orderlist.concat(res.data.content)
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
    wx.switchTab({
      url: '../main/main',
    })
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