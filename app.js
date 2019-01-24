//app.js
const mtjwxsdk = require('utils/mtj-wx-sdk.js');
var $ = require('utils/util.js');
// 接口文件js文件名
var api = require('api/indexAPI.js');//登陆接口js文件
App({
  onShow: function () {
  },
  onLaunch: function () {
    var that=this;
    wx.getSystemInfo({
      success: function (res) {
        
        
        that.globalData.windowHeight = res.windowHeight - (res.windowWidth / 750) * 94

      }
    })
  },
  GetUserInfo: function (callback, Uid, callfrist) {
    var that = this;
    wx.getSetting({
      success: function (res) {
        
        if (res.authSetting['scope.userInfo']) {
         
         
              wx.login({
                success: function (datainfo) {
                  
                  var thatdata = {
                    code: datainfo.code,

                  }

                  $.Requests(api.openid.url, thatdata).then((res) => {
                    
                    that.globalData.wxopenid = res.openid;
                  //   var obj = {
                  //     openID: res.openid,
                  //   }
                  //  wx.setStorage({
                  //    key: 'userinfo',
                  //    data: obj,
                  //  })
                 
                  })
                  
                }
          
          });
        } else {
          wx.login({
            success: function (datainfo) {
              
              var thatdata = {
                code: datainfo.code,

              }
              $.Requests(api.openid.url, thatdata).then((res) => {
                
                that.globalData.wxopenid = res.openid;
                // var obj = {
                //   openID: res.openid,
                // }
                // wx.setStorage({
                //   key: 'userinfo',
                //   data: obj,
                // })
              
              })
            }
          });
        }
      }, fail(res) {
        
      }
    });
  },
  globalData: {
    wxopenid:"",
    UserInfo: null,
    ImgPath: "",
    windowHeight: null
  }
})