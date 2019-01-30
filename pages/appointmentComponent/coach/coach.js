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
    focus: false,
    isShowText: false,
    price:"",
    textareavalue: "",
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
      coachname: '',
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
console.log("options",options)
    // let data = JSON.parse(options.data)
    let a = options.data
    let data = JSON.parse(a)
    // let newdata = { ...data, reremark: ''}

    this.setData({
      htmlData: data,
      price: options.price || data.price
    })
  },
  onRemarkInput(event) {               //保存输入框填写内容
    var value = event.detail.value;
    this.setData({
      textareavalue: value,
    });
  },
  onShowText: function () {

    this.setData({
      isShowText: true,
      focus: false

    })
  },
  onShowTextare: function () {
    this.setData({
      isShowText: false,
      focus: true
    })
  }
  ,
  submitorder: function () {
    let that = this
    let data = this.data.htmlData
    let time = this.data.htmlData.bookingTime + ':00'
    
    data.bookingTime = time
    let datas = {
      ...data,
      remark: this.data.textareavalue
      
    }

    $.Requests_json(api.coach_app.url, datas).then(res => {
      console.log("确认,", datas)
      if (res.status == 0) {
        // wx.navigateTo({
        //   url: '../../bookingoreder/bookingoreder?icon=' + res.data.appointmentCommon.icon + "&orderNo=" + that.data.htmlData.orderNo + "&remark=" + that.data.htmlData.remark + "&gymName=" + res.data.appointmentCommon.gymName + "&uesCode=" + res.data.appointmentCommon.uesCode + "&bookingName=" + res.data.appointmentCommon.bookingName + "&address=" + that.data.htmlData.address + "&price=" + res.data.appointmentCommon.price + "&type=" + 1 + "&bookingTime=" + res.data.appointmentCommon.bookingTime,
        // })
        $.alert("预约成功")
        setTimeout(() => {
          wx.switchTab({
            url: '../../appointment/appointment',
            // success: function (e) {
            //   var page = getCurrentPages().pop();
            //   if (page == undefined || page == null) return;
            //   page.onLoad();
            // }
          })
        }, 500)
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
  textareavalue: function (e) { //输入手机号
    this.setData({
      textareavalue: e.detail.value
    });
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