// pages/succell/succell.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadngtime: "",
    timeshow: 3,
    id: '',
    ljyy: true,
    itemno: 0,
    ifupload: false,
    shoptype: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;

    if (options.sta == 1) { //私教预约跳转
      that.setData({
        itemno: 1,
        loadngtime: setInterval(function () {
          if (that.data.timeshow > 0) {
            that.setData({
              timeshow: that.data.timeshow - 1
            })
            if (that.data.timeshow == 0) {
              let {
                scheduleDate,
                memberCourseId
              } = options

              let data = JSON.stringify({
                scheduleDate,
                memberCourseId
              })
              clearInterval(that.data.loadngtime)
              wx.navigateTo({
                url: `../coachappointment/coachappointment?data=${data}` + "&tk_id=" + options.tk_id + "&sta=" + options.sta + "&coachId=" + options.coachId + "&orderNo=" + options.orderNo + "&ifsj=" + 2 + '&coachcourseid=' + options.coachCourseId + '&coachname=' + options.coachname + '&price=' + options.price
              })
            }
          }

        }, 1000)
      })
    } else if (options.shoptype == 3) { //商品购买跳转
      that.setData({
        itemno: 0,
        shoptype: 3,
        id: options.id || ''
      })
    } else if (options.optionstype == 2) { //团课
      that.setData({
        itemno: 1,
        loadngtime: setInterval(function () {
          if (that.data.timeshow > 0) {
            that.setData({
              timeshow: that.data.timeshow - 1
            })
            if (that.data.timeshow == 0) {
              clearInterval(that.data.loadngtime)
              wx.navigateTo({
                url: `../tkconorder/tkconorder?memberCourseId=${options.memberCourseId}&orderNo=${options.orderNo}&optionstype=${options.optionstype}&tk_id=${options.tk_id}&formatdates=${options.formatdates}&price=${options.price}&buy_num=${options.buy_num}&starttime=${options.starttime}`
              })

            }
          }
        }, 1000)
      })
    } else if (options.cardnum == 1) { // 购卡成功
      that.setData({
        itemno: 3,
        loadngtime: setInterval(function () {
          if (that.data.timeshow > 0) {
            that.setData({
              timeshow: that.data.timeshow - 1,
            })
            if (that.data.timeshow == 0) {
              clearInterval(that.data.loadngtime)
              wx.switchTab({

                url: '../main/main',
                success: function (e) {
                  var page = getCurrentPages().pop();
                  if (page == undefined || page == null) return;
                  page.onLoad();
                }
              })

            }
          }

        }, 1000)
      })
    } else if (options.itemNo == "SI-FIT") {

      that.setData({
        itemno: 0,
        ljyy: false
      })
    } else { //球类跳转
      that.setData({
        itemno: 1,
        loadngtime: setInterval(function () {
          if (that.data.timeshow > 0) {
            that.setData({
              timeshow: that.data.timeshow - 1
            })
            if (that.data.timeshow == 0) {
              clearInterval(that.data.loadngtime)
              wx.navigateTo({

                url: '../appointmenttime/appointmenttime?id=' + options.id + "&memberCourseId=" + options.memberCourseId + "&orderNo=" + options.orderNo + "&address=" + options.address + "&price=" + options.price + "&icon=" + options.gymName + "&icon=" + options.icon + "&sta=" + options.sta + "&areaId=" + options.areaId + "&memberFitnessId=" + options.memberFitnessId + "&shopname=" + options.shopname,
              })

            }
          }

        }, 1000)
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onUnload: function () {

    if (this.data.ifupload == false) {
      clearInterval(this.data.loadngtime)
      wx.navigateBack({

        delta: 1, //想要返回的层级

      })
    }

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  my_appointment: function () {
    this.setData({
      ifupload: true
    })
    wx.switchTab({
      url: '../appointment/appointment',
    })
  },
  backhome: function () {
    clearInterval(this.data.loadngtime)
    wx.switchTab({
      url: '../index/index',
      success: function (e) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      }
    })
    this.setData({
      ifupload: true
    })


  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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