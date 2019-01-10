// pages/confirmationOrder/confirmationOrder.js
var $ = require('../../utils/util.js');
var api = require('../../api/selfdails.js');
var apicou = require('../../api/coupon.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    

    var that = this;

    if (options.orderType == 2) {
      that.setData({
        formdata: options.data,
        orderType: options.orderType,

        scheduleDate: JSON.parse(options.data).bookingDate,
        tk_id: JSON.parse(options.data).tk_id,

        sta: options.sta,
        bookingTime: options.bookingTime,
      })
      

    } else if (options.optionstype == 2){
         that.setData({
           tk_id: options.tk_id
         })
    } else if (options.type === '场馆') {
      that.setData({
        formdata: options,
      })
    }
    wx.getStorage({
      key: 'groundName',
      success: function (res) {
        that.setData({
          groundName: res.data.groundName
        })

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
          yuyueformdate: options.day + options.time + ':00',
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
              address: options.address,
              groundName: options.groundName,
              groundId: options.groundId,
            })
            if (options.optionstype == 2) {
              that.setData({
                tk_id: options.coachcourseid
              })
              that.surebuy()
            } else if (options.orderType == 2) {
              let { tk_id, coachId, memberCourseId } = options
              that.setData({
                tk_id: tk_id,
                coachId: coachId,
                memberCourseId: memberCourseId
              })
              that.coach_course()

            } else {

              that.gymdetails();
            }


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
      schduleDate: that.data.formatDate,
    }

    $.Requests(api.coach_course.url + '/' + that.data.tk_id, val).then((res) => {
      
      
      

      that.setData({
        skgymdetails: res.data,
        jindu: res.data.appointmentNumb / res.data.course.contain
      })
    })
  },
  surebuy: function () {
    var that = this;
    var val = {}
    $.Requests(api.league_schedule.url + '/' + that.data.tk_id, val, val).then((res) => {


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
        shopid: res.data.id
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
    let Formdata = this.data.formdata
    // 
    // return
    if (that.data.sta == 1) {

      let Formdata = JSON.parse(this.data.formdata)
      // 
      var valteo = {
        coachId: that.data.coachId,
        coachcourseid: that.data.tk_id,
        memberCourseId: that.data.memberCourseId,
        gymId: 1,
        bookingDate: formatDate,
        memberId: that.data.memberId,
      }

      let val1 = {
        remark: that.data.textareavalue,
        bookingTime: that.data.bookingTime + ':00'
      }
      let data = {
        ...Formdata,
        ...val1,
        ...valteo
      }


      $.Requests_json(api.coach_app.url, data).then(res => {


        if (res.status == 0) {
          wx.navigateTo({
            url: '../bookingoreder/bookingoreder?icon=' + res.data.appointmentCommon.icon + "&orderNo=" + that.data.orderNo + "&remark=" + that.data.textareavalue + "&gymName=" + res.data.appointmentCommon.gymName + "&uesCode=" + res.data.appointmentCommon.uesCode + "&bookingName=" + res.data.appointmentCommon.bookingName + "&address=" + that.data.address + "&price=" + res.data.price,
          })
        } else {
          $.alert("预约失败")
        }

      })

    } else if (that.data.optionstype == 2 && that.data.sta != 1) {
      var val = {
        memberCourseId: that.data.memberCourseId,
        orderNo: that.data.orderNo,
        memberId: that.data.memberId,
        bookingTime: that.data.startTime,
        bookingDate: that.data.formatDate,
        numb: "1",

        remark: that.data.textareavalue,
        leagueScheduleId: that.data.leagueScheduleId
      }
      $.Requests_json(api.league_appointment.url, val).then((res) => {


        if (res.status == 0) {
          wx.navigateTo({
            url: '../bookingoreder/bookingoreder?icon=' + res.data.appointmentCommon.icon + "&orderNo=" + that.data.orderNo + "&remark=" + that.data.textareavalue + "&gymName=" + res.data.appointmentCommon.gymName + "&uesCode=" + res.data.appointmentCommon.uesCode + "&bookingName=" + res.data.appointmentCommon.bookingName + "&address=" + that.data.address + "&price=" + that.data.price,
          })
        } else {
          $.alert("预约失败")
        }




        that.setData({
          yuenum: res.data
        })

      })


    } else if (Formdata.type === '场馆'){
      
      let { time, day, memberFitnessId, groundId } = Formdata
      // return
      wx.getStorage({
        key: 'groundName',
        success: function (res) {
          var val = {
            appointmentDate: day,
            appointmentTime: time + ":00",
            memberFitnessId: memberFitnessId,
            numb: 1,
            // groundName: res.data.groundName,
            groundId: groundId,
            remark: that.data.textareavalue
          }
          $.Requests_json(api.ground_appointment.url, val).then((res) => {
            
            

            if (res.status == 0) {
              // wx.navigateTo({
              //   url: '../bookingoreder/bookingoreder?icon=' + res.data.appointmentCommon.icon + "&orderNo=" + that.data.orderNo + "&remark=" + that.data.textareavalue + "&gymName=" + res.data.appointmentCommon.gymName + "&uesCode=" + res.data.appointmentCommon.uesCode + "&bookingName=" + res.data.appointmentCommon.bookingName + "&address=" + that.data.address + "&price=" + that.data.price,
              // })
              $.alert("预约成功")
              setTimeout(()=> {
                wx.switchTab({
                  url: '../index/index'
                })
              }, 500)
              
            } else {
              $.alert("预约失败")
            }




            that.setData({
              yuenum: res.data
            })

          })
        }
      })





    }


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