// pages/confirmationbuy/confirmationbuy.js
var app = getApp();
var $ = require('../../utils/util.js');
var api = require('../../api/selfdails.js');
var apicou = require('../../api/coupon.js');
function debounce(func, wait = 400) {
  let timeout;
  return function (event) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.call(this, event)
    }, wait);
  };
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    memberId: "",
    buy_num: 1,
    mjbox:false,
    coachCourseId:"",
    goodsId: "",
    maxnum: "",
    minnum: "",
    conmoney: "",
    areaId: "",
    clickshow: true,
    vip: "",
    discountMoney: "",
    fullNumb: "",
    tkareaId: "",
    price: "",
    coachId: "",
    category: "",
    mobile: "",
    shopdetails: "",
    scheduleStart: "",
    sta: "",
    icon: "",
    gymId: "",
    optionstype: "",
    numb: "1",
    couponlenght: "",
    choose: false,
    memberName: "",
    shopprice: "",
    tk_id: "",
    shopprice: "",
    shoptype: "",
    yuechoose: true,
    wxyuechoose: false,
    hidden: 1,
    gymName: "",
    address: "",
    id: "",
    openid: "",
    itemNo: "",
    shopid: "",
    yuenum: "",
    formatDate: "",
    gymdetails: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("确认", options)
    var that = this;

    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        that.setData({
          memberId: res.data.memberId,
          mobile: res.data.mobile,
          memberName: res.data.memberName,
          tk_id: options.tk_id,
          couponid: options.couponid || '',
          conmoney: options.conmoney || '',
          category: options.category || '',
          coachId: options.coachId || '',
          scheduleDate: options.scheduleDate,
          formatdates: options.formatdates,
          openid: res.data.openID

        })
        wx.getStorage({
          key: 'gymId',
          success: function (res) {
            that.setData({
              gymId: res.data.gymId,
              id: options.id,
              shopid: options.id,
              optionstype: options.optionstype,
              sta: options.sta,
              shoptype: options.type
            })
            that.couponlist();
            that.member();
            if (options.optionstype == 2 && options.sta != 1) {
              that.league_schedule()
              
            } else if (options.type == 3) {

              that.shopdetails()

            } else if (options.optionstype == 2 && options.sta == 1) {
              that.coach_course()

            } else {
              that.gymdetails();
            }

            that.yuenum()
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






  },
  // 减号 1
  bindMinus: function (e) {
    if (this.data.buy_num > 1) {
      this.pay_num(this.data.buy_num - 1)
    }
    if (Number(this.data.buy_num) < Number(this.data.maxnum)) {
      this.setData({
        clickshow: true
      })
    }
  },
  // 加号 1
  bindPlus: function (e) {
    if (Number(this.data.buy_num) < Number(this.data.maxnum)) {
      this.pay_num(this.data.buy_num + 1)
    }
  },
  // change: debounce(function (e) {
  //   console.log(e)
  //   console.log(this)
  // })
  pay_num: debounce(function (e) {
    console.log("数量", e)
    var that = this;
    if (e > 0) {
      that.setData({
        buy_num: e

      })

    } else {
      that.setData({
        buy_num: 1

      })
    }
    
    if (e.type == 'change') {
      //如果是input的change事件 buy_num 就赋值为用户手动输入的值
      if (e.detail.value < 1) {
        that.setData({
          buy_num: 1
        })
      } else {
        that.setData({
          buy_num: e.detail.value
        })
      }

    }
    console.log(that.data.buy_num, that.data.maxnum)
    if (Number(that.data.buy_num) < Number(that.data.maxnum)) {
      //判断用户输入的数量是否超过库存

    } else {


      this.setData({
        clickshow: false,
        buy_num: that.data.maxnum
      })
    }
    that.courseFullDiscount()

  }),

  courseFullDiscount:function(){
  
    var that =this;
    var val={
      coachCourseId: that.data.coachCourseId || that.data.tk_id,
      numb: that.data.buy_num
    }
    $.Requests(api.courseFullDiscount.url, val).then((res) => {
         console.log("满减",res)
      if(res.data  == null){
        that.setData({
          mjbox:false
        })
      }else{
        that.setData({
          mjbox: true,
          discountMoney: res.data.discountMoney,
          fullNumb: res.data.fullNumb
        })
      }
      console.log("满键",res)

      console.log("满键", val)

    })

  },

  shopdetails: function () {
    var that = this;
    var val = {}
    $.Requests(api.shopdetails.url + '/' + that.data.shopid, val).then((res) => {
      let { price } = res.data
      that.setData({
        shopdetails: res.data,
        gymName: res.data.gym.gymName,
        areaId: res.data.areaId,
        price: price,
        icon: res.data.gym.icon,
        address: res.data.gym.address,
        goodsId: res.data.id,
      })
      // if (that.data.couponid != "") {
      //   that.setData({
      //     price: 0
      //   })
      // }



    })
  },
  member: function () { //会员卡查询
    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        var val = {
          memberId: res.data.memberId,

        }
        $.Requests(api.member.url, val).then((res) => {
        console.log("会员查询",res)

          if (res.data.length == 0) {


          } else {
            that.setData({
              vip: res.data[0].vip
            })
          }

        })

      },

    })

  },
  league_schedule: function () {

    var that = this;
    var val = {}
    $.Requests(api.league_schedule.url + '/' + that.data.tk_id, val).then((res) => {
      console.log("团课", res)

      let { price, areaId } = res.data

      var now = new Date();
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var day = now.getDate();
      var formatDate = year + '-' + month + '-' + day;
      if(that.data.vip == 1){
        that.setData({
          formatDate: formatDate,
          coachCourseId: res.data.coachCourseId,
          goodsId: res.data.id,
          shopprice: res.data.price,
          maxnum: res.data.maxNumb,
          minnum: res.data.mixNumb,
          tkgymdetails: res.data,
          price: price * 0.9 * that.data.buy_num,
          jindu: res.data.appointmentNumb / res.data.course.contain,
          tkareaId: areaId
        })
      }
      if(that.data.vip == 2){
        that.setData({
          formatDate: formatDate,
          goodsId: res.data.id,
          coachCourseId: res.data.coachCourseId,
          maxnum: res.data.maxNumb,
          minnum: res.data.mixNumb,
          shopprice: res.data.price,
          tkgymdetails: res.data,
          price: price * 0.8 * that.data.buy_num,
          jindu: res.data.appointmentNumb / res.data.course.contain,
          tkareaId: areaId
        })
      }
      if (that.data.vip != 2 && that.data.vip != 1){
        that.setData({
          formatDate: formatDate,
          goodsId: res.data.id,
          coachCourseId: res.data.coachCourseId,
          maxnum: res.data.maxNumb,
          minnum: res.data.mixNumb,
          tkgymdetails: res.data,
          shopprice: price,
          jindu: res.data.appointmentNumb / res.data.course.contain,
          tkareaId: areaId
        })
      }
   
      if (that.data.category == 2) {
        that.setData({
          price: 0,
          mjbox:false
        })
      }else{
        that.courseFullDiscount()
      }
     
    })
  },
  coach_course: function () { //私课详情

    var that = this;
    var val = {
      schduleDate: that.data.scheduleDate
    }

    $.Requests(api.coach_course.url + '/' + that.data.tk_id, val).then((res) => {


  console.log("私课",res)
      if (that.data.vip == 1) {
        that.setData({
          tkgymdetails: res.data,
          gymName: res.data.gym.gymName,
          areaId: res.data.areaId,
          price: res.data.price*0.9*that.data.buy_num,
          maxnum: res.data.maxNumb,
          minnum: res.data.mixNumb,
          shopprice: res.data.price,
          icon: res.data.course.icon,
          address: res.data.gym.address,
          goodsId: res.data.course.id,
          scheduleStart: res.data.coachSchedule.scheduleStart,
          jindu: res.data.appointmentNumb / res.data.course.contain
        })}
      if (that.data.vip == 2) {
        that.setData({
          tkgymdetails: res.data,
          gymName: res.data.gym.gymName,
          areaId: res.data.areaId,
          price: res.data.price*0.8*that.data.buy_num,
          maxnum: res.data.maxNumb,
          shopprice: res.data.price,
          minnum: res.data.mixNumb,
          icon: res.data.course.icon,
          address: res.data.gym.address,
          goodsId: res.data.course.id,
          scheduleStart: res.data.coachSchedule.scheduleStart,
          jindu: res.data.appointmentNumb / res.data.course.contain
        })
      }
      if (that.data.vip != 2 && that.data.vip != 1) {
        that.setData({
          tkgymdetails: res.data,
          gymName: res.data.gym.gymName,
          areaId: res.data.areaId,
          price: res.data.price*that.data.buy_num,
          maxnum: res.data.maxNumb,
          minnum: res.data.mixNumb,
          shopprice: res.data.price,
          icon: res.data.course.icon,
          address: res.data.gym.address,
          goodsId: res.data.course.id,
          scheduleStart: res.data.coachSchedule.scheduleStart,
          jindu: res.data.appointmentNumb / res.data.course.contain
        })
      }
      if (that.data.category == 2) {
        that.setData({
          price: 0,
          mjbox: false
        })
      } else {
        that.courseFullDiscount()
      }
   
    })
  },
  yuenum: function () {
    var that = this;
    var val = {
      memberId: that.data.memberId,
      gymId: that.data.gymId,
    }
    $.Requests(api.yuenum.url, val).then((res) => {


      that.setData({
        yuenum: res.data
      })

    })

  },
  couponlist: function () {
    var that = this;
    var val = {
      memberId: that.data.memberId,
      gymId: that.data.gymId,
    }
    $.Requests(apicou.couponlist.url, val).then((res) => {

    console.log("优惠券",res)
      that.setData({
        couponlenght: res.data.length
      })

    })
  },
  closebuynow: function () {
    this.setData({
      hidden: 1
    })
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

      appointmentDate: formatDate
    }

    $.Requests(api.gymdetails.url + '/' + that.data.id, val).then((res) => {


      let { price } = res.data
      that.setData({
        itemNo: res.data.fitness.itemNo,
        gymdetails: res.data,
        areaId: res.data.areaId,
        price: price,
        gymName: res.data.gym.gymName,
        shopid: res.data.id,
        address: res.data.gym.address,
        price: res.data.price

      })
      // if (that.data.couponid != "") {
      //   that.setData({
      //     price: 0
      //   })
      // }
      // this.setData({

      //   classifyClick: res.data.content

      // })
    })


  },
  choosecoupon: function () {
    this.setData({
      choose: true,
      hidden: 0
    })

  },
  choosecouponbtn: function () {
    if (this.data.choose) {
      this.setData({
        choose: false,

      })
    } else {
      this.setData({
        choose: true,

      })

    }


  },
  testSubmit: function (e) {




    var that = this;

    var vals = {
      formId: e.detail.formId
    }
    console.log("formId", e.detail.formId)
    $.Requests_json(api.addFromID.url + '/' + app.globalData.wxopenid, [vals]).then((res) => {

      console.log("formid", res)
      console.log("formid", vals)
      console.log("formid", app.globalData.wxopenid)

    })
    if (that.data.yuechoose) {

      if (that.data.optionstype == 2 && that.data.sta != 1) {

        var val = {
          areaId: that.data.tkareaId,
          couponEntityId: that.data.couponid || 0,
          gymId: that.data.gymId,
          memberId: that.data.memberId,
          memberMobile: that.data.mobile,
          memberName: that.data.memberName,
          orderGoods: [{
            numb: that.data.buy_num,
            goodsId: that.data.goodsId,
          }],
          payType: "xj",
          remark: ""
        }

        $.Requests_json(api.member_ordertk.url, val).then((res) => {

          console.log("团课预约", res)

          if (res.status == 0) {

            wx.navigateTo({
              
              url: `../succell/succell?memberCourseId=${res.data.memberCourseId}&orderNo=${res.data.orderNo}&optionstype=${that.data.optionstype}&tk_id=${that.data.tk_id}&price=${that.data.price * that.data.buy_num}&formatdates=${that.data.formatdates}&buy_num=${that.data.buy_num}`
            })
          }

        })


      } else if (that.data.optionstype == 2 && that.data.sta == 1) { //私教购买去预约跳转
        var that = this;


        var val = {
          areaId: that.data.areaId,
          couponEntityId: that.data.couponid || 0,
          gymId: that.data.gymId,
          gymName: that.data.gymName,
          memberId: that.data.memberId,
          memberMobile: that.data.mobile,
          memberName: that.data.memberName,
          orderGoods: [{
            numb: that.data.buy_num,
            goodsId: that.data.tk_id,
          }],
          payType: "xj",
          remark: "",
        }




        $.Requests_json(api.member_order.url, val).then((res) => {

          console.log("11", res)
          console.log("11", val)

          if (res.status == 0) {

            wx.navigateTo({
              url: '../succell/succell?id=' + that.data.id + "&memberCourseId=" + res.data.memberCourseId + "&orderNo=" + res.data.orderNo + "&price=" + that.data.price + "&address=" + that.data.address + "&gymName=" + that.data.gymName + "&icon=" + that.data.icon + "&sta=" + that.data.sta + `&scheduleDate=${that.data.scheduleDate}` + "&tk_id=" + that.data.tk_id + "&coachId=" + that.data.coachId,
            })
          }

        })



      } else if (that.data.shoptype == 3) {

        var val11 = {
          areaId: that.data.areaId,
          couponEntityId: that.data.couponid || 0,
          gymId: that.data.gymId,
          gymName: that.data.gymName,
          memberId: that.data.memberId,
          memberMobile: that.data.mobile,
          memberName: that.data.memberName,
          orderGoods: [{
            numb: that.data.numb,
            goodsId: that.data.goodsId,
          }],
          payType: "xj",
          remark: "",
        }
        $.Requests_json(api.shopbuy.url, val11).then((res) => {




          if (res.status == 0) {

            // var val = {
            //   formId: e.detail.formId
            // }
            // $.Requests_json(api.addFromID.url + '/' + that.data.openid, [val]).then((res) => {



            // })

            wx.navigateTo({
              url: '../succell/succell?id=' + that.data.id + "&memberCourseId=" + res.data.memberCourseId + "&orderNo=" + res.data.orderNo + "&price=" + that.data.price + "&address=" + that.data.address + "&gymName=" + that.data.gymName + "&icon=" + that.data.icon + "&sta=" + that.data.sta + "&shoptype=" + that.data.shoptype,
            })
          }

        })













      } else {//球类预约跳转成功页面跳转预约页面
        var val = {
          areaId: that.data.areaId,
          couponEntityId: that.data.couponid || 0,
          gymId: that.data.gymId,
          gymName: that.data.gymName,
          memberId: that.data.memberId,
          memberMobile: that.data.mobile,
          memberName: that.data.memberName,
          orderGoods: [{
            numb: that.data.numb,
            goodsId: that.data.shopid,
          }],
          payType: "xj",
          remark: "",
        }
        $.Requests_json(api.balancepay.url, val).then((res) => {
          console.log("场地服务", res)
          console.log("场地服务", val)
          if (res.data.success && that.data.itemNo != "SI-BALL") {//场地自助购买跳转

            wx.navigateTo({
              url: '../succell/succell?id=' + that.data.id + "&memberFitnessId=" + res.data.memberFitnessId + "&orderNo=" + res.data.orderNo + "&price=" + that.data.price + "&address=" + that.data.address + "&itemNo=" + that.data.itemNo,
            })
          } else if (res.data.success && that.data.itemNo == "SI-BALL") {//球类跳转

            wx.navigateTo({
              url: '../succell/succell?areaId=' + that.data.areaId + "&memberFitnessId=" + res.data.memberFitnessId + "&orderNo=" + res.data.orderNo + "&price=" + that.data.price + "&address=" + that.data.address + "&id=" + that.data.id,
              // url: '../ballappointment/ballappointment?areaId=' + that.data.areaId,
            })
          } else {
            $.alert("余额支付失败")
          }

        })
      }
    } else {
      $.alert("暂不支持！")
      return;
    }

  },
  yuechoose: function () {

    if (this.data.yuechoose) {
      this.setData({
        yuechoose: true
      })
    } else {
      this.setData({
        yuechoose: true,
        wxyuechoose: false
      })
    }

  },
  wxyuechoose: function () {

    if (this.data.wxyuechoose) {
      this.setData({
        wxyuechoose: true
      })
    } else {
      this.setData({
        wxyuechoose: true,
        yuechoose: false,
      })
    }

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