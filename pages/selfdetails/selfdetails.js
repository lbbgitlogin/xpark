// pages/selfdetails/selfdetails.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js')
var $ = require('../../utils/util.js');
var api = require('../../api/selfdails.js');
var apicou = require('../../api/coupon.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    choose:false,
    couponlist: '',
    hidden:2,
    sta: '',
    qlid: '',
    jindu:0,
    vip: '',
    chooseindex:-1,
    couponlength:"",
    itemNo: "",
    shopdetails:'',
    scheduleDate: '',
    optionstype: '',
    tkgymdetails: '',
    tk_id: '',
    coachCourseId: '',
    gymId: '',
    shoptype: '',
    showMethod:"",//详情展现方式
    appointment:false,//预约
    areaId:"",
    id:"",
    couponid: "",
    coachId: "",
    memberFitnessId: "",
    shopid: "",
    gymdetails:"",
    itemno: "",
    formatDate:"",
    memberId: "",
  },
  buynow:function(){
     
    this.setData({
      hidden:0
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
     console.log("详情页",options)

    var that = this;
    that.member();
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
    var day = now.getDate() < 10 ? "0" + (now.getDate()) : now.getDate();
    var formatDate = year + '-' + month + '-' + day;
    that.setData({
      formatDate: formatDate,
      coachCourseId: options.coachCourseId,
      tk_id: options.id || '',
      shopid:options.id,
      optionstype:options.type,
      sta:options.sta || '',
      shoptype: options.type,
      scheduleDate: options.scheduledate || ''
    })
    if (options.type == 1) {
    that.setData({
      showMethod:1
    })
    } else if (options.type == 2) {
      that.setData({
        showMethod: 2
      })
    } else {
      that.setData({
        showMethod: 3
      })
    }
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        
        

        that.setData({
          areaId: options.areaid,
          itemno: options.itemNo,
          id:options.id,
          memberId: res.data.memberId
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
        if (options.type == 1 && options.itemNo != "SI-FIT"){
          
          that.shoptedails(options);
          that.gymdetails()
        } else if (options.type == 1 && options.itemNo == "SI-FIT"){
          that.gymdetails()
        }
        
         else if (options.type == 2 && options.sta != 1){
      
          that.league_schedule();
          
        } else if (options.sta == 1 && options.type == 2  ){
          that.coach_course();
          that.tkshoptedails(options);
        }else if(options.type == 3){
            that.shopdetails()
        }

   
      
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

    
  },
  shopdetails: function () {
    var that = this;
    var val = {
    }
    $.Requests(api.shopdetails.url + '/' + that.data.shopid, val).then((res) => {
      that.setData({
        shopdetails:res.data
      })
      console.log("shop详情", val)
      console.log("shop详情", res)

    })
  },
  couponlist: function () {
    var that = this;
    var val = {
      memberId: that.data.memberId,
      gymId: that.data.gymId,
    }
    $.Requests(apicou.couponlist.url, val).then((res) => {
         that.setData({
           couponlength: res.data.length,
     couponlist:res.data
         })
       console.log("可用优惠券查询",res)

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
          console.log("会员卡查询", val)
          console.log("会员卡查询", res)
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
  coach_course: function () {//私课详情
    var that = this;
    var val = {
      schduleDate: that.data.scheduleDate,
    }
    
    $.Requests(api.coach_course.url + '/' + that.data.tk_id, val).then((res) => {
        console.log("sk详情",val)
      console.log("sk详情",res)
      that.setData({
        tkgymdetails: res.data,
        jindu: res.data.appointmentNumb / res.data.course.contain,
        coachId: res.data.coachId
      })
    })
  },
  league_schedule: function () {
    var that = this;
    var val = {
    }
   
    $.Requests(api.league_schedule.url + '/' + that.data.tk_id, val).then((res) => {
         console.log("111",res)
      
      that.setData({
        tkgymdetails: res.data,
        jindu: res.data.appointmentNumb / res.data.course.contain
      })
    })
  },
  next_self:function(e){
  
 
    var that = this;
  
    if (that.data.optionstype == 2){
    
      wx.navigateTo({
        url: '../confirmationbuy/confirmationbuy?tk_id=' + that.data.tk_id + "&optionstype=" + that.data.optionstype + "&sta=" + that.data.sta + "&scheduleDate=" + that.data.scheduleDate + "&coachId=" + that.data.coachId + "&couponid=" + that.data.couponid, 
      })
    }else{
      wx.navigateTo({
        url: '../confirmationbuy/confirmationbuy?id=' + e.target.dataset.id + "&type=" + that.data.shoptype + "&couponid=" + that.data.couponid + "&itemno=" + that.data.itemno,
      })
    }

  },
  mapNavigation: function (e) {
   
    
    var addr = e.target.dataset.addr;
    var name = e.target.dataset.name;
    var that = this;
    // 使用 JavaScript SDK 获取目的地经纬度
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'VAKBZ-RO6RU-G3CV6-BCR6Z-LJEY3-R4BTJ'
    });
    qqmapsdk.search({
      keyword: addr,
      success: function (res) {
        
        var local = res.result.location;
        that.setData({
          latitude: local.lat,
          longitude: local.lng
        })
      }
    })
    // 使用微信内置地图查看位置
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        
        wx.openLocation({
          latitude: res.latitude,
          longitude: res.longitude,
          scale: 18,//缩放比例范围5~18
          name: name,
          address: addr, //打开后显示的地址名称
        })
      }
    })
  },
  tkshoptedails: function (options) {//团课或者私教判断是否能购买
    

    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        if (that.data.sta != 1){
          var val = {
            courseId: that.data.coachCourseId,
            courseType: '2',
            gymId: that.data.gymId,
            memberId: res.data.memberId,
          }

        }else{
          var val = {
            courseId: that.data.coachCourseId,
            courseType: '1',
            gymId: that.data.gymId,
            memberId: res.data.memberId,
          }
        }
    
        $.Requests(api.member_course.url, val).then((res) => {
console.log("团课或者私教判断是否能购买",val)

          console.log("团课或者私教判断是否能购买",res)          
          if (res.data != '') {
            that.setData({
              appointment: true
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
  shoptedails:function(options){
    
  
    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        
        var val = {
          areaId: that.data.areaId,
          memberId: res.data.memberId,
        }
        $.Requests(api.member_fitness.url, val).then((res) => {
          console.log("ssss", val)
          console.log("ssss",res)
          
          if(res.data != ''){
                that.setData({
                  appointment:true,
                  memberFitnessId: res.data[0].id,
                  orderNo: res.data[0].orderNo,
                })
          }else{
            that.setData({
              appointment:false,
           
            })
          }
          // this.setData({

          //   classifyClick: res.data.content

          // })
        })
      }
    })
   

  },
  gymdetails:function(){
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

      console.log("球类详情页",res)
      
      that.setData({
        gymdetails:res.data,
        jindu: res.data.appointmentNumb / res.data.fitness.contain,
        qlid:res.data.id,
        itemNo: res.data.fitness.itemNo,
        price:res.data.price,
        address: res.data.gym.address,
        areaId: res.data.areaId
      })
      // this.setData({

      //   classifyClick: res.data.content

      // })
    })


  },
  appointment:function(){
  
   var that = this;
 
      wx.navigateTo({

        url: '../appointmenttime/appointmenttime?id=' + that.data.qlid  + "&orderNo=" + that.data.orderNo + "&address=" + that.data.address + "&price=" + that.data.price + "&areaId=" + that.data.areaId + "&memberFitnessId=" + that.data.memberFitnessId,
      })


  },
  choosecoupon:function(e){
    console.log("e",e)
    if(this.data.choose){
      this.setData({
        chooseindex: e.currentTarget.dataset.index,
        couponid: e.currentTarget.dataset.id
      })
    }else{
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