// pages/confirmationOrder/confirmationOrder.js
var $ = require('../../utils/util.js');
var api = require('../../api/selfdails.js');
var apicou = require('../../api/coupon.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formdatask: "",
    formdata: null,
    bookingTime: "",
    groundName: "",
    yuyueday: "",
    yuyuetime: "",
    memberCourseId: "",
    groundId: "",
    sta: "",
    skgymdetails: "",
    leagueScheduleId: "",
    memberId: "",
    areaId: "",
    tk_id: "",
    tkgymdetails: "",
    mobile: "",
    remark: "",
    gymId: "",
    orderType: "",
    optionstype: "",
    numb: "1",
    memberFitnessId: "",
    textareavalue: "",
    areaName: "",
    couponlenght: "",
    choose: false,
    orderNo: "",
    scheduleDate: "",
    memberName: "",
    startTime: "",
    skTime: "",
    yuechoose: true,
    address: "",
    wxyuechoose: false,
    hidden: 1,
    gymName: "",
    id: "",
    shopid: "",
    yuyueformdate: "",
    formatDate: "",
    gymdetails: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("options", options)

    var that = this;

   
    wx.getStorage({
      key: 'groundName',
      success: function (res) {
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
        var day = now.getDate() < 10 ? "0" + (now.getDate()) : now.getDate();
        var formatDate = year + '-' + month + '-' + day;

         
        that.setData({
          formatDate: formatDate,
          groundName: res.data.groundName,
          tk_id: options.tk_id,
          yuyueformdate: options.day + options.time + ':00',
        })
        that.coach_course()
      }
    })

    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        that.setData({
          memberId: res.data.memberId,
          mobile: res.data.mobile,
          memberName: res.data.memberName,
          yuyueday: options.day || '',
          skTime: options.bookingTime + ':00' || '',
          yuyuetime: options.time + ':00' || '',
        
          optionstype: options.optionstype,
          // tk_id: JSON.parse(options.data).tk_id,
          memberCourseId: options.memberCourseId
        })
        wx.getStorage({
          key: 'gymId',
          success: function (res) {
            that.setData({
              gymId: res.data.gymId,
              id: options.id,
              memberFitnessId: options.memberFitnessId,
              orderNo: options.orderNo,
              price: options.price,
              tk_id: options.tk_id,
              address: options.address,
              groundName: options.groundName,
              groundId: options.groundId,
              bookingDate: JSON.parse(options.data).bookingDate,
              bookingTime: options.bookingTime,
              yuyueformdate: JSON.parse(options.data).bookingDate + options.bookingTime + ':00',
              coachId: options.coachId,
              memberCourseId: JSON.parse(options.data).memberCourseId,
            })

            that.coach_course()
          }
        })


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



    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
    var day = now.getDate() < 10 ? "0" + (now.getDate()) : now.getDate();
    var formatDate = year + '-' + month + '-' + day;
    that.setData({
      formatDate: formatDate,
      id: options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  coach_course: function () { //私课详情
    var that = this;
    var val = {
      schduleDate: that.data.bookingDate,
    }
 
    $.Requests(api.coach_course.url + '/' + that.data.tk_id, val).then((res) => {
      console.log("私课详情", val)
      console.log("私课详情", res)



      that.setData({
        skgymdetails: res.data,
        jindu: res.data.appointmentNumb / res.data.course.contain
      })
    })
  },
  surebuy: function () {
    var that = this;
    var val = {}
    $.Requests(api.league_schedule.url + '/' + that.data.tk_id, val).then((res) => {
      console.log("tuanbke ", res)

      var now = new Date();
      var year = now.getFullYear();
      var month = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
      var day = now.getDate() < 10 ? "0" + (now.getDate()) : now.getDate();
      var formatDate = year + '-' + month + '-' + day;
      that.setData({
        formatDate: formatDate,
        goodsId: res.data.id,
        startTime: res.data.startTime,
        tkgymdetails: res.data,
        jindu: res.data.appointmentNumb / res.data.course.contain,
        tkareaId: res.data.areaId,
        leagueScheduleId: res.data.id
      })
    })
  },
  textareavalue: function (e) { //输入手机号
    this.setData({
      textareavalue: e.detail.value
    });
  },
  gymdetails: function () {
    var that = this;
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
    var day = now.getDate() < 10 ? "0" + (now.getDate()) : now.getDate();
    var formatDate = year + '-' + month + '-' + day;
    that.setData({
      formatDate: formatDate
    })
    var val = {

      appointmentDate: that.data.yuyueday
    }
    $.Requests(api.gymdetails.url + '/' + that.data.id, val).then((res) => {



      that.setData({
        gymdetails: res.data,
        areaId: res.data.areaId,
        gymName: res.data.gym.gymName,
        shopid: res.data.id,
        address: res.data.gym.address,
      })
      // this.setData({

      //   classifyClick: res.data.content

      // })
    })


  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  // formSubmit:function(){
  //    wx.navigateTo({
  //      url: '',
  //    })


  // },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  submitorder: function () {

    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
    var day = now.getDate() < 10 ? "0" + (now.getDate()) : now.getDate();
    var formatDate = year + '-' + month + '-' + day;

    var that = this;
    let formdatask = that.data.formdatask
  
      let Formdata = JSON.parse(this.data.formdata)
      console.log("Formdata", Formdata)
      // 
      var valteo = {
        coachId: that.data.coachId,
        coachcourseid: that.data.tk_id,
        memberCourseId: that.data.memberCourseId,
        gymId: 1,
        numb:1,
        bookingDate: that.data.bookingDate,
        memberId: that.data.memberId,
      }

      let val1 = {
        remark: that.data.textareavalue,
        bookingTime: that.data.bookingTime + ':00'
      }
      let data = {
        ...Formdata,
        ...formdatask,
        ...val1,
        ...valteo
      }


      $.Requests_json(api.coach_app.url, data).then(res => {
        console.log("sike", data)
        console.log("sike", res)
        if (res.status == 0) {
          wx.navigateTo({
            url: '../bookingoreder/bookingoreder?icon=' + res.data.appointmentCommon.icon + "&orderNo=" + that.data.orderNo + "&remark=" + that.data.textareavalue + "&gymName=" + res.data.appointmentCommon.gymName + "&uesCode=" + res.data.appointmentCommon.uesCode + "&bookingName=" + res.data.appointmentCommon.bookingName + "&address=" + that.data.address + "&price=" + res.data.appointmentCommon.price + "&bookingTime=" + res.data.appointmentCommon.bookingTime + "&type=" + res.data.state,
          })
        } else {
          $.alert("预约失败")
        }

      })




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