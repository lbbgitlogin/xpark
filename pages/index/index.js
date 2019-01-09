//index.js
// 引入SDK核心类
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
    provincechoose: "",
    scrootop: "",
    gymName: "",
    ptitemlist: "",
    latitude: "",
    ptitemlistid: "",
    longitude: "",
    activeTab: '',
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
    sk_schedulelist: "",
    hasUserInfo: false,
    countNum: 5,
    type: 1,
    hidden: false,
    province: "", //省
    city: "", //市
    timenum: false,
    tbodyHeight: "",
    homeAds: true,
    tapindex: 1,
    categoryId: "",
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  queryMultipleNodes: function() {
    var that = this;
    setTimeout(function() {
      let query = wx.createSelectorQuery()
      query.select('#mjltest').boundingClientRect((rect) => {

        let top = rect.top
   console.log("top",top)
        that.setData({
          scrolltop: top
        })

      }).exec()


    },6000)
  },
  onLoad: function(options) {


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
      success: function(res) {
        that.setData({
          hidden: false,
          balance: res.data.cash + res.data.give

        })

      },
      fail: function(res) {
        that.setData({
          hidden: true
        })

      },
    })


    // that.getLocal(that.data.latitude, that.data.longitude);
    wx.getLocation({ //开机立即获取地理位置
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度
      success: function(res) {

        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
        that.imageLoad();
        that.queryMultipleNodes(); //获取id的高度需要在第一时间执行

        wx.getStorage({
          key: 'gymId',
          success: function (res) {



          },
          fail:function(){
            that.getLocal(that.data.latitude, that.data.longitude);
          }
        })
       

      },
      fail: function(res) {

        that.imageLoad();
        that.queryMultipleNodes();
      }
    })
    that.classification();
    that.fitnesslist(); //自助健身子分类查询
    that.ptitemlist(); //配套服务
    that.league_schedulelist(); //课程服务团课服务查询列表

    that.coach_schedulelist(); //课程服务私课服务查询列表
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
    console.log("手机型号",res)

    this.setData({
      sysW: res.windowHeight / 12, //更具屏幕宽度变化自动设置宽度

    })
    wx.hideTabBar();
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
      success: function(res) {
        var h = 750 * res.windowHeight / res.windowWidth


      }
    })
    app.GetUserInfo(function() {

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
  choosename: function(e) {

    wx.clearStorage();
    var that = this;
    that.setData({
      nearshop: e.target.dataset.gymname,
      ishidden: false,
      address: e.target.dataset.address,
      gymId: e.target.dataset.gymid,
      hidden:true
    })
    var objlist = {
      gymId: e.target.dataset.gymid,
      gymName: e.target.dataset.gymname
    }
    wx.setStorage({
      key: 'gymId',
      data: objlist,
    })
    setTimeout(function() {

      $.alert("请先登录")

    }, 1000) //延迟时间 这里是1秒

    setTimeout(function() {

      wx.navigateTo({
        url: '../land/land',
      })

    }, 2000) //延迟时间 这里是1秒

    that.classification();
    that.league_schedulelist();
    that.coach_schedulelist();
    that.ptitemlist();
  },
  nearshop: function() {

    var that = this;
    var val = {
      province: that.data.province, //省
      city: that.data.city, //市
      latitude: that.data.latitude,
      longitude: that.data.longitude,

    }
    $.Requests_json(api.nearshop.url, val).then((res) => {

      console.log("附近门店", res)
      if (res.status == 0 && res.data == null) {

        setTimeout(function() {
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
  getLocal: function(latitude, longitude) {
    let vm = this;
    qqmapsdk = new QQMapWX({
      key: 'VAKBZ-RO6RU-G3CV6-BCR6Z-LJEY3-R4BTJ'
    });

    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function(res) {

        let province = res.result.ad_info.province
        let city = res.result.ad_info.city
        vm.setData({
          province: province,
          city: city,
        })
        vm.nearshop();
        vm.provincelist();
      },
      fail: function(res) {

      },
      complete: function(res) {
        // 
      }
    });
  },
  citychoose: function(e) {
    this.setData({
      city: e.target.dataset.city
    })
    var val = {
      province: this.data.provincechoose,
      city: e.target.dataset.city,

    }
    $.Requests_json(api.province_city.url, val).then((res) => {
      console.log("门店", val)
      console.log("门店", res)
      this.setData({
        gymshoplist: res.data,
        cityTab: e.target.dataset.index
      })



    })
  },
  provincelist: function() { //门店列表
    // var val = {
    //   province: this.data.province,
    //   city: this.data.city,

    // }
    // $.Requests_json(api.province_city.url, val).then((res) => {
    //   console.log("门店", val)
    //   console.log("门店",res)
    //   this.setData({
    //     shoplist: res.data
    //   })



    // })
    var val = {

    }
    $.Requests(api.province.url, val).then((res) => {
      console.log("省", val)
      console.log("省", res)
      this.setData({
        shoplist: res.data
      })



    })
  },
  provinceshow: function(e) {
    var that = this;
    that.setData({
      provincechoose: e.target.dataset.province,
      gymshoplist: '',
      cityTab: -1,
      activeTab: e.target.dataset.index
    })
    console.log("省", e)
    var val = {
      province: e.target.dataset.province
    }
    $.Requests(api.city.url, val).then((res) => {
      console.log("市", val)
      console.log("city", res)
      that.setData({
        citylist: res.data
      })



    })

  },
  classification: function() { //自助健身产品查询

    var that = this;
    var val = {
      gymId: 1,

    }
    // zzlist
    $.Requests(api.classification.url, val).then((res) => {
      console.log("场地服务", val)
      console.log("场地服务", res)
      if (res.data.content.length !=0){
        var zzlist = res.data.content;
        console.log("zzlist", zzlist)
        zzlist.forEach(function (item, index, arrar) {
          arrar[index] = {
       
            icon: item.fitness.icon,
            fitnessName: item.fitnessName,
            price: item.price,
            areaId: item.areaId,
            id: item.id,
            itemNo: item.fitness.itemNo
          }
          that.setData({
            zzlist: zzlist
          })

        })
      }

      // that.setData({

      //   zzlist: res.data.content
      // })


    })



  },
  fitnesslist: function() { //自助健身子分类产品查询
    var val = {
      page: '11',
      size: '10',
      start: '1'
    }
    $.Requests(api.classification.url, val).then((res) => {



    })
  },
  ptitemlist: function() { //配套分类查询
    var that = this;
    wx.getStorage({
      key: 'gymId',
      success: function(res) {
  console.log("商品服务",res)
        var val = {
          gymId: 1,
          itemNo: 'SI-GOODS'
        }
        $.Requests(api.ptitemlist.url, val).then((res) => {
          console.log("配套服务查询", val)
          console.log("配套服务查询", res)

          that.setData({
            ptitemlist: res.data,
            ptitemlistid: res.data[0].id
          })
          var val = {
            areaId: res.data[0].id
          }
          $.Requests(api.categorylist.url, val).then((res) => {

            //配套第一分类商品查询
            console.log("配套第一分类商品查询", res)
            that.setData({

              classifyClick: res.data.content

            })
          })
        })
      }
    })


  },
  league_schedulelist: function() { //课程服务团课服务查询列表
    var that = this;
    wx.getStorage({
      key: 'gymId',
      success: function(res) {

        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
        var day = now.getDate();
        var formatDate = year + '-' + month + '-' + day;
        var val = {
          gymId: res.data.gymId,
          scheduleDate: formatDate
        }
        $.Requests(api.league_schedulelist.url, val).then((res) => {

          console.log("团课列表查询", val)
          console.log("团课列表查询", res)
         if(res.data.length !=0){


          var tk_schedulelist= res.data;
          console.log("tk_schedulelist", tk_schedulelist)
          tk_schedulelist.forEach(function(item,index,arrar){
            arrar[index]={
              name:item.course.courseName,
              id: item.course.id,
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
         }else{
           that.setData({
             tk_schedulelist: ""
                        })
         }
        
        })
      }
    })


  },
  tk_schedulelist: function(e) { //点击课程服务团课服务查询列表
    var that =this;
    var now = new Date();
    var year = now.getFullYear();
    
    var month = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
    var formatDate = year + '-' + month + '-' + e.target.dataset.id;
    this.setData({
      scheduleDate: formatDate
    })
    var val = {
      gymId: 1,
      scheduleDate: formatDate
    }
    $.Requests(api.league_schedulelist.url, val).then((res) => {
      console.log("是否执行点击团课", val)
      console.log("是否执行点击团课",res)
    if(res.data.length !=0){

   
      var tk_schedulelist = res.data;
      console.log("tk_schedulelist", tk_schedulelist)
      tk_schedulelist.forEach(function (item, index, arrar) {
        arrar[index] = {
          name: item.course.courseName,
          id: item.course.id,
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
    }else{
      that.setData({
        tk_schedulelist:""
      })
    }
    })
  },
  coach_schedulelist: function() { //课程服务私课服务查询列表val

    var that = this;
    wx.getStorage({
      key: 'gymId',
      success: function(res) {

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

          console.log("私教", val)
          console.log("私教", res)
          if(res.data.length !=0){

          
          var sk_schedulelist = res.data[0].coachCourses;
          console.log("sk_schedulelist", sk_schedulelist)
          sk_schedulelist.forEach(function (item, index, arrar) {
            arrar[index] = {
              courseName: item.course.courseName,
              id: item.id,
              icon: item.course.icon,
              price: item.price,
              appointmentNumb: item.appointmentNumb,
              contain: item.course.contain,
              scheduleDate: item.scheduleDate
            }
            that.setData({
              sk_schedulelist: sk_schedulelist
            })

          })
          }else{
            that.setData({
              sk_schedulelist:""
            })

          }
        })
      }
    })
  },
  sk_schedulelist: function(e) { //点击课程服务私课服务查询列表
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
      console.log("点击sk", val)
     console.log("点击sk",res)
     if(res.data.length !=0){
      var sk_schedulelist = res.data[0].coachCourses;
      console.log("sk_schedulelist", sk_schedulelist)
      sk_schedulelist.forEach(function (item, index, arrar) {
        arrar[index] = {
          courseName: item.course.courseName,
          id: item.id,
          icon: item.course.icon,
          price: item.price,
          appointmentNumb: item.appointmentNumb,
          contain: item.course.contain,
          scheduleDate: item.scheduleDate
        }
        that.setData({
          sk_schedulelist: sk_schedulelist
        })

      })
     }else{
       that.setData({
         sk_schedulelist:""
       })  
     }
    })
  },
  timeclick: function(e) {
    console.log("时间选择",e)
    var that = this;

    for (var childrenlist of that.data.datee) {
      // var type = "true";
      if (e.currentTarget.dataset.id == childrenlist.time) {

        // childrenlist.type = type
        that.setData({
          day: childrenlist.time,
          weekend: childrenlist.week,
          datee: that.data.datee,

        })
      }

    }
    that.tk_schedulelist(e);
    that.sk_schedulelist(e);

  },
  onPageScroll: function(e) { //上滑监听



    // this.setData({
    //   scrolltop: e.scrollTop
    // })
    if (e.scrollTop >= this.data.scrolltop) {

      this.setData({
        shouldFixedTop: true,
        scrootop: 1
      });
    } else {

      this.setData({
        shouldFixedTop: false,
        scrootop: 2
      });
    }
  },
  choose: function() {
    this.setData({
      ishidden: true
    })
  },
  textblock: function() {
    this.setData({
      ishidden: false
    })
  },
  tkselfdetails: function(e) {
    var that = this;


    wx.navigateTo({
      url: '../selfdetails/selfdetails?coachCourseId=' + e.target.dataset.coachcourseid + "&type=" + e.target.dataset.type + "&id=" + e.target.dataset.id + "&sta=" + e.target.dataset.sta + "&scheduledate=" + e.target.dataset.scheduledate
    })
  },
  // 
  selfdetails: function(e) {


    wx.navigateTo({
      url: '../selfdetails/selfdetails?areaid=' + e.target.dataset.areaid + "&type=" + e.target.dataset.type + "&itemNo=" + e.target.dataset.itemno + "&id=" + e.target.dataset.id + "&coachCourseId=" + e.target.dataset.coachCourseId,
    })
  },
  btnselfdetails: function(e) {


    wx.navigateTo({
      url: '../selfdetails/selfdetails?areaid=' + e.currentTarget.dataset.areaid + "&type=" + e.currentTarget.dataset.type + "&itemNo=" + e.currentTarget.dataset.itemno + "&id=" + e.currentTarget.dataset.id + "&coachCourseId=" + e.currentTarget.dataset.coachCourseId,
    })
  },
  previewImage: function(e) { //画廊

    wx.previewImage({
      urls: this.data.imgalist // 需要预览的图片http链接列表
    })
  },
  onReady: function() {


    var tbodyHeight = app.globalData.windowHeight - 90; //90为头部固定高度 
    this.setData({
      tbodyHeight: tbodyHeight.toFixed(0)
    })
  },
  mapNavigation: function(e) {

    var addr = e.target.dataset.addr;
    var name = e.target.dataset.name;
    var key = 'VAKBZ-RO6RU-G3CV6-BCR6Z-LJEY3-R4BTJ';
    var that = this;
    wx.request({
      url: 'https://apis.map.qq.com/ws/geocoder/v1', // 仅为示例，并非真实的接口地址
      data: {
        address: '上海市' + '上海市' + addr,
        key: key,

      },

      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res.data)
        var local = res.data.result.location;
        that.setData({
          latitude: local.lat,
          longitude: local.lng
        })
        wx.openLocation({
          latitude: that.data.latitude,
          longitude: that.data.longitude,
          scale: 18, //缩放比例范围5~18
          name: name, //打开后显示的地址名称
          address: addr
        })
      }

    })
  },
  getUserInfo: function(e) {

    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  imageLoad: function(e) { //首屏广告图片加载成功做处理
    var that = this;
    var time = setInterval(function() { //进行倒计时
      if (that.data.countNum > 0) {
        that.setData({
          countNum: that.data.countNum - 1
        });
      } else {
        clearInterval(time);
        that.setData({
          homeAds: null
        });
        wx.showTabBar();
      }
    }, 1000);
  },
  goHomeAds: function(e) { //开机login
    var that = this;
    this.setData({
      homeAds: null
    });
    wx.showTabBar();
  },

  homeAdsError: function(e) { //首页广告图片加载出错
    wx.showTabBar();
    that.setData({
      homeAds: null,
      countNum: 0 //用来倒计时
    });
  },
  call: function(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone,
    })
  },
  allOrders: function() { //自助健身
    this.setData({
      tapindex: 1,
      type: 1
    });
  },
  toBePaid: function() { //课程服务
    this.setData({
      tapindex: 2,
      type: 2

    });
  },
  receiptOfGoods: function() { //配套服务
    this.setData({
      tapindex: 3,
      type: 3
    });
  },

  classifyClick: function(e) { //配套服务子分类产品查询

    var val = {
      areaId: e.target.dataset.id
    }
    $.Requests(api.categorylist.url, val).then((res) => {
      console.log("子分类", res)

      this.setData({

        classifyClick: res.data.content,
        shopindex: e.target.dataset.index
      })
    })


  },
  Approach: function() { //扫码入场
    wx.navigateTo({
      url: '../approach/approach'
    })
  },
  login: function() { //登陆页面
    wx.navigateTo({
      url: '../land/land'
    })
  },
})