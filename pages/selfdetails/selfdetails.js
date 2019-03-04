// pages/selfdetails/selfdetails.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js')
var $ = require('../../utils/util.js');
var apiindex = require('../../api/indexAPI.js');
var CONFIG = require('../../config.js');
var api = require('../../api/selfdails.js');
var apicou = require('../../api/coupon.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: CONFIG.config.imgUrl,
    choose: false,
    couponlist: '',
    xqgymName: '',
    xqaddress: '',
    jlintroduce: '',
    xqlatitudenum: '',
    gymshopid: '',
    xqlongitudenum: '',
    category: '',
    hidden: 2,
    icon: [],
    lenaueid: '',
    timechoose: '',
    sta: '',
    leagueif: false,
    checkcoach: 0,
    jlicon: '',
    coachId: '',
    orderNo: '',
    sikeprice: '',
    qlid: '',
    jindu: 0,
    vip: '',
    chooseindex: -1,
    couponlength: "",
    itemNo: "",
    shopdetails: '',
    scheduleDate: '',
    optionstype: '',
    tkgymdetails: '',
    tk_id: '',
    coachCourseId: '',
    gymId: '',
    shoptype: '',
    showMethod: "", //详情展现方式
    appointment: false, //预约
    areaId: "",
    id: "",
    courseid: "",
    conmoney: "",
    timeshow: "",
    formatDates: "",
    couponid: "",
    pdcourseid: "",
    coachId: "",
    memberFitnessId: "",
    shopid: "",
    memberCourseId: "",
    gymdetails: "",
    itemno: "",
    formatDate: "",
    memberId: "",
  },
  buynow: function () {
    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        that.setData({
          memberId: res.data.memberId,
          hidden: 0
        })
      },
      fail: function (res) {

        setTimeout(function () {

          wx.reLaunch({
            url: '../land/land',
          })

        }, 100)
        return false;
      }
    })

  },
  datails: function () {
    wx.navigateTo({
      url: '../interests/interests?vip=' + this.data.vip,
    })
  },
  closebuynow: function () {
    this.setData({
      hidden: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    that.member();
    that.xparkshop();
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
    var day = now.getDate() < 10 ? "0" + (now.getDate()) : now.getDate();
    var formatDate = year + '-' + month + '-' + day;

    that.setData({
      formatDate: formatDate,
      timechoose: options.timechoose || '',
      coachCourseId: options.coachCourseId || '',
      tk_id: options.id || '',
      shopid: options.id || '',
      gymshopid: options.id || '',
      courseid: options.courseid || '',
      optionstype: options.type || '',
      timeshow: options.timeshow || '',
      sta: options.sta || '',
      shoptype: options.type || '',
      scheduleDate: options.scheduledate || ''
    })
    var formatDates = options.timechoose;
    if (options.type == 1) {
      that.setData({
        showMethod: 1
      })
    } else if (options.type == 2) {
      that.setData({
        showMethod: 2,
        formatDates: formatDates,
      })
    } else {
      that.setData({
        showMethod: 3
      })
    }
    // wx.getStorage({
    //   key: 'userinfo',
    //   success: function (res) {



    that.setData({
      areaId: options.areaid || '',
      itemno: options.itemNo || '',
      id: options.id || '',
      // memberId: res.data.memberId
    })
    wx.getStorage({
      key: 'gymId',
      success: function (res) {
        that.setData({
          gymId: res.data.gymId
        })
        that.couponlist();
      }
    })
    if (options.type == 1 && options.itemNo != "SI-FIT") {

      that.shoptedails(options);
      that.gymdetails()
    } else if (options.type == 1 && options.itemNo == "SI-FIT") {
      that.gymdetails()
    } else if (options.type == 2 && options.sta != 1) {

      that.league_schedule();
    } else if (options.sta == 1 && options.type == 2) {
      that.coach_course();

    } else if (options.type == 3) {
      that.shopdetails()
    }

  },
  // fail: function (res) {
  //   $.alert("请先登录")
  //   setTimeout(function () {

  //     wx.navigateTo({
  //       url: '../land/land',
  //     })

  //   }, 2000) //延迟时间 这里是1秒

  // },
  //  })


  // },
  checkcoach: function () {
    var that = this;
    var val = {
      appointmentDate: that.data.scheduleDate,
      coachId: that.data.coachId,
      courseId: that.data.courseid,
    }
    $.Requests(api.checkcoach.url, val).then((res) => {

      that.setData({
        checkcoach: res.status
      })
    })
  },
  shopdetails: function () {
    var that = this;
    var val = {}
    $.Requests(api.shopdetails.url + '/' + that.data.shopid, val).then((res) => {

      that.setData({
        shopdetails: res.data
      })



    })
  },
  xparkshop: function () {
    var val = {}
    $.Requests(apiindex.xparkshop.url + '/' + 1, val).then((res) => {

      this.setData({
        xqgymName: res.data.gymName,
        xqaddress: res.data.address,
        xqlatitudenum: res.data.latitude,
        xqlongitudenum: res.data.longitude
      })
    })
  },
  couponlist: function () {

    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {

        if (that.data.optionstype == 1) {
          var val = {
            couponType: 'f',
            goodsId: that.data.gymshopid,
            memberId: res.data.memberId,
            gymId: that.data.gymId,
          }
        } else if (that.data.optionstype == 2) {
          var val = {
            couponType: 'c',
            goodsId: that.data.tk_id,
            memberId: res.data.memberId,
            gymId: that.data.gymId,
          }
        }

        $.Requests(apicou.coupon_entity.url, val).then((res) => {

          res.data.map(item => {
            item.endTime = item.endTime.substring(0, item.endTime.length - 10)
            return item;
          })
          that.setData({
            couponlength: res.data.length,
            couponlist: res.data,
            // endtime: res.data.endTime.substring(0, res.data.endTime.length - 10),

          })


        })





      },

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


          if (res.data == '' || res.data == null) {


          } else {
            that.setData({
              vip: res.data[0].vip
            })
          }

        })

      },

    })

  },
  coach_course: function () { //私课详情
    var that = this;
    var val = {
      schduleDate: that.data.scheduleDate,
    }
    $.Requests(api.coach_course.url + '/' + that.data.tk_id, val).then((res) => {

      that.setData({
        tkgymdetails: res.data,
        sikeprice: res.data.price,
        jindu: res.data.appointmentNumb / res.data.course.contain,
        coachId: res.data.coachId,
        icon: res.data.icon,
        useNotes: res.data.course.useNotes,


      })
      that.checkcoach();

      that.tkshoptedails();
    })

  },
  checkleague: function () {
    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {

        var val = {
          memberId: res.data.memberId,
          id: that.data.lenaueid
        }

        $.Requests(api.checkleague.url, val).then((res) => {



          if (res.data) {
            that.setData({
              leagueif: true
            })

          } else {
            that.setData({
              leagueif: false
            })
          }

        })


      }
    })

  },
  league_schedule: function () {
    var that = this;
    var val = {}

    $.Requests(api.league_schedule.url + '/' + that.data.tk_id, val).then((res) => {


      let {
        outdoorAddress,
        outdoorName,
        latitude,
        longitude,
        courseName,
        gymName,
        address,
        price,
        coachId,
        appointmentNumb,
        id
      } = res.data;
      let {
        coachName
      } = res.data.coach;
      let {
        introduce,
        useNotes,
        contain,
        buyNotes,
        icon
      } = res.data.course;
      let {
        courseGalleries,

      } = res.data;


      that.setData({
        jlintroduce: res.data.introduce,
        courseName: courseName,
        appointmentNumb: appointmentNumb,
        gymName: gymName,
        pdcourseid: res.data.course.id,
        buyNotes: buyNotes,
        address: address,
        outdoorName: outdoorName,
        latitude: latitude,
        longitude: longitude,
        price: price,
        outdoorAddress: outdoorAddress,
        coachId: coachId,
        appointmentNumb: appointmentNumb,
        id: id,
        lenaueid: res.data.id,
        contain: contain,
        coachName: coachName,
        icon: courseGalleries,
        introduce: introduce,
        useNotes: useNotes,
        jlicon: res.data.coachIcon

      })
      that.tkshoptedails()
      that.checkleague();
    })

  },
  next_self: function (e) {

    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        that.setData({
          memberId: res.data.memberId
        })
      },
      fail: function (res) {

        setTimeout(function () {

          wx.reLaunch({
            url: '../land/land',
          })

        }, 100)
        //延迟时间 这里是1秒
        return false;
      }

    })




    if (that.data.optionstype == 2) {

      wx.navigateTo({
        url: '../tkconfirmationbuy/tkconfirmationbuy?tk_id=' + that.data.tk_id + "&optionstype=" + that.data.optionstype + "&sta=" + that.data.sta + "&scheduleDate=" + that.data.scheduleDate + "&coachId=" + that.data.coachId + "&formatdates=" + that.data.formatDates + "&conmoney=" + that.data.conmoney + "&couponid=" + that.data.couponid + "&category=" + that.data.category + "&coachCourseId=" + this.data.coachCourseId,
      })
    } else {
      wx.navigateTo({
        url: '../confirmationbuy/confirmationbuy?id=' + e.target.dataset.id + "&type=" + that.data.shoptype + "&couponid=" + that.data.couponid + "&itemno=" + that.data.itemno + "&category=" + that.data.category + "&conmoney=" + that.data.conmoney + "&coachcourseid=" + that.data.coachCourseId,
      })
    }

  },
  mapNavigation: function (e) {

    var addr = e.currentTarget.dataset.address;
    var name = e.currentTarget.dataset.name;
    var latitude = e.currentTarget.dataset.latitude;
    var longitude = e.currentTarget.dataset.longitude;
    var key = 'VAKBZ-RO6RU-G3CV6-BCR6Z-LJEY3-R4BTJ';
    var that = this;
    qqmapsdk = new QQMapWX({
      key: key // 必填
    });
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 18, //缩放比例范围5~18
          name: name, //打开后显示的地址名称
          address: addr
        })
      },
    })
  },
  tkshoptedails: function (options) { //团课或者私教判断是否能购买


    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        if (that.data.sta != 1) {
          var val = {
            coachId: that.data.coachId,
            courseId: that.data.pdcourseid,
            courseType: '2',
            gymId: that.data.gymId,
            memberId: res.data.memberId,
          }

        } else {
          var val = {
            coachId: that.data.coachId,
            courseId: that.data.courseid,
            courseType: '1',
            gymId: that.data.gymId,
            memberId: res.data.memberId,
          }
        }

        $.Requests(api.member_course.url, val).then((res) => {



          if (res.data != '') {
            that.setData({
              appointment: true,
              coachId: res.data[0].coachId,
              orderNo: res.data[0].orderNo,
              memberCourseId: res.data[0].id,

            })
          } else {
            that.setData({
              appointment: false
            })
          }
          // this.setData({

          //   classifyClick: res.data.content

          // })
        })
      }
    })


  },
  shoptedails: function (options) {


    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {

        var val = {
          areaId: that.data.areaId,
          memberId: res.data.memberId,
        }
        $.Requests(api.member_fitness.url, val).then((res) => {


          if (res.data != '') {
            that.setData({
              appointment: true,
              memberFitnessId: res.data[0].id,
              orderNo: res.data[0].orderNo,

            })
          } else {
            that.setData({
              appointment: false,

            })
          }
          // this.setData({

          //   classifyClick: res.data.content

          // })
        })
      }
    })


  },
  gymdetails: function () {
    var that = this;
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
    var day = now.getDate() < 10 ? "0" + (now.getDate()) : now.getDate();
    var formatDate = year + '-' + month + '-' + day;
    var val = {

      appointmentDate: formatDate
    }
    $.Requests(api.gymdetails.url + '/' + that.data.id, val).then((res) => {

      that.setData({
        gymdetails: res.data,
        jindu: res.data.appointmentNumb / res.data.fitness.contain,
        qlid: res.data.id,
        gymshopid: res.data.id,
        itemNo: res.data.fitness.itemNo,
        price: res.data.price,
        address: res.data.gym.address,
        areaId: res.data.areaId
      })
      // this.setData({

      //   classifyClick: res.data.content

      // })
    })


  },
  appointment: function () {

    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        that.setData({
          memberId: res.data.memberId,

        })
      },
      fail: function (res) {

        setTimeout(function () {

          wx.reLaunch({
            url: '../land/land',
          })

        }, 100)
        return false;
      }
    })

    if (that.data.optionstype == 1) { //球类已购买 去预约页面预约
      wx.navigateTo({

        url: '../appointmenttime/appointmenttime?id=' + that.data.qlid + "&orderNo=" + that.data.orderNo + "&address=" + that.data.address + "&price=" + that.data.price + "&areaId=" + that.data.areaId + "&memberFitnessId=" + that.data.memberFitnessId + "&shopname=" + that.data.gymdetails.fitnessName,
      })
    } else if (that.data.optionstype == 2 && that.data.sta == 1) {

      wx.navigateTo({
        url: '../coachappointmentTimeList/coachappointmentTimeList?scheduleDate=' + that.data.scheduleDate + "&orderNo=" + that.data.orderNo + "&coachId=" + that.data.coachId + "&memberCourseId=" + that.data.memberCourseId + "&ifsj=" + 1 + "&coachcourseid=" + that.data.coachCourseId + "&price=" + that.data.sikeprice,
      })

    } else if (that.data.optionstype == 2 && that.data.sta != 1) {
      wx.navigateTo({
        url: '../tkconorder/tkconorder?scheduleDate=' + that.data.formatDate + "&orderNo=" + that.data.orderNo + "&coachId=" + that.data.coachId + "&memberCourseId=" + that.data.memberCourseId + "&coachcourseid=" + that.data.coachCourseId + "&optionstype=" + that.data.optionstype + "&formatdates=" + that.data.formatDates,
      })
    }



  },
  choosecoupon: function (e) {

    if (this.data.choose) {
      this.setData({
        chooseindex: e.currentTarget.dataset.index,
        couponid: e.currentTarget.dataset.id,
        conmoney: e.currentTarget.dataset.conmoney,
        category: e.currentTarget.dataset.category
      })
    } else {
      this.setData({
        choose: true
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
    this.tkshoptedails()
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
  onShareAppMessage: function (res) {


    return {


      title: res.target.dataset.name,

      path: 'pages/selfdetails/selfdetails?id=' + res.target.dataset.id + "&itemNo=" + res.target.dataset.itemno + "&type=" + res.target.dataset.type + "&sta=" + res.target.dataset.sta + "&coachCourseId=" + res.target.dataset.coachcourseid + "&timechoose=" + res.target.dataset.timechoose + "&timeshow=" + res.target.dataset.timeshow + "&courseid=" + res.target.dataset.courseid + "&scheduledate=" + res.target.dataset.scheduledate,
      //分享成功后执行

      success: function (res) {



      },

      fail: function (res) {



      }

    }
  }
})