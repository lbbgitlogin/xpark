// pages/confirmationOrder/confirmationOrder.js
var $ = require('../../../utils/util.js');
var api = require('../../../api/selfdails.js');
var CONFIG = require('../../../config.js');
var apicou = require('../../../api/coupon.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: CONFIG.config.imgUrl,
    formData: {
      coachId: '',
      coachcourseid: '',
      memberCourseId: '',
      bookingDate: '',
      memberId: '',
      remark: '',
      bookingTime: ''
    },
    htmlData: {
      bookingTime: '',
      bookingDate: '',
      memberCourseId: '',
      numb: 1,
      memberId: '',
      orderNo: '',
      courseName: '',
      icon: '',
      address: '',
      gymName: '',
      remark: ''
    },
    text: '1'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // let data = JSON.parse(options.data)
    let a = options.data
    let data = JSON.parse(a)
    // let newdata = { ...data, reremark: ''}
    
    this.setData({
      htmlData: data
    })
  },
  submitorder: function () {
    let that = this
    let data = this.data.htmlData
    let time = this.data.htmlData.bookingTime + ':00'
    data.bookingTime = time
    $.Requests_json(api.coach_app.url, data).then(res => {
      
      if (res.status == 0) {
        wx.navigateTo({
          url: '../../bookingoreder/bookingoreder?icon=' + res.data.appointmentCommon.icon + "&orderNo=" + that.data.htmlData.orderNo + "&remark=" + that.data.htmlData.remark + "&gymName=" + res.data.appointmentCommon.gymName + "&uesCode=" + res.data.appointmentCommon.uesCode + "&bookingName=" + res.data.appointmentCommon.bookingName + "&address=" + that.data.htmlData.address + "&price=" + res.data.price,
        })
      } else {
        $.alert("预约失败")
      }
    })
  },
  /*
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