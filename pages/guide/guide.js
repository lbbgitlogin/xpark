// pages/guide/guide.js
var app = getApp();
var api = require('../../api/guide.js');
var $ = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gymId: "",
    contentshow: "",
    clientHeight: "",
    activeTab: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {

        wx.getStorage({
          key: 'gymId',
          success: function (res) {
            that.setData({
              gymId: res.data.gymId
            })
            that.guide();
          }
        })


      },
      fail: function (res) {
        wx.reLaunch({
          url: '../land/land',
        })

      },
    })
    wx.getSystemInfo({
      success: function (res) {

        that.setData({
          clientHeight: res.windowHeight
        });
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  guide: function () {
    var that = this;
    var val = {}
    $.Requests(api.guide.url + '/' + that.data.gymId, val).then((res) => {


      that.setData({
        bottomTab: res.data,
        cardViewContent: res.data,
        contentshow: res.data[that.data.activeTab].content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
      })
    })

  },
  //点击切换
  rcbBottomTab: function (e) {

    this.setData({
      activeTab: e.target.dataset.index
    })
    this.guide()
  },

  //滑动屏幕操作
  swiperChange: function (e) {
    var activeTabIndex = e.detail.current
    this.setData({
      activeTab: activeTabIndex
    })
    //
    //

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