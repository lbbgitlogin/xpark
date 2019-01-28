// pages/bookingoreder/bookingoreder.js
// pages/confirmationOrder/confirmationOrder.js
var $ = require('../../utils/util.js');
var CONFIG = require('../../config.js');
var api = require('../../api/selfdails.js');
var indexapi = require('../../api/indexAPI.js');
var apicou = require('../../api/coupon.js');
var QRCode = require('../../utils/weapp.qrcode.esm.js');
import drawQrcode from '../../utils/weapp.qrcode.esm.js' 
var qrcode;


Page({

  /**
   * 页面的初始数据
   */

  data: {
    imgurl: CONFIG.config.imgUrl,
    id:"",
    groundname: "",
    icon:"",
    outdooraddress: "",
    text:"",
    updatetimestr: "",
    cancelprice: "",
    num: "",
    address: "",
    coachname: "",
    price: "",
    mobilephone: "",
    ordertype:"",
    uesCode: "",
    gymName:"",
    dingdanid: "",
    bookingName: "",
    formatDate:"",
    gymdetails:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("options",options)
    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        that.setData({
          memberId: res.data.memberId,
          mobile: res.data.mobile,
          memberName: res.data.memberName,
          
        })
        
        wx.getStorage({
          key: 'gymId',
          success: function (res) {
            that.setData({
              gymId: res.data.gymId,
              id: options.id || '',
              memberFitnessId: options.memberFitnessId ||'',
              icon: options.icon || '',
              outdooraddress: options.outdooraddress || '',
              coachname: options.coachname || '',
              groundname: options.groundname || '',
              num:options.num || '',
              bookingName: options.bookingName || '',
              updatetimestr: options.updatetimestr || '',
              cancelprice: options.cancelprice || '',
              gymName: options.gymName || '',
              dingdanid: options.dingdanid || '',
              orderNo: options.orderNo || options.orderno || '',
              ordertype: options.type || '',
              remark: options.remark || '',
              uesCode: options.uesCode || '',
              address: options.address || '',
              price: options.price || '',
            })
            that.draw();
            that.xparkshop();
          }
        })


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



    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var formatDate = year + '-' + month + '-' + day;
    that.setData({
      formatDate: options.bookingTime || options.bookingdate +' '+ options.bookingtime|| formatDate,
      id: options.id ||''
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  call: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone,
    })
  },

  draw() {
    var that = this;
    drawQrcode({
      width: 168, //二维码宽高,宽高要与canvas标签宽高一致
      height: 168,
      canvasId: 'myQrcode',
      text: that.data.uesCode //二维码内容
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

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },
  appointment_common:function(){
  
    var that = this;
    that.checkcancel();

  

  
  },
  checkcancel:function(){
     var that = this;
    var val = {}
    $.Requestsput(api.checkcancel.url + '/' + that.data.dingdanid, val).then((res) => {
      console.log("res", that.data.dingdanid)
      console.log("res",res)
      if(res.data == 0){
        wx.showModal({
          title: '提示',
          content: '您确定要取消该课程吗？',
          success(res) {
            if (res.confirm) {
              var val = {}
              $.Requestsput(api.appointment_common.url + '/' + that.data.dingdanid, val).then((res) => {


                if (res.status == 0) {
                  setTimeout(function () {


                    $.alert("取消预约成功！")

                  }, 1000)
                  setTimeout(function () {

                    wx.switchTab({

                      url: '../appointment/appointment',
                      success: function (e) {
                        var page = getCurrentPages().pop();
                        if (page == undefined || page == null) return;
                        page.onLoad();
                      }
                    })

                  }, 2000)
                }

              })
            } else if (res.cancel) {
              return false;
            }
          }
        })
      }else{

        wx.showModal({
          title: '提示',
          content: '将扣除'+res.data+'元手续费，是否取消？',
          success(res) {
            if (res.confirm) {
              var val = {}
              $.Requestsput(api.appointment_common.url + '/' + that.data.dingdanid, val).then((res) => {


                if (res.status == 0) {
                  setTimeout(function () {


                    $.alert("取消预约成功！")

                  }, 1000)
                  setTimeout(function () {

                    wx.switchTab({

                      url: '../appointment/appointment',
                      success: function (e) {
                        var page = getCurrentPages().pop();
                        if (page == undefined || page == null) return;
                        page.onLoad();
                      }
                    })

                  }, 2000)
                }

              })
            } else if (res.cancel) {
              return false;
            }
          }
        })
      }
     
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },
  xparkshop: function () {
    var val = {}
    $.Requests(indexapi.xparkshop.url + '/' + 1, val).then((res) => {
      
      this.setData({
        mobilephone: res.data.mobile
      })
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