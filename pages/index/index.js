//index.js
// 引入SDK核心类
var app = getApp();
var CONFIG = require('../../config.js');
var selapi = require('../../api/selfdails.js');
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');

var qqmapsdk;
//获取应用实例
var util = require("../../utils/util.js")
var app = getApp()
var $ = require('../../utils/util.js');
var api = require('../../api/indexAPI.js');

var time = 0;
var touchDot = 0; //触摸时的原点
var interval = "";
var flag_hd = true;
Page({
  data: {
    zzlistpic: [],
    imgurl: CONFIG.config.imgUrl,
    imgalist: [],
    userInfo: {},
    sysW: null,
    datee: "",
    formatDate: "", //今日日期
    scrolltop: "",
    ishidden: false,
    heightt: "",
    name: "",
    shopindex: "",
    citylist: "",
    member_fitness: "",
    shoplist: "",
    mytime: "",
    zzlistlength: true,
    provincechoose: "",
    scrootop: "",
    swishop: "",
    gymName: "",
    ptitemlist: "",
    latitude: "",
    mobilephone: "",
    ptitemlistid: "",
    longitude: "",
    activeTab: '',
    timeclickif: 0,
    scheduleDate: "",
    day: "",
    zzlist: "",
    tk_schedulelist: "",
    gymId: "",
    balance: "",
    latitudenum: "",
    longitudenum: "",
    cityTab: -1,
    classifyClick: "",
    mobile: "",
    gymshoplist: "",
    memberId: "",
    nearshop: "",
    address: "",
    weekend: "",
    weekArr: "",
    vip: "",
    sk_schedulelist: "",
    hasUserInfo: false,
    countNum: 5,
    type: 1,
    hidden: false,
    province: "", //省
    city: "", //市
    timenum: false,
    tbodyHeight: "",
    // homeAds: true,
    tapindex: 1,
    categoryId: "",
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  queryDomHeight() {
    const DOM = wx.createSelectorQuery()

    DOM.select('#mjltest').boundingClientRect((e) => {

      let top = e.top
      this.setData({
        scrolltop: top
      })
    }).exec()
  },
  onLoad: function (options) {
    var that = this;

    var obj = {
      gymId: 1,
      gymName: 'X - PARK'
    }
    wx.setStorage({
      key: 'gymId',
      data: obj,
    })
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        that.setData({
          hidden: false,
          balance: res.data.cash + res.data.give,
          memberId: res.data.memberId
        })

      },
      fail: function (res) {
        that.setData({
          hidden: true
        })

      },
    })

    that.xparkshop()
    // that.getLocal(that.data.latitude, that.data.longitude);
    wx.getLocation({ //开机立即获取地理位置
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度
      success: function (res) {

        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
   
        // that.imageLoad();
        // that.queryMultipleNodes(); //获取id的高度需要在第一时间执行

        wx.getStorage({
          key: 'gymId',
          success: function (res) {

          },
          fail: function () {
            // that.getLocal(that.data.latitude, that.data.longitude);
          }
        })


      },
      fail: function (res) {

        // that.imageLoad();
        // that.queryMultipleNodes();
      }

    })

    that.classification();
    // that.fitnesslist(); //自助健身子分类查询
    // that.ptitemlist(); //配套服务
    // that.league_schedulelist(); //课程服务团课服务查询列表
    // that.hwleague_schedulelist(); //课程服务团课服务查询列表
    // that.jkleague_schedulelist(); //课程服务团课服务查询列表
    // that.coach_schedulelist(); //课程服务私课服务查询列表
    that.member();
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
    var day = now.getDate();
    var formatDate = year + '-' + month + '-' + day;



    var day = now.getDate();

    var weekend = '日一二三四五六'.charAt(new Date().getDay());

    this.setData({
      day: day,
      weekend: weekend,

    })

    let time = util.formatDate(new Date());

    let date = util.getDates(7, time);


    this.setData({
      datee: date
    })


    var res = wx.getSystemInfoSync();


    this.setData({
      sysW: res.windowHeight / 12, //更具屏幕宽度变化自动设置宽度

    })
    // wx.hideTabBar();
    var that = this;


    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.getSystemInfo({
      success: function (res) {
        var h = 750 * res.windowHeight / res.windowWidth


      }
    })
    app.GetUserInfo(function () {

    });
  },
  onShow: function () {
    var that = this;
    that.member()
  },
  // onHide:function(){
  //   wx.removeStorage({
  //     key: 'userinfo',
  //     success: function (res) {
  //       
  //     }
  //   })
  // },
  xparkshop: function () {
    var val = {}
    $.Requests(api.xparkshop.url + '/' + 1, val).then((res) => {

      this.setData({
        swishop: res.data,
        mobilephone: res.data.mobile,
        latitudenum: res.data.latitude,
        longitudenum: res.data.longitude
      })
    })
  },
  datails: function () {
    wx.navigateTo({
      url: '../interests/interests?vip=' + this.data.vip,
    })
  },
  choosename: function (e) {

    wx.clearStorage();
    var that = this;
    that.setData({
      nearshop: e.target.dataset.gymname,
      ishidden: false,
      address: e.target.dataset.address,
      gymId: e.target.dataset.gymid,
      hidden: true
    })
    var objlist = {
      gymId: e.target.dataset.gymid,
      gymName: e.target.dataset.gymname
    }
    wx.setStorage({
      key: 'gymId',
      data: objlist,
    })
    wx.reLaunch({
      url: '../land/land',
    })

    that.classification();
    that.league_schedulelist();
    that.coach_schedulelist();
    that.ptitemlist();
  },
  nearshop: function () {

    var that = this;
    var val = {
      province: that.data.province, //省
      city: that.data.city, //市
      latitude: that.data.latitude,
      longitude: that.data.longitude,

    }
    $.Requests_json(api.nearshop.url, val).then((res) => {


      if (res.status == 0 && res.data == null) {

        setTimeout(function () {
          that.setData({
            ishidden: true,

          })

          that.provincelist();
        }, 6000) //延迟时间 这里是1秒


      } else if (res.status == 0 && res.data != null) {
        that.setData({
          ishidden: false,
          nearshop: res.data.gymName,
          address: res.data.address,
          mobile: res.data.mobile,
          gymId: res.data.id,
        })
        var obj = {
          gymId: res.data.id,
          gymName: res.data.gymName
        }

        wx.setStorage({
          key: 'gymId',
          data: obj,
        })


      } else {


      }
    })
  },
  citychoose: function (e) {
    this.setData({
      city: e.target.dataset.city
    })
    var val = {
      province: this.data.provincechoose,
      city: e.target.dataset.city,
    }
    $.Requests_json(api.province_city.url, val).then((res) => {
      this.setData({
        gymshoplist: res.data,
        cityTab: e.target.dataset.index
      })

    })
  },
  provincelist: function () { //门店列表
    // var val = {
    //   province: this.data.province,
    //   city: this.data.city,

    // }
    // $.Requests_json(api.province_city.url, val).then((res) => {
    //   
    //   
    //   this.setData({
    //     shoplist: res.data
    //   })

    // })
    var val = {

    }
    $.Requests(api.province.url, val).then((res) => {
      this.setData({
        shoplist: res.data
      })
    })
  },
  provinceshow: function (e) {
    var that = this;
    that.setData({
      provincechoose: e.target.dataset.province,
      gymshoplist: '',
      cityTab: -1,
      activeTab: e.target.dataset.index
    })

    var val = {
      province: e.target.dataset.province
    }
    $.Requests(api.city.url, val).then((res) => {


      that.setData({
        citylist: res.data
      })



    })

  },
  classification: function () { //自助健身产品查询

    var that = this;
    var val = {
      gymId: 1,

    }
    // zzlist
    $.Requests(api.classification.url, val).then((res) => {
console.log("场地服务",res)

      if (res.data.content.length != 0) {
        var icon = res.data.content;
        var zzlistpic = [];
        for(let i in icon){
            let icons={}
          icons.icon=icon[i].fitness.icon
          zzlistpic.push(icons)
        }
        console.log(zzlistpic)
        console.log("zzlist11",that.data.zzlist)
        var ooo=[];
        ooo.list1 = res.data.content;
        ooo.list2 = zzlistpic;
        console.log(ooo)
        that.setData({
          zzlistlength: true,
          zzlist: ooo.list1,
        })
        console.log("zzlist", that.data.zzlist)
        // var zzlist = res.data.content;

        // zzlist.forEach(function(item, index, arrar) {
        //   arrar[index] = {

        //     icon: item.fitness.icon,
        //     shortDesc: item.fitness.shortDesc,
        //     fitnessName: item.fitnessName,
        //     price: item.price,
        //     zzprice: (item.price * 0.8).toFixed(2),
        //     zxprice: (item.price * 0.9).toFixed(2),
        //     areaId: item.areaId,
        //     id: item.id,
        //     itemNo: item.fitness.itemNo
        //   }
        //   that.setData({
        //     zzlist: zzlist
        //   })

        // })
      } else {
        that.setData({
          zzlistlength: false
        })
      }

      // that.setData({
      //   zzlist: res.data.content
      // })

    })



  },
  fitnesslist: function () { //自助健身子分类产品查询
    var val = {
      page: '11',
      size: '10',
      start: '1'
    }
    $.Requests(api.classification.url, val).then((res) => {



    })
  },
  ptitemlist: function () { //配套分类查询

    var that = this;
    wx.getStorage({
      key: 'gymId',
      success: function (res) {

        var val = {
          gymId: 1,
          itemNo: 'SI-GOODS'
        }
        $.Requests(api.ptitemlist.url, val).then((res) => {
          that.setData({
            ptitemlist: res.data,
            ptitemlistid: res.data[0].id
          })
          var val = {
            areaId: res.data[0].id
          }
          $.Requests(api.categorylist.url, val).then((res) => {
            //配套第一分类商品查询

            let data = res.data.content
            wx.getStorage({
              key: 'vip',
              success: function (res) {

                data.forEach((item, index) => {
                  if (item.goods.length > 0) {
                    item.goods.map(item => {
                      if (res.data == 1) {
                        item.VipPrice = (item.price * 0.9).toFixed(2)
                      } else {
                        item.VipPrice = (item.price * 0.8).toFixed(2)
                      }
                    })
                  }
                })
                that.setData({
                  classifyClick: data
                })


              },
              fail: function () {
                // fail

                that.setData({
                  classifyClick: data
                })
              },
              complete: function () {
                // complete
              }
            })

          })
        })
      }
    })


  },
  league_schedulelist: function () { //课程服务团课服务查询列表

    var that = this;
    var dateTime = new Date();
    var hourse = dateTime.getHours();
    var Minutes = dateTime.getMinutes().toString().length == 1 ? '0' + dateTime.getMinutes() : dateTime.getMinutes();
    var Seconds = dateTime.getSeconds().toString().length == 1 ? '0' + dateTime.getSeconds() : dateTime.getSeconds();
    var mytime = hourse + ':' + Minutes;





    that.setData({
      mytime: mytime
    })


    wx.getStorage({
      key: 'gymId',
      success: function (res) {

        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
        var day = now.getDate();
        var formatDate = year + '-' + month + '-' + day;
        var val = {
          courseType: 1,
          gymId: res.data.gymId,
          scheduleDate: formatDate
        }
        $.Requests(api.league_schedulelist.url, val).then((res) => {


          if (res.data.length != 0) {


            var tk_schedulelist = res.data;

            tk_schedulelist.forEach(function (item, index, arrar) {
              arrar[index] = {
                name: item.course.courseName,
                id: item.id,
                courseidd: item.course.id,
                icon: item.course.icon,
                price: item.price,
                endtime: item.endTime.substring(0, item.endTime.length - 3),
                startTime: item.startTime.substring(0, item.endTime.length - 3),
                buyEndTime: item.buyEndTime,
                zzprice: (item.price * 0.8).toFixed(2),
                zxprice: (item.price * 0.9).toFixed(2),
                appointmentNumb: item.appointmentNumb,
                contain: item.course.contain,
                scheduleDate: item.scheduleDate
              }
              let d = new Date()
              let ft1 = d.setHours(item.buyEndTime.split(":")[0], item.buyEndTime.split(":")[1])

              let ft2 = d.setHours(mytime.split(":")[0], mytime.split(":")[1])

              that.setData({
                tk_schedulelist: tk_schedulelist
              })

            })
          } else {
            that.setData({
              tk_schedulelist: ""
            })
          }

        })
      }
    })


  },
  hwleague_schedulelist: function () { //课程服务团课服务查询列表
    var that = this;
    var dateTime = new Date();
    var hourse = dateTime.getHours();
    var Minutes = dateTime.getMinutes();
    var Seconds = dateTime.getSeconds();
    var mytime = hourse + ':' + Minutes + ':' + Seconds;
    that.setData({
      mytime: mytime
    })
    wx.getStorage({
      key: 'gymId',
      success: function (res) {

        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
        var day = now.getDate();
        var formatDate = year + '-' + month + '-' + day;
        var val = {
          courseType: 2,
          gymId: res.data.gymId,
          scheduleDate: formatDate
        }
        $.Requests(api.league_schedulelist.url, val).then((res) => {



          if (res.data.length != 0) {


            var hw_schedulelist = res.data;

            hw_schedulelist.forEach(function (item, index, arrar) {
              arrar[index] = {
                name: item.course.courseName,
                id: item.id,
                courseidd: item.course.id,
                icon: item.course.icon,
                price: item.price,
                endtime: item.endTime.substring(0, item.endTime.length - 3),
                startTime: item.startTime.substring(0, item.endTime.length - 3),
                buyEndTime: item.buyEndTime,
                zzprice: (item.price * 0.8).toFixed(2),
                zxprice: (item.price * 0.9).toFixed(2),
                appointmentNumb: item.appointmentNumb,
                contain: item.course.contain,
                scheduleDate: item.scheduleDate
              }
              that.setData({
                hw_schedulelist: hw_schedulelist
              })

            })
          } else {
            that.setData({
              hw_schedulelist: ""
            })
          }

        })
      }
    })


  },
  jkleague_schedulelist: function () { //课程服务团课服务查询列表
    var that = this;
    var dateTime = new Date();
    var hourse = dateTime.getHours();
    var Minutes = dateTime.getMinutes().toString().length == 1 ? '0' + dateTime.getMinutes() : dateTime.getMinutes();
    var Seconds = dateTime.getSeconds().toString().length == 1 ? '0' + dateTime.getSeconds() : dateTime.getSeconds();
    var mytime = hourse + ':' + Minutes;
    that.setData({
      mytime: mytime
    })
    wx.getStorage({
      key: 'gymId',
      success: function (res) {

        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
        var day = now.getDate();
        var formatDate = year + '-' + month + '-' + day;
        var val = {
          courseType: 3,
          gymId: res.data.gymId,
          scheduleDate: formatDate
        }
        $.Requests(api.league_schedulelist.url, val).then((res) => {




          if (res.data.length != 0) {


            var jk_schedulelist = res.data;

            jk_schedulelist.forEach(function (item, index, arrar) {
              arrar[index] = {
                name: item.course.courseName,
                id: item.id,
                courseidd: item.course.id,
                endtime: item.endTime.substring(0, item.endTime.length - 3),
                startTime: item.startTime.substring(0, item.endTime.length - 3),
                icon: item.course.icon,
                price: item.price,
                buyEndTime: item.buyEndTime,
                zzprice: (item.price * 0.8).toFixed(2),
                zxprice: (item.price * 0.9).toFixed(2),
                appointmentNumb: item.appointmentNumb,
                contain: item.course.contain,
                scheduleDate: item.scheduleDate
              }
              that.setData({
                jk_schedulelist: jk_schedulelist
              })

            })
          } else {
            that.setData({
              jk_schedulelist: ""
            })
          }

        })
      }
    })


  },
  tk_schedulelist: function (e) { //点击课程服务团课服务查询列表
    var that = this;
    var now = new Date();
    var year = now.getFullYear();

    var month = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
    var formatDate = e.target.dataset.year + '-' + e.target.dataset.month + '-' + e.target.dataset.id;
    this.setData({
      scheduleDate: formatDate
    })
    var val = {
      courseType: 1,
      gymId: 1,
      scheduleDate: formatDate
    }
    $.Requests(api.league_schedulelist.url, val).then((res) => {


      if (res.data.length != 0) {


        var tk_schedulelist = res.data;

        tk_schedulelist.forEach(function (item, index, arrar) {
          arrar[index] = {
            name: item.course.courseName,
            id: item.id,
            courseidd: item.course.id,
            buyEndTime: item.buyEndTime,
            icon: item.course.icon,
            price: item.price,
            endtime: item.endTime.substring(0, item.endTime.length - 3),
            startTime: item.startTime.substring(0, item.endTime.length - 3),
            zzprice: (item.price * 0.8).toFixed(2),
            zxprice: (item.price * 0.9).toFixed(2),
            appointmentNumb: item.appointmentNumb,
            contain: item.course.contain,
            scheduleDate: item.scheduleDate
          }
          that.setData({
            tk_schedulelist: tk_schedulelist
          })

        })
      } else {
        that.setData({
          tk_schedulelist: ""
        })
      }
    })
  },
  hw_schedulelist: function (e) { //点击课程服务团课服务查询列表
    var that = this;
    var dateTime = new Date();
    var hourse = dateTime.getHours();
    var Minutes = dateTime.getMinutes().toString().length == 1 ? '0' + dateTime.getMinutes() : dateTime.getMinutes();
    var Seconds = dateTime.getSeconds().toString().length == 1 ? '0' + dateTime.getSeconds() : dateTime.getSeconds();
    var mytime = hourse + ':' + Minutes;
    that.setData({
      mytime: mytime
    })
    var now = new Date();
    var year = now.getFullYear();

    var month = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
    var formatDate = e.target.dataset.year + '-' + e.target.dataset.month + '-' + e.target.dataset.id;
    this.setData({
      scheduleDate: formatDate
    })
    var val = {
      courseType: 2,
      gymId: 1,
      scheduleDate: formatDate
    }
    $.Requests(api.league_schedulelist.url, val).then((res) => {


      if (res.data.length != 0) {


        var hw_schedulelist = res.data;

        hw_schedulelist.forEach(function (item, index, arrar) {
          arrar[index] = {
            name: item.course.courseName,
            id: item.id,
            courseidd: item.course.id,
            icon: item.course.icon,
            price: item.price,
            endtime: item.endTime.substring(0, item.endTime.length - 3),
            startTime: item.startTime.substring(0, item.endTime.length - 3),
            buyEndTime: item.buyEndTime,
            zzprice: (item.price * 0.8).toFixed(2),
            zxprice: (item.price * 0.9).toFixed(2),
            appointmentNumb: item.appointmentNumb,
            contain: item.course.contain,
            scheduleDate: item.scheduleDate
          }
          that.setData({
            hw_schedulelist: hw_schedulelist
          })

        })
      } else {
        that.setData({
          hw_schedulelist: ""
        })
      }
    })
  },
  jk_schedulelist: function (e) { //点击课程服务团课服务查询列表
    var that = this;
    var dateTime = new Date();
    var hourse = dateTime.getHours();
    var Minutes = dateTime.getMinutes().toString().length == 1 ? '0' + dateTime.getMinutes() : dateTime.getMinutes();
    var Seconds = dateTime.getSeconds().toString().length == 1 ? '0' + dateTime.getSeconds() : dateTime.getSeconds();
    var mytime = hourse + ':' + Minutes;
    that.setData({
      mytime: mytime
    })
    var now = new Date();
    var year = now.getFullYear();

    var month = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
    var formatDate = e.target.dataset.year + '-' + e.target.dataset.month + '-' + e.target.dataset.id;
    this.setData({
      scheduleDate: formatDate
    })
    var val = {
      courseType: 3,
      gymId: 1,
      scheduleDate: formatDate
    }
    $.Requests(api.league_schedulelist.url, val).then((res) => {


      if (res.data.length != 0) {


        var jk_schedulelist = res.data;

        jk_schedulelist.forEach(function (item, index, arrar) {
          arrar[index] = {
            name: item.course.courseName,
            id: item.id,
            courseidd: item.course.id,
            buyEndTime: item.buyEndTime,
            icon: item.course.icon,
            endtime: item.endTime.substring(0, item.endTime.length - 3),
            startTime: item.startTime.substring(0, item.endTime.length - 3),
            price: item.price,
            zzprice: (item.price * 0.8).toFixed(2),
            zxprice: (item.price * 0.9).toFixed(2),
            appointmentNumb: item.appointmentNumb,
            contain: item.course.contain,
            scheduleDate: item.scheduleDate
          }
          that.setData({
            jk_schedulelist: jk_schedulelist
          })

        })
      } else {
        that.setData({
          jk_schedulelist: ""
        })
      }
    })
  },
  coach_schedulelist: function () { //课程服务私课服务查询列表val

    var that = this;
    wx.getStorage({
      key: 'gymId',
      success: function (res) {

        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
        var day = now.getDate() < 10 ? "0" + (now.getDate()) : now.getDate();
        var formatDate = year + '-' + month + '-' + day;
        that.setData({
          scheduleDate: formatDate
        })
        var val = {
          gymId: res.data.gymId,
          scheduleDate: formatDate
        }
        $.Requests(api.coach_schedulelist.url, val).then((res) => {


          that.setData({
            sk_schedulelist: res.data
          })
          // if (res.data.length != 0) {


          //   var sk_schedulelist = res.data;

          //   sk_schedulelist.forEach(function(item, index, arrar) {

          //     arrar[index] = {
          //       courseName: item.coachCourses[0].course.courseName,
          //       id: item.coachCourses[0].id,
          //       courseId: item.coachCourses[0].course.id,
          //       shortDesc: item.coachCourses[0].course.shortDesc,
          //       icon: item.coachCourses[0].course.icon,
          //       price: item.coachCourses[0].price,
          //       zzprice: (item.coachCourses[0].price * 0.8).toFixed(2),
          //       zxprice: (item.coachCourses[0].price * 0.9).toFixed(2),
          //       // appointmentNumb: item.coachCourses.appointmentNumb,
          //       contain: item.coachCourses[0].course.contain,
          //       // scheduleDate: item.coachCourses.scheduleDate
          //     }
          //     that.setData({
          //       sk_schedulelist: sk_schedulelist
          //     })

          //   })
          // } else {
          //   that.setData({
          //     sk_schedulelist: ""
          //   })

          // }
        })
      }
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
            wx.setStorage({
              key: 'vip',
              data: that.data.vip,
            })
          }

        })

      },

    })

  },
  sk_schedulelist: function (e) { //点击sk
    var that = this;
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
    var day = now.getDate();
    var formatDate = year + '-' + month + '-' + e.target.dataset.id;

    var val = {
      gymId: 1,
      scheduleDate: formatDate
    }
    $.Requests(api.coach_schedulelist.url, val).then((res) => {
      that.setData({
        sk_schedulelist: res.data
      })
    })
  },
  timeclick: function (e) {

    var that = this;
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
    var day = now.getDate() < 10 ? "0" + (now.getDate()) : now.getDate();
    var formatDate = year + '-' + month + '-' + day;
    var clicktime = e.target.dataset.year + '-' + e.target.dataset.month + '-' + e.target.dataset.id;
    // var type = "true";
    var start_time = formatDate.replace(/-|\s|:|\//g, '');

    var end_time = clicktime.replace(/-|\s|:|\//g, '');

    if (start_time < end_time) {

      that.setData({
        timeclickif: 1,
        day: e.currentTarget.dataset.id,
        weekend: e.currentTarget.dataset.week,
        datee: that.data.datee,

      })

    } else {


      that.setData({
        timeclickif: 2,
        day: e.currentTarget.dataset.id,
        weekend: e.currentTarget.dataset.week,
        datee: that.data.datee,

      })
    }
    that.tk_schedulelist(e);
    that.sk_schedulelist(e);
    that.hw_schedulelist(e);
    that.jk_schedulelist(e);
  },
  onPageScroll: function (e) { //上滑监听

    // 
    // this.setData({
    //   scrolltop: e.scrollTop
    // })
    if (e.scrollTop < this.data.scrolltop) {
      this.setData({
        shouldFixedTop: false,
        // scrootop: 2
      });
    } else {
      this.setData({
        shouldFixedTop: true,
        // scrootop: 1
      });
    }
  },
  choose: function () {
    this.setData({
      ishidden: true
    })
  },
  textblock: function () {
    this.setData({
      ishidden: false
    })
  },
  tkselfdetails: function (e) {
    var that = this;


    wx.navigateTo({
      url: '../selfdetails/selfdetails?coachCourseId=' + e.target.dataset.coachcourseid + "&type=" + e.target.dataset.type + "&id=" + e.target.dataset.id + "&sta=" + e.target.dataset.sta + "&scheduledate=" + e.target.dataset.scheduledate + "&timeshow=" + e.target.dataset.timeshow + "&timechoose=" + e.target.dataset.timechoose + "&courseid=" + e.target.dataset.courseid
    })
  },
  tkselfdetailstwo: function (e) {

    var that = this;


    wx.navigateTo({
      url: '../selfdetails/selfdetails?coachCourseId=' + e.currentTarget.dataset.coachcourseid + "&type=" + e.currentTarget.dataset.type + "&id=" + e.currentTarget.dataset.id + "&sta=" + e.currentTarget.dataset.sta + "&scheduledate=" + e.currentTarget.dataset.scheduledate + "&timeshow=" + e.currentTarget.dataset.timeshow + "&timechoose=" + e.currentTarget.dataset.timechoose + "&courseid=" + e.currentTarget.dataset.courseid
    })
  },
  skselfdetails: function (e) {
    var that = this;

    wx.navigateTo({
      url: '../selfdetails/selfdetails?coachCourseId=' + e.currentTarget.dataset.coachcourseid + "&type=" + e.currentTarget.dataset.type + "&id=" + e.currentTarget.dataset.id + "&sta=" + e.currentTarget.dataset.sta + "&scheduledate=" + e.currentTarget.dataset.scheduledate + "&courseid=" + e.currentTarget.dataset.courseid + "&timechoose=" + e.currentTarget.dataset.timechoose
    })
  },
  // 
  selfdetails: function (e) {


    if (e.currentTarget.dataset.type == 3) {
      wx.navigateTo({

        url: '../shopdetails/shopdetails?id=' + e.target.dataset.id + "&type=" + e.target.dataset.type,
      })
    }
    if (e.currentTarget.dataset.type == 1) {
      wx.navigateTo({

        url: '../selfdetails/selfdetails?id=' + e.target.dataset.id + "&type=" + e.target.dataset.type + "&areaid=" + e.target.dataset.areaid + "&itemno=" + e.target.dataset.itemno + "&fittype=" + e.target.dataset.fittype,
      })
    }

  },
  selfdetailss: function (e) {

    if (e.currentTarget.dataset.type == 3) {
      wx.navigateTo({

        url: '../shopdetails/shopdetails?id=' + e.currentTarget.dataset.id + "&type=" + e.currentTarget.dataset.type,
      })
    }
    if (e.currentTarget.dataset.type == 1) {
      wx.navigateTo({

        url: '../selfdetails/selfdetails?id=' + e.target.dataset.id + "&type=" + e.target.dataset.type,
      })
    }

  },
  btnselfdetails: function (e) {


    wx.navigateTo({
      url: '../selfdetails/selfdetails?areaid=' + e.currentTarget.dataset.areaid + "&type=" + e.currentTarget.dataset.type + "&itemNo=" + e.currentTarget.dataset.itemno + "&id=" + e.currentTarget.dataset.id + "&coachCourseId=" + e.currentTarget.dataset.coachCourseId + "&fittype=" + e.currentTarget.dataset.fittype,
    })
  },
  previewImage: function (e) { //画廊

    wx.previewImage({
      urls: this.data.imgalist // 需要预览的图片http链接列表
    })
  },
  onReady: function () {

    var tbodyHeight = app.globalData.windowHeight - 90; //90为头部固定高度 
    this.setData({
      tbodyHeight: tbodyHeight.toFixed(0)
    })
    this.queryDomHeight()

  },
  mapNavigationlogo: function (e) {

    var addr = e.currentTarget.dataset.addr;
    var name = e.currentTarget.dataset.name;
    var key = 'XPMBZ-J6ERW-EI4RO-OURT3-7JK5E-WFFZI';
    var that = this;
    qqmapsdk = new QQMapWX({
      key: key // 必填
    });
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {


        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })

        wx.openLocation({
          latitude: that.data.latitudenum,
          longitude: that.data.longitudenum,
          scale: 18, //缩放比例范围5~18
          name: name, //打开后显示的地址名称
          address: addr
        })
      },
    })
  },
  mapNavigation: function (e) {
    var addr = e.currentTarget.dataset.addr;
    var name = e.currentTarget.dataset.name;
    var key = 'VAKBZ-RO6RU-G3CV6-BCR6Z-LJEY3-R4BTJ';
    var that = this;
    qqmapsdk = new QQMapWX({
      key: key // 必填
    });
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {


        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })

        wx.openLocation({
          latitude: that.data.latitudenum,
          longitude: that.data.longitudenum,
          scale: 18, //缩放比例范围5~18
          name: name, //打开后显示的地址名称
          address: addr
        })
      },
    })
  },
  getUserInfo: function (e) {

    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  imageLoad: function (e) { //首屏广告图片加载成功做处理
    var that = this;
    var time = setInterval(function () { //进行倒计时
      if (that.data.countNum > 0) {
        that.setData({
          countNum: that.data.countNum - 1
        });
      } else {
        clearInterval(time);
        // that.setData({
        //   homeAds: null
        // });
        wx.showTabBar();
      }
    }, 1000);
  },
  closeloding: function () {
    var that = this;
    that.setData({
      homeAds: null
    })
    wx.showTabBar();
  },
  goHomeAds: function (e) { //开机login
    var that = this;
    this.setData({
      homeAds: null
    });
    wx.showTabBar();
  },

  homeAdsError: function (e) { //首页广告图片加载出错
    wx.showTabBar();
    that.setData({
      homeAds: null,
      countNum: 0 //用来倒计时
    });
  },
  call: function (e) {

    var vals = {
      formId: e.detail.formId
    }
    $.Requests_json(selapi.addFromID.url + '/' + app.globalData.wxopenid, [vals]).then((res) => {})
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone,
    })
  },
  allOrders: function (e) { //自助健身产地服务切换

    var vals = {
      formId: e.detail.formId
    }
    $.Requests_json(selapi.addFromID.url + '/' + app.globalData.wxopenid, [vals]).then((res) => {





    })
    this.setData({
      tapindex: 1,
      type: 1
    });
    this.classification();
  },
  toBePaid: function (e) { //课程服务
    var vals = {
      formId: e.detail.formId
    }
    $.Requests_json(selapi.addFromID.url + '/' + app.globalData.wxopenid, [vals]).then((res) => {





    })
    var now = new Date();
    var day = now.getDate();
    var weekend = '日一二三四五六'.charAt(new Date().getDay());
    this.setData({
      tapindex: 2,
      day: day,
      weekend: weekend,
      timeclickif: 2,
      type: 2
    });
    this.league_schedulelist(); //课程服务团课服务查询列表
    this.hwleague_schedulelist(); //课程服务团课服务查询列表
    this.jkleague_schedulelist(); //课程服务团课服务查询列表
    this.coach_schedulelist(); //课程服务私课服务查询列表
  },
  receiptOfGoods: function (e) { //商店服务

    var vals = {
      formId: e.detail.formId
    }
    $.Requests_json(selapi.addFromID.url + '/' + app.globalData.wxopenid, [vals])
    this.setData({
      tapindex: 3,
      type: 3,
      shopindex:0
    });
    this.ptitemlist()
  },

  classifyClick: function (e) { //配套服务子分类产品查询
    let index = e.target.dataset.index

    this.setData({
      shopindex: index
    })
    var that = this;
    var val = {
      areaId: e.target.dataset.id
    }
    $.Requests(api.categorylist.url, val).then((res) => {

      let data = res.data.content
      wx.getStorage({
        key: 'vip',
        success: function (res) {
          data.forEach((item, index) => {
            if (item.goods.length > 0) {
              item.goods.map(item => {
                if (res.data == 1) {
                  item.VipPrice = (item.price * 0.9).toFixed(2)
                } else {
                  item.VipPrice = (item.price * 0.8).toFixed(2)
                }
              })
            }
          })
          that.setData({
            classifyClick: data
          })
        },
        fail: function () {
          // fail
          that.setData({
            classifyClick: data
          })
        },
        complete: function () {
          // complete
        }
      })
    })


  },
  ruchan: function () {
    wx.navigateTo({
      url: '../approach/approach'
    })
  },
  Approach: function (e) { //扫码入场

    var vals = {
      formId: e.detail.formId
    }
    $.Requests_json(selapi.addFromID.url + '/' + app.globalData.wxopenid, [vals]).then((res) => {





    })
    wx.navigateTo({
      url: '../approach/approach'
    })
  },
  //下拉刷新
  onPullDownRefresh: function () {
    var that = this;
    var weekend = '日一二三四五六'.charAt(new Date().getDay());
    wx.showNavigationBarLoading() //在标题栏中显示加载

    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      that.league_schedulelist();
      that.coach_schedulelist();
      that.ptitemlist();
      that.classification();
      that.hwleague_schedulelist(); //课程服务团课服务查询列表
      that.jkleague_schedulelist(); //课程服务团课服务查询列表
      that.member();
      var now = new Date();
      var day = now.getDate();
      that.setData({
        shopindex: 0,
        day: day,
        weekend: weekend,
        timeclickif: 2
      })

      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },
  login: function () { //登陆页面
    wx.reLaunch({
      url: '../land/land',
    })
  },
})