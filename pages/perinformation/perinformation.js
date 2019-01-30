// pages/perinformation/perinformation.js
var app = getApp();
var $ = require('../../utils/util.js');
var api = require('../../api/indexAPI.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pickerData: ["女", "男"],
    pickerweight: [],
    pickerheight: [],
    pickerIndex: 0,
    memmbleid: "",
    memberName: "",
    idCard: "",
    pickerhe: 65,
    height:"",
    weight:"",
    pickerwe: 65,
    phone:"",
    StrBirthday: "请选择生日",
    userheight: "请选择身高",
    userweight: "请选择体重"
  },
  bindDateChange: function(e) { //选择日期
    this.setData({
      StrBirthday: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载  //需要去app.js查询数据库信息是否有数据
   */
  onLoad: function(options) {
var that =this;
    that.pickerheig();
    that.pickerweig();
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        that.setData({
          phone: res.data.mobile,
          memmbleid:res.data.memberId
        })
        that.memberinformation()
      },
      fail:function(){
        wx.reLaunch({
          url: '../land/land',
        })
      }
    })
  },
   pickerheig:function(){
     var pickerheight = [];
     for (var i = 100; i <= 230; i++) {

       pickerheight.push(i);

     }
     this.setData({
       pickerheight: pickerheight
     })


   },
  memberinformation:function(){
    var that = this;
    var val={

    }
    $.Requests(api.memberinformation.url + '/' + that.data.memmbleid, val).then((res) => {
      
      
      that.setData({
        memberName: res.data.memberName,
        idCard: res.data.idCard,
        StrBirthday: res.data.birth,
        pickerIndex:res.data.gender,
        height: res.data.hight,
        weight: res.data.wight
      })

    })
  },
  pickerweig: function () {
    var pickerweight = [];
    for (var i = 35; i <= 200; i+= 0.5) {

      pickerweight.push(i);

    }
    this.setData({
      pickerweight: pickerweight
    })


  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  formSubmit:function(e){
    
    var that = this;
    var val = {
      birth: e.detail.value.birth,
      gender: e.detail.value.gender,
      hight: that.data.pickerheight[that.data.pickerhe],
      idCard: e.detail.value.idCard,
      memberName: e.detail.value.memberName,
      mobile: that.data.phone,
      wight: that.data.pickerweight[that.data.pickerwe],
    }
    $.Requestsput(api.modify.url+'/'+ that.data.memmbleid, val).then((res) => {
   
      
      if (res.status == 0){
        setTimeout(() => {
          wx.showModal({
            title: '提示',
            content: "保存成功",
     
          })
        }, 500)
      }
    })

    
  },
  pickerClick: function(event) { //性别选择

    
    this.setData({
      pickerIndex: event.detail.value,
      isCoupon: event.detail.value
    });
  },
  pickerClickheight: function (event) { //身高选择

    
    this.setData({
      pickerhe: event.detail.value
    });
  },
  pickerClickweight: function (event) { //体重选择

    this.setData({
      pickerwe: event.detail.value
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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