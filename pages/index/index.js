//index.js
// 引入SDK核心类
var app = getApp();
var selapi = require('../../api/selfdails.js');
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js')
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
    imgalist: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496287851&di=0a26048f586b852193cb5026d60c4fad & imgtype=jpg & er=1 & src=http % 3A % 2F % 2Fpic.58pic.com % 2F58pic % 2F12 % 2F74 % 2F05 % 2F99C58PICYck.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495693185413&di=0d0acdebf0f532edd0fcdb76265623c5 & imgtype=0 & src=http % 3A % 2F % 2Fimg1.3lian.com % 2Fimg013 % 2Fv3 % 2F2 % 2Fd % 2F61.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495693185413&di=55835ae37fdc95a317b03f28162c0de1 & imgtype=0 & src=http % 3A % 2F % 2Fimg4.duitang.com % 2Fuploads % 2Fitem % 2F201307 % 2F12 % 2F20130712224237_nSjht.jpeg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495693185410&di=e28cc03d2ae84130eabc26bf0fc7495f & imgtype=0 & src=http % 3A % 2F % 2Fpic36.photophoto.cn % 2F20150814 % 2F0005018308986502_b.jpg'
    ],
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
    zzlistlength:true,
    provincechoose: "",
    scrootop: "",
    gymName: "",
    ptitemlist: "",
    latitude: "",
    mobilephone: "",
    ptitemlistid: "",
    longitude: "",
    activeTab: '',
    timeclickif:false,
    scheduleDate: "",
    day: "",
    zzlist: "",
    tk_schedulelist: "",
    gymId: "",
    balance: "",
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
               that.xparkshop()
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
 console.log("date",date)

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
  // onHide:function(){
  //   wx.removeStorage({
  //     key: 'userinfo',
  //     success: function (res) {
  //       
  //     }
  //   })
  // },
  xparkshop:function(){
    var val={}
    $.Requests(api.xparkshop.url+'/'+1, val).then((res) => {
      console.log("商店信息",res)
      this.setData({
        mobilephone: res.data.mobile
      })
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
    setTimeout(function () {

      $.alert("请先登录")

    }, 1000) //延迟时间 这里是1秒

    setTimeout(function () {

      wx.navigateTo({
        url: '../land/land',
      })

    }, 2000) //延迟时间 这里是1秒

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
console.log('球类',res)
      console.log('球类', val)
      
      if (res.data.content.length != 0) {
        that.setData({
          zzlistlength:true
        })
        var zzlist = res.data.content;

        zzlist.forEach(function (item, index, arrar) {
          arrar[index] = {

            icon: item.fitness.icon,
            fitnessName: item.fitnessName,
            price: item.price,
            zzprice: (item.price * 0.9).toFixed(2),
            zxprice: (item.price * 0.8).toFixed(2),
            areaId: item.areaId,
            id: item.id,
            itemNo: item.fitness.itemNo
          }
          that.setData({
            zzlist: zzlist
          })

        })
      }else{
        that.setData({
          zzlistlength:false
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
                      if (res.data === 1) {
                        item.VipPrice = (item.price * 0.8).toFixed(2)
                      } else {
                        item.VipPrice = (item.price * 0.9).toFixed(2)
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
    var Minutes = dateTime.getMinutes(); 
    var Seconds = dateTime.getSeconds(); 
    var mytime = hourse + ':' + Minutes + ':' + Seconds;
    that.setData({
      mytime: mytime
    })
    console.log("mytime",mytime)
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

   console.log("团课",res)
          if (res.data.length != 0) {


            var tk_schedulelist = res.data;

            tk_schedulelist.forEach(function (item, index, arrar) {
              arrar[index] = {
                name: item.course.courseName,
                id: item.course.id,
                icon: item.course.icon,
                price: item.price,
                buyEndTime: item.buyEndTime,
                zzprice: (item.price * 0.9).toFixed(2),
                zxprice: (item.price * 0.8).toFixed(2),
                appointmentNumb: item.appointmentNumb,
                contain: item.course.contain,
                scheduleDate: item.scheduleDate
              }
              let d = new Date()
              let ft1 = d.setHours(item.buyEndTime.split(":")[0], item.buyEndTime.split(":")[1])
              console.log("ft1",ft1)
              let ft2 = d.setHours(mytime.split(":")[0], mytime.split(":")[1])
              console.log("ft2", ft2)
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

     console.log("户外",res)

          if (res.data.length != 0) {


            var hw_schedulelist = res.data;

            hw_schedulelist.forEach(function (item, index, arrar) {
              arrar[index] = {
                name: item.course.courseName,
                id: item.id,
                icon: item.course.icon,
                price: item.price,
                buyEndTime: item.buyEndTime,
                zzprice: (item.price * 0.9).toFixed(2),
                zxprice: (item.price * 0.8).toFixed(2),
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

                icon: item.course.icon,
                price: item.price,
                buyEndTime: item.buyEndTime,
                zzprice: (item.price * 0.9).toFixed(2),
                zxprice: (item.price * 0.8).toFixed(2),
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
    var formatDate = year + '-' + month + '-' + e.target.dataset.id;
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
            id: item.course.id,
            buyEndTime: item.buyEndTime,
            icon: item.course.icon,
            price: item.price,
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
    var Minutes = dateTime.getMinutes();
    var Seconds = dateTime.getSeconds();
    var mytime = hourse + ':' + Minutes + ':' + Seconds;
    that.setData({
      mytime: mytime
    })
    var now = new Date();
    var year = now.getFullYear();

    var month = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
    var formatDate = year + '-' + month + '-' + e.target.dataset.id;
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
            icon: item.course.icon,
            price: item.price,
            buyEndTime: item.buyEndTime,
            zzprice: (item.price * 0.9).toFixed(2),
            zxprice: (item.price * 0.8).toFixed(2),
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
    var Minutes = dateTime.getMinutes();
    var Seconds = dateTime.getSeconds();
    var mytime = hourse + ':' + Minutes + ':' + Seconds;
    that.setData({
      mytime: mytime
    })
    var now = new Date();
    var year = now.getFullYear();

    var month = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
    var formatDate = year + '-' + month + '-' + e.target.dataset.id;
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
            buyEndTime: item.buyEndTime,
            icon: item.course.icon,
            price: item.price,
            zzprice: (item.price * 0.9).toFixed(2),
            zxprice: (item.price * 0.8).toFixed(2),
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
console.log("sike详情",res)
          console.log("sike详情", val)
          if (res.data.length != 0) {

          
            var sk_schedulelist = res.data;

            sk_schedulelist.forEach(function (item, index, arrar) {
              console.log("item",item)
              arrar[index] = {
                courseName: item.coachCourses[0].course.courseName,
                id: item.coachCourses[0].id,
                courseId: item.coachCourses[0].course.id,
                  icon: item.icon,
                price: item.coachCourses[0].price,
                zzprice: (item.coachCourses[0].price * 0.9).toFixed(2),
                zxprice: (item.coachCourses[0].price * 0.8).toFixed(2),
                // appointmentNumb: item.coachCourses.appointmentNumb,
                contain: item.coachCourses[0].course.contain,
                // scheduleDate: item.coachCourses.scheduleDate
              }
              that.setData({
                sk_schedulelist: sk_schedulelist
              })

            })
          } else {
            that.setData({
              sk_schedulelist: ""
            })

          }
        })
      }
    })
  },
  member: function () { //会员卡查询
    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        console.log(typeof res.data.memberId)
        var val = {
          memberId: res.data.memberId,

        }
        $.Requests(api.member.url, val).then((res) => {


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
      console.log("点击sijiao ",res)
      console.log("点击sijiao ", val)


      if (res.data.length != 0) {
        var sk_schedulelist = res.data[0].coachCourses;

        sk_schedulelist.forEach(function (item, index, arrar) {
          arrar[index] = {
            courseName: item.course.courseName,
            id: item.id,
            courseId: item.courseId,
            icon: item.course.icon,
            price: item.price,
            zzprice: (item.price * 0.9).toFixed(2),
            zxprice: (item.price * 0.8).toFixed(2),
            appointmentNumb: item.appointmentNumb,
            contain: item.course.contain,
            scheduleDate: item.scheduleDate
          }
          that.setData({
            sk_schedulelist: sk_schedulelist
          })

        })
      } else {
        that.setData({
          sk_schedulelist: ""
        })
      }
    })
  },
  timeclick: function (e) {

    var that = this;

    for (var childrenlist of that.data.datee) {
      // var type = "true";
      if (e.currentTarget.dataset.id == childrenlist.time) {

        // childrenlist.type = type
        that.setData({
          timeclickif:true,
          day: childrenlist.time,
          weekend: childrenlist.week,
          datee: that.data.datee,

        })
      }

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
      url: '../selfdetails/selfdetails?coachCourseId=' + e.target.dataset.coachcourseid + "&type=" + e.target.dataset.type + "&id=" + e.target.dataset.id + "&sta=" + e.target.dataset.sta + "&scheduledate=" + e.target.dataset.scheduledate
    })
  },
  skselfdetails: function (e) {
    var that = this;

    wx.navigateTo({
      url: '../selfdetails/selfdetails?coachCourseId=' + e.currentTarget.dataset.coachcourseid + "&type=" +  e.currentTarget.dataset.type + "&id=" +  e.currentTarget.dataset.id + "&sta=" +  e.currentTarget.dataset.sta + "&scheduledate=" +  e.currentTarget.dataset.scheduledate
    })
  },
  // 
  selfdetails: function (e) {


    wx.navigateTo({
      url: '../selfdetails/selfdetails?areaid=' + e.target.dataset.areaid + "&type=" + e.target.dataset.type + "&itemNo=" + e.target.dataset.itemno + "&id=" + e.target.dataset.id + "&coachCourseId=" + e.target.dataset.coachCourseId,
    })
  },
  btnselfdetails: function (e) {


    wx.navigateTo({
      url: '../selfdetails/selfdetails?areaid=' + e.currentTarget.dataset.areaid + "&type=" + e.currentTarget.dataset.type + "&itemNo=" + e.currentTarget.dataset.itemno + "&id=" + e.currentTarget.dataset.id + "&coachCourseId=" + e.currentTarget.dataset.coachCourseId,
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
    var key = 'VAKBZ-RO6RU-G3CV6-BCR6Z-LJEY3-R4BTJ';
    var that = this;
    qqmapsdk = new QQMapWX({
      key: key // 必填
    });
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log(res.latitude);
        console.log(res.longitude);
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        wx.openLocation({
          latitude: that.data.latitude,
          longitude: that.data.longitude,
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
        console.log(res.latitude);
        console.log(res.longitude);
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        wx.openLocation({
          latitude: that.data.latitude,
          longitude: that.data.longitude,
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
  closeloding:function(){
    var that=this;
    that.setData({
      homeAds:null
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
    console.log("www",e)
    var vals = {
      formId: e.detail.formId
    }
    $.Requests_json(selapi.addFromID.url + '/' + app.globalData.wxopenid, [vals]).then((res) => {

      console.log("formid", res)
      console.log("formid", vals)
      console.log("formid", app.globalData.wxopenid)

    })
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone,
    })
  },
  allOrders: function (e) { //自助健身产地服务切换
  console.log("e1",e)
    var vals = {
      formId: e.detail.formId
    }
    $.Requests_json(selapi.addFromID.url + '/' + app.globalData.wxopenid, [vals]).then((res) => {

      console.log("formid", res)
      console.log("formid", vals)
      console.log("formid", app.globalData.wxopenid)

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

      console.log("formid", res)
      console.log("formid", vals)
      console.log("formid", app.globalData.wxopenid)

    })
    console.log("e1", e)
    this.setData({
      tapindex: 2,
      type: 2
    });
    this.league_schedulelist(); //课程服务团课服务查询列表
    this.hwleague_schedulelist(); //课程服务团课服务查询列表
    this.jkleague_schedulelist(); //课程服务团课服务查询列表
    this.coach_schedulelist(); //课程服务私课服务查询列表
  },
  receiptOfGoods: function (e) { //商店服务
    console.log("e1", e)
    var vals = {
      formId: e.detail.formId
    }
    $.Requests_json(selapi.addFromID.url + '/' + app.globalData.wxopenid, [vals]).then((res) => {

      console.log("formid", res)
      console.log("formid", vals)
      console.log("formid", app.globalData.wxopenid)

    })
    this.setData({
      tapindex: 3,
      type: 3
    });
    this.ptitemlist()
  },

  classifyClick: function (e) { //配套服务子分类产品查询

    var val = {
      areaId: e.target.dataset.id
    }
    $.Requests(api.categorylist.url, val).then((res) => {
      console.log("配套服务子分类产品查询",res)

      this.setData({

        classifyClick: res.data.content,
        shopindex: e.target.dataset.index
      })
    })


  },
  Approach: function (e) { //扫码入场
  console.log("wwww",e)
     var vals = {
      formId: e.detail.formId
    }
    $.Requests_json(selapi.addFromID.url + '/' + app.globalData.wxopenid, [vals]).then((res) => {

      console.log("formid", res)
      console.log("formid", vals)
      console.log("formid", app.globalData.wxopenid)

    })
    wx.navigateTo({
      url: '../approach/approach'
    })
  },
  //下拉刷新
  onPullDownRefresh: function () {
    var that = this;
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

      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },
  login: function () { //登陆页面
    wx.navigateTo({
      url: '../land/land'
    })
  },
})