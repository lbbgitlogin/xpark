// pages/loading/loading.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countNum: 3
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLocation()
  },
  getLocation() {
    let that = this
    wx.getLocation({ //开机立即获取地理位置
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度
      success: function (res) {

        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
        that.imageLoad();
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

        that.imageLoad();
        // that.queryMultipleNodes();
      }
    })
  },
  closeloding: function () {
    var that = this;

    that.setData({
      homeAds: null
    })
    wx.switchTab({
      url: '../index/index'
    })
    clearInterval(that.data.time)
    wx.showTabBar();
  },
  imageLoad: function (e) { //首屏广告图片加载成功做处理
    var that = this;
    that.setData({
      time: setInterval(function () {
        if (that.data.countNum > 0) {
          that.setData({
            countNum: that.data.countNum - 1
          });
        } else {
          clearInterval(that.data.time);
          that.setData({
            homeAds: null
          })
          wx.switchTab({
            url: '../index/index'
          })
          wx.showTabBar();
        }
      }, 1000)

    })

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