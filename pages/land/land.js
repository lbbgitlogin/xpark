// pages/land/land.js

var app = getApp();
var api = require('../../api/land.js');
var userAPi = require('../../api/indexAPI.js');
var $ = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon: "",
    openID: "",
    gender: "",
    gymId: "",
    mobile: "",
    memberName: "",
    memberId: "",
    btntext: "获取验证码",
    phone: "",
    day: "",
    cash: "",
    give: "",
    landnum: 1,
    sendTime: 60, //再次发送时间
    isSend: true, //是否可以再次发送
    truecode: "",//返回的验证码
    code: "",//输入的验证码
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
          gymId: res.data.gymId

        })

      },
    })
    wx.setNavigationBarColor({
      backgroundColor: '#282B30', // 必写项
      frontColor: '#ffffff', // 必写项
    })
  },
  phone: function (e) {//输入手机号
    this.setData({
      phone: e.detail.value
    });
  },
  sendmessage: function () { //获取验证码
    if ($.isNull(this.data.phone)) {
      $.alert("请输入手机号");
    } else if (!(/^1\d{10}$/.test(this.data.phone))) {
      $.alert("手机号格式不正确");
    } else {
      if (this.data.isSend) {
        this.setData({
          isSend: false
        });
        var time = this.data.sendTime;
        //开始发送
        var val = {
          mobile: this.data.phone,
        }
        var thisobj = this;
        
        $.Requests(api.send.url, val).then((res) => {
          
          if (res.status == 0) {
            var inter = setInterval(function () {

              if (time > 0) {
                thisobj.setData({
                  btntext: (time--) + "s",
                  // truecode: data.Info[0]
                });
              } else {
                thisobj.setData({
                  isSend: true,
                  sendTime: 120,
                  btntext: "重新发送"
                });
                clearInterval(inter);
              }
            }, 1000);
          }
          // else if (res.Code == 0 && res.Info[0] == -20) {

          //   setTimeout(function () {
          //     wx.showModal({
          //       title: '提示',
          //       content: '上条短信发送未超过2分钟请耐心等待',
          //       success: function (res) {
          //         // if (res.confirm) {
          //         //   
          //         // }
          //       }
          //     })
          //     // $.alert(data.Msg);
          //     thisobj.setData({
          //       isSend: true
          //     });
          //   }, 1000)


          // } 
          // else {
          //   $.alert(res.Msg);
          //   thisobj.setData({
          //     isSend: true
          //   });
          // }
        });
      }
    }
  },
  onGotUserInfo: function (e) {

    var that = this;
    if (e.detail.userInfo != null) { //用户点击允许授权
      
      that.setData({
        icon: e.detail.rawData.avatarUrl,
        gender: e.detail.rawData.gender,
        memberName: e.detail.rawData.nickName,
      })
      that.formSubmit(e)
    } else {

    }
  },
  formSubmit: function (e) {//注册   
    

    // if (this.data.userAccount == this.data.passWord) {
    //   setTimeout(function () {
    //     wx.showModal({
    //       title: '提示',
    //       content: '账号密码不能相同',
    //       success: function (res) {
    //       }
    //     })
    //   }, 1000)
    //   return;
    // }
    if ($.isNull(this.data.phone)) {
      $.alert("请输入手机号");
      return;
    }
    let str = /^1\d{10}$/
    if (str.test(this.data.phone)) {

    } else {
      $.alert("手机号格式错误");
      return;
    }
    if ($.isNull(this.data.code)) {
      $.alert("请输入验证码");
      return;
    }
    if (this.data.code.length < 6) {
      $.alert("请输入6位验证码");
      return;
    }

    var val = {
      mobile: this.data.phone,
      code: this.data.code,
      gender: e.detail.userInfo.gender,
      gymId: this.data.gymId,
      icon: e.detail.userInfo.avatarUrl,
      memberName: e.detail.userInfo.nickName,
      openID: app.globalData.wxopenid,

    }
    
    var thisobj = this;
    $.Requests_json(api.login.url, val).then((res) => {
         console.log("注册",res)
         console.log("注册",val)
      if (res.data != null) {
        var obj = {
          icon: res.data.icon,
          memberName: res.data.memberName,
          mobile: res.data.mobile,
          openID: res.data.openID,
          give: res.data.give,
          cash: res.data.cash,
          memberId: res.data.id,
          day: res.data.day,
          createTime: res.data.createTime
        }
        wx.setStorage({
          key: 'userinfo',
          data: obj,
        })
        // var that = this;
        wx.getStorage({
          key: 'userinfo',
          success: function (res) {
            var val = {
              memberId: res.data.memberId,

            }
            $.Requests(userAPi.member.url, val).then((res) => {
              if (res.data.length > 0) {
                wx.setStorage({
                  key: 'vip',
                  data: res.data[0].vip,
                  success: function (res) {
                    // success
                    
                  },
                  fail: function () {
                    // fail
                  },
                  complete: function () {
                    // complete
                  }
                })
              }

            })

          },

        })
        wx.switchTab({

          url: '../index/index',
          success: function (e) {
            var page = getCurrentPages().pop();
            if (page == undefined || page == null) return;
            page.onLoad();
          }
        })
      }
    });




  },
  pho_input: function (e) {//输入验证码
    this.setData({
      landnum: 1
    });
  },
  dx_input: function (e) {//输入验证码
    this.setData({
      landnum: 2
    });
  },
  code: function (e) {//输入验证码
    this.setData({
      code: e.detail.value,
    });
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