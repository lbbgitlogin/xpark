// pages/ballappointment/ballappointment.js
var $ = require('../../utils/util.js');
var api = require('../../api/selfdails.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaId: "",
    address: "",
    id: "",
    arrIndex: -1,
    memberFitnessId: "",
    orderNo: "",
    orderNo: "",
    day: "",
    price: "",
    areaId:"",
    day: "",
    gymName:"",
    id:"",
    timenext: "",
    groundName: "",
    groundId: "",
    form: {
      bookingDate: "2018-12-28",
      bookingTime: "",
      groundId: "",
      coachId: 0,
      coachName: "string",
      commonId: 0,
      courseName: "string",
      gymId: 0,
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
    console.log("options",options)
    var that= this;
    console.log("groundball",options)
    that.setData({
      areaId: options.areaId,
      address: options.address,
      id: options.id,
      memberFitnessId: options.memberFitnessId,
      orderNo: options.orderNo,
      orderNo: options.orderNo,
      day: options.day,
      price: options.price,
    })
    
    that.groundball()
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
  groundball:function(){
   var that =this;
    var val={
      areaId: that.data.areaId
    }
    $.Requests(api.groundball.url, val).then((res) => {
      console.log("qiuleiyuyue", val)
      console.log("qiuleiyuyue", res)
      that.setData({
        roundName: res.data,
        groundId: res.data[0].id,
        // groundName: res.data[0].groundName,
        // groundId: res.data.groundId,
        // groundName: res.data.groundName
      })
      var obj = {
        groundName: res.data[0].groundName
      }
      wx.setStorage({
        key: 'groundName',
        data: obj,
      })
      // 绘制表格
      that.ballright()

    })

  },
  ballright:function(e){
    // console.log("e",e)
    let arrIndex = this.data.arrIndex;
    const roundName = this.data.roundName;
    console.log(arrIndex, roundName)

  
    if(arrIndex==roundName.length-1){
      return
    }else{
      arrIndex++
      var groundId = roundName[arrIndex].id;
      this.setData({
        groundId: groundId
      })
    }
    this.setData({
      arrIndex: arrIndex

    })
    console.log(arrIndex)
    var that = this;
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
    var day = now.getDate() < 10 ? "0" + (now.getDate()) : now.getDate();

    
      var formatDate = year + '-' + month + '-' + day;

  
    var val = {
      areaId: that.data.areaId,
      appointmentDate: that.data.day,
      groundId:  that.data.groundId,
    }
    $.Requests(api.appointment.url, val).then((res) => {
      let _this = this
      console.log("qiuleiyuyue11", val)
      console.log("qiuleiyuyue11", res)
      _this.setData({
        data: res.data,
        // gymName: res.data.groundAppointments[0].gymName,
        // id: res.data.groundAppointments[0].id,
      })
      that.drawTable()
    })

  },
  ballleft: function () {
    var that = this;

    // console.log("e",e)
    let arrIndex = this.data.arrIndex;
    const roundName = this.data.roundName;
    console.log(arrIndex)
    if (arrIndex ==0) {
      return
    } else {
      arrIndex--
      var groundId = roundName[arrIndex].id;
      that.setData({
        groundId: groundId
      })
    }
    that.setData({
      arrIndex: arrIndex
    })
    console.log(arrIndex)
    var that = this;
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
    var day = now.getDate() < 10 ? "0" + (now.getDate()) : now.getDate();


    var formatDate = year + '-' + month + '-' + day;


    var val = {
      areaId: that.data.areaId,
      appointmentDate: that.data.day,
      groundId: that.data.groundId,
    }
    $.Requests(api.appointment.url, val).then((res) => {
      let _this = this
      console.log("qiuleiyuyue11", val)
      console.log("qiuleiyuyue11", res)
      _this.setData({
        data: res.data,
        // gymName: res.data.groundAppointments[0].gymName,
        // id: res.data.groundAppointments[0].id,
      })
      that.drawTable()
    })
  },
  /**
   * 绘制表格
   */
  drawTable: function () {
    let _this = this
    const data = this.data.data // 接口数据
    console.log("ooo",data)
    let { businessEndTime, businessStartTime } = data.groundRegular
    var type = wx.getSystemInfoSync().system;
    console.log("type", type)
    console.log("type", type.indexOf("iOS"))
   
    if (type.indexOf("iOS") == 0) {
      var scheduleDate = '2018/12/12'
    } else {
      var scheduleDate = '2018-12-12'
    }
    console.log("scheduleDate:", scheduleDate)
    const { dailyStart, dailyEnd } = data.gym
    console.log("dailyStart:", dailyStart)
    const  timeLength  = 60 // 课程时长
    const coachAppointments = data.groundAppointments // 预约信息
    const menStart = new Date(`${scheduleDate} ${dailyStart}`) // 门店上班时间
    const menEnd = new Date(`${scheduleDate} ${dailyEnd}`) // 门店下班时间
    const coachstart = new Date(`${scheduleDate} ${businessStartTime}`) // 上班时间
    const coachend = new Date(`${scheduleDate} ${businessEndTime}`) // 下班时间
    const TimeNumbers = menEnd - menStart
    const timeItemLenght = (TimeNumbers / (timeLength * 60 * 1000)).toFixed()
    console.log("门店上班时间",menStart)
    console.log("TimeNumbers", TimeNumbers)
    console.log("timeItemLenght", timeItemLenght)
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
    
        falg = coachAppointments.some(function (item, index, array) {
          let now = new Date(`${scheduleDate} ${times}:00`).getTime()
          let last = new Date(`${scheduleDate} ${item.appointmentTime}`).getTime()
          if (last === now) {
            return true
          } else {
            return false
          }
        })
   
    
      let now = new Date(`${scheduleDate} ${times}:00`).getTime()
     
      if (coachstart.getTime() < now && coachend.getTime() > now || coachstart.getTime() === now ) {
        canSelect = true
      } else {
        canSelect = false
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
    console.log("item",item)
 
    const { canSelect, time, index, falg } = item.currentTarget.dataset.item

    // if(this.data.timenext == ''){
      if (canSelect) {
        let newdata = this.data.yuyueList
        if (newdata[index - 1].falg) {
          newdata[index - 1].falg = false
        } else {
        
          for (var i= 0; i < this.data.yuyueList.length;i++){
       
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
    // }else{
    
     
    
    // }  
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
  nextappiont:function(){
    var that = this;
   
    wx.navigateTo({
      url: '../confirmationOrder/confirmationOrder?time=' + that.data.timenext + "&gymName=" + that.data.gymName + "&groundName=" + that.data.groundName + "&areaId=" + that.data.areaId + "&address=" + that.data.address + "&id=" + that.data.id + "&memberFitnessId=" + that.data.memberFitnessId + "&orderNo=" + that.data.orderNo + "&day=" + that.data.day + "&price=" + that.data.price + "&groundId=" + that.data.groundId ,
    })  

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})