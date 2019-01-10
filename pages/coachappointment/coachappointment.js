// pages/ballappointment/ballappointment.js
var $ = require('../../utils/util.js');
var api = require('../../api/selfdails.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fromData: {
      memberCourseId: '',
      memberId: '',
      gymId: '',
      coachcourseid: "",
      coachId: '',
      bookingDate: '',
      bookingTime: '',
      numb: 1,
      remark: ''
    },
    optionsdata: null,
    form: {
      bookingDate: "2018-12-28",
      bookingTime: "",
      coachId: 0,
      coachName: "string",
      commonId: 0,
      formatDate: "",
      courseName: "string",
      gymId: 0,
      sjdata: '',
      memberCourseId: 0,
      memberId: 0,
     
      memberName: "string",
      mobile: "string",
      numb: 0,
      operation: "string",
      operationId: 0,
      remark: "string",
      state: 0,
      timeLength: 0
    },
    number: 1,
    tk_id:"",
    gymId: "",
    sta: "",
    orderNo: "",
    sjdata: '',
    coachId: '',
    bookingTime: '',
    memberId: "",
    timenext: "",
    yuyueList: [

    ],
    timeList: {
      ground: {
        start: '08:00:00',
        end: '22:00:00'
      },
      course: {
        id: 1,
        courseName: "瑜伽",
        itemId: 2,
        itemNo: "SI-FIT",
        isSelf: 0,
        category: 1,
        label: 1,
        contain: 1,
        timeLength: 30,
        orderWeight: 1,
        isLive: 0,
        isLineShow: 0,
        icon: "/image/20181224/eb519330-fab1-40f2-8609-fa696ccb1a69.jpg",
        introduce: "产品介绍",
        buyNotes: "购买须知",
        useNotes: "使用流程",
        state: 1,
      },
      coachAppointments: [
        {
          id: 2,
          commonId: 0,
          gymId: 1,
          data:"",
          memberId: 13,
          memberName: "sunlight",
          mobile: "15770900652",
          memberCourseId: 1,
          courseName: "瑜伽",
          timeLength: 60,
          coachId: 1,
          coachName: "张三",
          bookingDate: "2018-12-31",
          bookingTime: "11:00:00",
          numb: 1,
          operationId: 1,
          operation: "11",
          state: 0,
          remark: "备注",
        },
        {
          id: 2,
          commonId: 0,
          gymId: 1,
          memberId: 13,
          memberName: "sunlight",
          mobile: "15770900652",
          memberCourseId: 1,
          courseName: "瑜伽",
          timeLength: 60,
          coachId: 1,
          coachName: "张三",
          bookingDate: "2018-12-31",
          bookingTime: "12:00:00",
          numb: 1,
          operationId: 1,
          operation: "11",
          state: 0,
          remark: "备注",
        }
      ],
      coachSchedule: {
        id: 3,
        gymId: 1,
        coachId: 1,
        coachName: "张三",
        scheduleDate: "2018-12-31",
        scheduleStart: "09:00:00",
        scheduleEnd: "15:00:00",
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    wx.getStorage({
      key: 'gymId',
      success: function (res) {
        that.setData({
          gymId: res.data.gymId,
          orderNo: options.orderNo,
          coachcourseid: options.coachcourseid
        })
        wx.getStorage({
          key: 'userinfo',
          success: function (res) {
            that.setData({
              memberId: res.data.memberId,
              coachId: options.coachId
            })
            console.log("options", options)
            if (options.ifsj != 1){
              let data = JSON.parse(options.data)
              let { memberCourseId, scheduleDate } = data

              that.setData({
                sta: options.sta,
                fromData: {
                  memberCourseId,
                  bookingDate: scheduleDate,

                  numb: 1,
                  tk_id: options.tk_id || options.coachcourseid,
                  memberId: that.data.memberId,
                  gymId: that.data.gymId,
                }
              })
            }else{
              that.setData({
                memberCourseId: options.memberCourseId,
                tk_id: options.tk_id || options.coachcourseid,
              })
            }
      
            
            that.coach_appointment()
          }
        })
      
   

      },
    })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  addnumber: function () {
    this.setData({
      number: this.data.number + 1
    })
  },
  /**
   * 绘制表格
   */
  drawTable: function () {
    let _this = this
    const data = this.data.sjdata // 接口数据
    console.log(data)
    let { businessEndTime, businessStartTime } = data.coachSchedule
    var type = wx.getSystemInfoSync().system;
    console.log("type", type)
    console.log("type", type.indexOf("iOS"))
    if (type.indexOf("iOS") == 0) {
      var scheduleDate = '2018/12/12'
    } else {
      var scheduleDate = '2018-12-12'
    }
  
    const { dailyStart, dailyEnd } = data.gym
    const timeLength = 60 // 课程时长
    const coachAppointments = data.groundAppointments // 预约信息
    const menStart = new Date(`${scheduleDate} ${dailyStart}`) // 门店上班时间
    const menEnd = new Date(`${scheduleDate} ${dailyEnd}`) // 门店下班时间
    const coachstart = new Date(`${scheduleDate} ${businessStartTime}`) // 上班时间
    const coachend = new Date(`${scheduleDate} ${businessEndTime}`) // 下班时间
    const TimeNumbers = menEnd - menStart
    const timeItemLenght = (TimeNumbers / (timeLength * 60 * 1000)).toFixed()
    console.log(menStart)
    let group = []
    let uptime = menStart.getTime()
    let Hours = null
    let Minutes = null
    let falg = false
    let canSelect = false
    let times = null
    for (let index = 0; index < timeItemLenght; index++) {
      Hours = new Date(uptime).getHours()
      Minutes = new Date(uptime).getMinutes()
      if (Hours.toString().length < 2) {
        Hours = '0' + Hours
      }
      if (Minutes.toString().length < 2) {
        Minutes = '0' + Minutes
      }
      times = Hours + ':' + Minutes
      uptime = uptime + (timeLength * 60 * 1000)   // 每次递增增加时间
      if (coachAppointments != undefined) {
      falg = coachAppointments.some(function (item, index, array) {
        let now = new Date(`${scheduleDate} ${times}:00`).getTime()
        let last = new Date(`${scheduleDate} ${item.appointmentTime}`).getTime()
        if (last === now) {
          return true
        } else {
          return false
        }
      })
      }
      let now = new Date(`${scheduleDate} ${times}:00`).getTime()
     
      if (coachstart.getTime() < now && coachend.getTime() > now || coachstart.getTime() === now) {
        canSelect = false
      } else {
        canSelect = true
      }
      group.push({
        time: times,
        falg,
        canSelect,
        index: index + 1
      })
    }
    _this.setData({
      yuyueList: group
    })
    console.log(group)

  },
  add: function (item) {


    const { canSelect, time, index } = item.currentTarget.dataset.item

 
 
      if (canSelect) {
        let newdata = this.data.yuyueList
        if (newdata[index - 1].falg) {
          newdata[index - 1].falg = false
        } else {
      
          for (var i = 0; i < this.data.yuyueList.length; i++) {

            newdata[i].falg = false
          }
          newdata[index - 1].falg = true
        }
        console.log(newdata[index].flag, newdata)

        this.setData({
          yuyueList: newdata
        })
      }
      this.setData({
        timenext: time
      })
      console.log("this.data.time", item)

      return;
  },


  toNext: function () {
 
      var that = this;
      let data = JSON.stringify(this.data.fromData)
      wx.navigateTo({
        url: '../confirmationOrder/confirmationOrder' + `?data=${data}` + "&orderType=" + 2 + "&tk_id=" + that.data.tk_id + "&sta=" + 1 + "&orderNo=" + that.data.orderNo + "&bookingTime=" + that.data.timenext + "&coachId=" + that.data.coachId + "&memberCourseId=" + that.data.memberCourseId
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
  coach_appointment: function () {
    var that =this;
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
    var day = now.getDate() < 10 ? "0" + (now.getDate()) : now.getDate();
    var formatDate = year + '-' + month + '-' + day;
    that.setData({
      formatDate: formatDate
    })
  var val = {
    coachId: that.data.coachId,
    appointmentDate: formatDate,
    gymId: that.data.gymId,
    memberCourseId: that.data.fromData.memberCourseId || that.data.memberCourseId
  }
    $.Requests(api.coach_appointment.url, val).then((res) => {

    console.log("私教预约", val)
      console.log("私教预约", res)
      that.setData({
      sjdata: res.data,
      // gymName: res.data.groundAppointments[0].gymName,
      // id: res.data.groundAppointments[0].id,
    })
    that.drawTable()
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