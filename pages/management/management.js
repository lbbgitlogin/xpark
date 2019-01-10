// pages/management/management.js
var app = getApp()
var $ = require('../../utils/util.js');
var api = require('../../api/management.js');
var selfdailsapi = require('../../api/selfdails.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tapindex: 1,
    type: 1,
    memberId:"",
    member_orderlist:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that=this;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        that.setData({
           memberId: res.data.memberId
         })
        that.member_orderlist()
      },
      fail: function (res) {
        $.alert("请先登录")
        setTimeout(function () {
          
                wx.navigateTo({
                  url: '../land/land',
                })
        
        }, 2000) //延迟时间 这里是1秒
        
      },
    })
   
  },
  member_orderlist: function () { //门店订单列表全部
  var that = this;
    var val = {
      memberId: that.data.memberId,
      orderState: '',
    
    }
    $.Requests(api.member_orderlist.url, val).then((res) => {

      if (res.data.content == '') {
        this.setData({
          type: 2
        })
      }
      
      
       that.setData({
         member_orderlist: res.data.content
        //  .map(item => {
        //    let datetiem = item.createTime;
        //    
        //    const date = new Date(datetiem);
        //    
        //    const year = date.getFullYear();
        //    
        //    const month = date.getMonth() + 1;
        //    const day = date.getDate();
        //    const hours = date.getHours();
        //    const minutes = date.getMinutes();
        //    const seccond = date.getSeconds();
        //    item.createTime = year + "年" + month + "月" + day + "日 " + hours + "时" + minutes + "分" + seccond + "秒"
        //    return item
        //  })
        
       })
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


          $.alert("取消预约成功！")

        }, 1000)
      that.onLoad()
      }

    })

  },
  godetails:function(e){
    
    wx.navigateTo({
      url: '../orderdetails/orderdetails?orderstate=' + e.currentTarget.dataset.orderstate + "&orderno=" + e.currentTarget.dataset.orderno + "&gymname=" + e.currentTarget.dataset.gymname + "&psytype=" + e.currentTarget.dataset.psytype + "&price=" + e.currentTarget.dataset.price + "&goodsname=" + e.currentTarget.dataset.goodsname + "&createtime=" + e.currentTarget.dataset.createtime + "&num=" + e.currentTarget.dataset.num + "&discountmoney=" + e.currentTarget.dataset.discountmoney + "&id=" + e.currentTarget.dataset.id,  
    })
  },
  allOrders: function () { //全部订单
  var that = this;
    this.setData({
      tapindex: 1,
      type: 1
    });
    that.member_orderlist()
  },
  toBePaid: function (e) { //待支付
  var that =this;
    that.setData({
      tapindex: 2,
    

    });
    var val = {
      memberId: that.data.memberId,
      orderState: '0',
   
    }
    $.Requests(api.member_orderlist.url, val).then((res) => {
      if (res.data.content == ''){
        this.setData({
          type: 2
        })
      }
      
      
      that.setData({
        member_orderlist: res.data.content
        // .map(item => {
        //   let datetiem = item.createTime;
        //   const date = new Date(datetiem);
        //   const year = date.getFullYear();
        //   const month = date.getMonth() + 1;
        //   const day = date.getDate();
        //   const hours = date.getHours();
        //   const minutes = date.getMinutes();
        //   const seccond = date.getSeconds();
        //   item.createTime = year + "年" + month + "月" + day + "日 " + hours + "时" + minutes + "分" + seccond + "秒"
        //   return item
        // })

      })
    })
  },
  receiptOfGoods: function (e) { //已支付
  var that = this;
    that.setData({
      tapindex: 3,
      type: 3
    });
    var val = {
      memberId: that.data.memberId,
      orderState: '1',

    }
    $.Requests(api.member_orderlist.url, val).then((res) => {
      if (res.data.content == '') {
        this.setData({
          type: 2
        })
      }
      
      

      that.setData({
        member_orderlist: res.data.content
        // .map(item => {
        //   let datetiem = item.createTime;
        //   const date = new Date(datetiem);
        //   const year = date.getFullYear();
        //   const month = date.getMonth() + 1;
        //   const day = date.getDate();
        //   const hours = date.getHours();
        //   const minutes = date.getMinutes();
        //   const seccond = date.getSeconds();
        //   item.createTime = year + "年" + month + "月" + day + "日 " + hours + "时" + minutes + "分" + seccond + "秒"
        //   return item
        // })

      })
    })
  },
  closed: function (e) { //已关闭
  var that =this;
    that.setData({
      tapindex: 4,
      type: 4    });
    var val = {
      memberId: that.data.memberId,
      orderState: '3',

    }
    $.Requests(api.member_orderlist.url, val).then((res) => {
      if (res.data.content == '') {
        this.setData({
          type: 2
        })
      }
      
      
      that.setData({
        member_orderlist: res.data.content
        // .map(item => {
        //   let datetiem = item.createTime;
        //   const date = new Date(datetiem);
        //   const year = date.getFullYear();
        //   const month = date.getMonth() + 1;
        //   const day = date.getDate();
        //   const hours = date.getHours();
        //   const minutes = date.getMinutes();
        //   const seccond = date.getSeconds();
        //   item.createTime = year + "年" + month + "月" + day + "日 " + hours + "时" + minutes + "分" + seccond + "秒"
        //   return item
        // })

      })
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