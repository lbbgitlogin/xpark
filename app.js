//app.js
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
          wx.getUserInfo({ //获取登录用户的信息
            success: function (res) {//直接进行更新
              
              var wxinfo = $.parseJSON(res.rawData);
              wx.login({
                success: function (datainfo) {
                  
                  var thatdata = {
                    code: datainfo.code,

                  }
                  wx.request({
                    url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx08d766c6816e4873&secret=f697c5cd29ffd7b21f7ad5afa4d7fee9&js_code=' + thatdata.code + '&grant_type=authorization_code',
                    data: {},
                    header: {
                      'content-type': 'application/json'
                    },
                    success: function (res) {
                    
                      that.globalData.wxopenid = res.data.openid;
                    }
                  })
                }
              });
            }
          });
        } else {
          wx.login({
            success: function (datainfo) {
              
              var thatdata = {
                code: datainfo.code,

              }
              wx.request({
                url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx08d766c6816e4873&secret=f697c5cd29ffd7b21f7ad5afa4d7fee9&js_code=' + thatdata.code + '&grant_type=authorization_code',
                data: {},
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  
                  that.globalData.wxopenid = res.data.openid;
                }
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