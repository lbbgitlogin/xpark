// pages/succell/succell.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("支付跳转", options)
    if (options.sta == 1) {
   
      setTimeout(function() {
        let {
          scheduleDate,
          memberCourseId
        } = options

        let data = JSON.stringify({
          scheduleDate,
          memberCourseId
        })
        wx.navigateTo({
          url: `../coachappointment/coachappointment?data=${data}` + "&tk_id=" + options.tk_id + "&sta=" + options.sta + "&coachId=" + options.coachId + "&orderNo=" + options.orderNo
          // url: '../appointmenttime/appointmenttime?id=' + options.id + "&memberCourseId=" + options.memberCourseId + "&orderNo=" + options.orderNo + "&address=" + options.address + "&price=" + options.price + "&icon=" + options.gymName + "&icon=" + options.icon + "&sta=" + options.sta ,
        })

      }, 3000)

    } else if (options.shoptype == 3) {

    } else if (options.cardnum == 1){
      setTimeout(function () {

        wx.switchTab({

          url: '../main/main' ,
          success: function (e) {
            var page = getCurrentPages().pop();
            if (page == undefined || page == null) return;
            page.onLoad();
          }
        })

      }, 3000)

    } else if (options.itemNo == "SI-FIT"){

    }
    
     else {
      setTimeout(function() {

        wx.navigateTo({

          url: '../appointmenttime/appointmenttime?id=' + options.id + "&memberCourseId=" + options.memberCourseId + "&orderNo=" + options.orderNo + "&address=" + options.address + "&price=" + options.price + "&icon=" + options.gymName + "&icon=" + options.icon + "&sta=" + options.sta + "&areaId=" + options.areaId + "&memberFitnessId=" + options.memberFitnessId ,
        })

      }, 3000)


    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  my_appointment: function() {
    wx.switchTab({
      url: '../appointment/appointment',
    })
  },
  backhome: function() {
    wx.switchTab({
      url: '../index/index',
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})