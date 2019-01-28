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
    tk_id: "",
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

    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
    var that = this;
    wx.getStorage({
      key: 'gymId',
      success: function (res) {
        that.setData({
          gymId: res.data.gymId,
          orderNo: options.orderNo ||'',
          price: options.price || '',
          coachcourseid: options.coachcourseid || ''
        })
        wx.getStorage({
          key: 'userinfo',
          success: function (res) {
            let data = options
            let { memberCourseId, scheduleDate } = data
            that.setData({
              sta: options.sta || '',
              fromData: {
                memberCourseId,
                bookingDate: scheduleDate,
                scheduleDate: scheduleDate,
                numb: 1,
                tk_id: options.tk_id || options.coachcourseid,
                memberId: that.data.memberId,
                gymId: that.data.gymId,
              }
            })


            that.setData({
              memberId: res.data.memberId,
              coachId: options.coachId || ''
            })

            // if (options.ifsj != 1) {
            //   let { memberCourseId, scheduleDate } = data
            //   
            //   that.setData({
            //     sta: options.sta,
            //     fromData: {
            //       memberCourseId,
            //       bookingDate: scheduleDate,
            //       scheduleDate: scheduleDate,
            //       numb: 1,
            //       tk_id: options.tk_id || options.coachcourseid,
            //       memberId: that.data.memberId,
            //       gymId: that.data.gymId,
            //     }
            //   })
            // } else {
            //   
            //   // let { memberCourseId, scheduleDate } = data
            //   that.setData({
            //     memberCourseId: options.memberCourseId,
            //     tk_id: options.tk_id || options.coachcourseid,
            //     coachCoures: data
            //   })
            // }


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

    let { businessEndTime, businessStartTime } = data.coachSchedule
    var type = wx.getSystemInfoSync().system;
    let date = new Date(_this.data.fromData.scheduleDate,)
    let years = date.getFullYear()
    let months = date.getMonth() + 1
    let days = date.getDate()

    if (type.indexOf("iOS") == 0) {
      var scheduleDate = `${years}/${months}/${days}`
    } else {
      var scheduleDate = `${years}-${months}-${days}`
    }
    const { scheduleStart, scheduleEnd } = data.coachSchedule
    const { timeLength } = data.course // 课程时长
    const coachAppointments = data.coachAppointments // 预约信息
    const menStart = new Date(`${scheduleDate} ${scheduleStart}`) // 门店上班时间
    const menEnd = new Date(`${scheduleDate} ${scheduleEnd}`) // 门店下班时间
    const coachstart = new Date(`${scheduleDate} ${businessStartTime}`) // 上班时间
    const coachend = new Date(`${scheduleDate} ${businessEndTime}`) // 下班时间
    const TimeNumbers = menEnd - menStart

    const timeItemLenght = (TimeNumbers / (timeLength * 60 * 1000)).toFixed()
    // 
    let group = []
    let uptime = menStart.getTime()
    let Hours = null
    let Minutes = null
    let falg = false
    let canSelect = false
    let times = null
    let acticed = false

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
          let last = new Date(`${scheduleDate} ${item.bookingTime}`).getTime()
          if (last === now) {
            return true
          } else {
            return false
          }
        })
      }

      let now = new Date().getTime()
      // let now = 1547186186940
      let time = new Date(`${scheduleDate} ${times}:00`).getTime()
      time < now ? canSelect = false : canSelect = true

      group.push({
        time: times,
        falg,
        canSelect,
        acticed,
        index: index + 1
      })
    }

    _this.setData({
      yuyueList: group
    })


  },
  add: function (item) {


    const { canSelect, time, index } = item.currentTarget.dataset.item



    if (canSelect) {
      let newdata = this.data.yuyueList
      if (newdata[index - 1].falg) {
      } else {
        if (newdata[index - 1].acticed) {
          newdata[index - 1].acticed = false
          this.setData({
            timenext: ''
          })
        } else {
          newdata.forEach(e => {
            e.acticed = false
          });
          newdata[index - 1].acticed = true
          this.setData({
            timenext: time
          })
        }
      }


      this.setData({
        yuyueList: newdata
      })
    }

  },


  toNext: function () {
    
    let { bookingDate, memberCourseId, numb } = this.data.fromData
    let { memberId, orderNo } = this.data
    let { courseName, icon } = this.data.sjdata.course
    let { coachName } = this.data.sjdata.coachSchedule
    let { address, gymName} = this.data.sjdata.gym
    let bookingTime = this.data.timenext
    let remark = ''
    let data = Object.assign({
      bookingDate,
      coachName,
      memberCourseId,
      numb,
      memberId,
      orderNo,
      courseName,
      icon,
      address,
      gymName,
      bookingTime,
      remark
    })
    let setdata = JSON.stringify(data)
    if (this.data.timenext === '') {
      $.alert('请选择时间')
      return
    }
    wx.navigateTo({
      url: `../appointmentComponent/coach/coach?data=${setdata}` + "&price=" + this.data.price
    })
    
    // '../confirmationOrder/confirmationOrder' 
    // + `?data=${data}` + 
    // "&orderType=" + 2 + 
    // "&tk_id=" + that.data.tk_id + 
    // "&sta=" + 1 + 
    // "&orderNo=" + that.data.orderNo + 
    // "&bookingTime=" + that.data.timenext + 
    // "&coachId=" + that.data.coachId + 
    // "&memberCourseId=" + that.data.memberCourseId


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
    var that = this;
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
    var day = now.getDate() < 10 ? "0" + (now.getDate()) : now.getDate();
    var formatDate = year + '-' + month + '-' + day;
    // that.setData({
    //   formatDate: formatDate
    // })
    
    var val = {
      coachId: that.data.coachId,
      // appointmentDate: formatDate,
      appointmentDate: that.data.fromData.scheduleDate,
      gymId: that.data.gymId,
      memberCourseId: that.data.fromData.memberCourseId || that.data.memberCourseId
    }
    $.Requests(api.coach_appointment.url, val).then((res) => {
 console.log("位置",res)
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