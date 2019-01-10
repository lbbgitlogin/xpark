// pages/bufcard/buycard.js
var $ = require('../../utils/util.js');
var api = require('../../api/selfdails.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vipnum:"" ,
    formatDate:"",
    formatDates:"",
    gymId:"",
    mobile: "",
    memberId: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       console.log("options",options)
       var that = this;
    wx.getStorage({
      key: 'gymId',
      success: function (res) {
        that.setData({
          gymId: res.data.gymId,


        })
        wx.getStorage({
          key: 'userinfo',
          success: function (res) {
            that.setData({
              memberId: res.data.memberId,
              mobile:res.data.mobile

            })

          }
        })
      }
    })

    var now = new Date();
    var year = now.getFullYear();
    var years = now.getFullYear()+1;
    var month = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
    
    var day = now.getDate() < 10 ? "0" + (now.getDate()) : now.getDate();
    var days = now.getDate()-1 < 10 ? "0" + (now.getDate()-1) : now.getDate()-1;
    var formatDate = year + '年' + month + '月' + day + '日';
    var formatDates = years + '年' + month + '月' + days + '日';
    that.setData({
      vipnum: options.vipnum,
      formatDate: formatDate,
      formatDates: formatDates
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
  testSubmit:function(){
      var that = this;
    var val = {

      gymId: that.data.gymId,
      memberId: that.data.memberId,
      memberMobile: that.data.mobile,
      orderGoods: [
        { cardType: that.data.vipnum}
      ],
      payType: "wx",
      remark: ""

    }
    $.Requests_json(api.memberShipCard.url, val).then((res) => {
      console.log("购买", val)
      console.log("购买", res)
      if (res.status == 0){
        wx.navigateTo({
          url: '../succell/succell?cardnum='+1,
        })
      }

    })
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