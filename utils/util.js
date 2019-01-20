var cfExt = wx.getExtConfigSync ? wx.getExtConfigSync() : require('../config.js');
var cf = cfExt.config ? wx.getExtConfigSync() : require('../config.js');
function isNull(o) {
  return o == undefined || o == "undefined" || o == null || o == '';
}
function parseJSON(str) {

  try {
    return JSON.parse(str);
  } catch (e) {
    //todo
    return undefined;
  }
}
function compareTime(startTime, endTime) {

  //          var start_time=startTime.replace(/-|\s|:|\//g,'').replace(' ', ''); //用这个加强版也可以
  var start_time = startTime.replace(/-|\s|:|\//g, '');
  console.log("start_time", start_time)
  var end_time = endTime.replace(/-|\s|:|\//g, '');
  console.log("end_time", end_time)

  if (start_time < end_time) { 
    console.log("11111")
    return true;
    
     }
  else { 
    
    console.log("22222")
    return false; }

}
function Requests(url, data) { //接口方法为get时调用


   return new Promise((resolv, reject) => {
     loading();
     wx.request({
       url: url,
       data: data,
       method: "get",
       header: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       success: function (res) {
         hideloading();
         if (res.data == "服务器异常") {
           wx.hideLoading()
           wx.showModal({
             title: '提示',
             content: '网络错误或服务器繁忙!',
           })
         } else {
           resolv(res.data)
         }
       },
       fail: function (err) {
         
         reject(err)
         wx.hideLoading()
         wx.showModal({
           title: '提示',
           content: '网络错误或服务器繁忙!',
         })
       }
     })
   })




  
}
function Requestsput(url, data) { //接口方法为put时调用


  return new Promise((resolv, reject) => {
    loading();
    wx.request({
      url: url,
      data: data,
      method: "put",
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        hideloading();
        if (res.data == "服务器异常") {
          wx.hideLoading()
          wx.showModal({
            title: '提示',
            content: '网络错误或服务器繁忙!',
          })
        } else {
          resolv(res.data)
        }
      },
      fail: function (err) {
        
        reject(err)
        wx.hideLoading()
        wx.showModal({
          title: '提示',
          content: '网络错误或服务器繁忙!',
        })
      }
    })
  })





}
function Requests_json(url, data) { //接口方法为post时调用

  return new Promise((resolv, reject) => {
    loading();
    wx.request({
      url: url,
      data: data,
      method: "POST",
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
      },
      success: function (res) {
        hideloading();
        if (res.data == "服务器异常") {
          wx.hideLoading()
          wx.showModal({
            title: '提示',
            content: '网络错误或服务器繁忙!',
          })
        } else {
          resolv(res.data)
        }
      },
      fail: function (err) {
        wx.hideLoading()
        
        reject(err)
        wx.showModal({
          title: '提示',
          content: '网络错误或服务器繁忙!',
        })
      }
    })
  })
}

function alert(content, callback, duration) { //普通弹出框
  
  if (content.length <= 7) {
    wx.showToast({
      icon: "success",
      title: content || "成功",
      duration: duration || 2000,
      success: callback
    });
  } else {
    setTimeout(() => {
      wx.showModal({
        title: '提示',
        content: content || "成功",
        // showCancel: false,
        success: callback
      })
    }, 500)

  }


}

function loading(content, time, callback) { //数据加载
  wx.showLoading({
    mask: true,
    title: content || "loading...",
    success: callback
  });
}

function hideloading() { //隐藏提示框
  var time = setTimeout(function () {
    wx.hideLoading()
  }, 500);
}

function confirm(content, callback, isCancel) { //确认对话框
  wx.showModal({
    title: '提示',
    content: content,
    showCancel: isCancel || false,
    success: callback
  })
}
function Sync({year,month,date}) {
  var res = wx.getSystemInfoSync();
  var type = res.system
  if (type.indexOf("iOS") == -1 ){
    return `${year}/${month}/${date}`
  }else{
    return `${year}-${month}-${date}`
  }
}

function gopage(url, callback) { //保留当前页，跳转页面
  wx.navigateTo({
    url: url,
    success: callback,
    fail: function (e) {
      
    }
  })
}

function gotopage(url, callback) { //关闭当前页面，跳转页面
  wx.redirectTo({
    url: url,
    success: callback
  })
}

function backpage(n, callback) { //返回第N页，大于跳转页面返回首页
  wx.navigateBack({
    delta: n || 1,
    success: callback
  })
}

function setCache(key, data, callback) { //添加缓存【异步】
  wx.setStorage({
    key: key,
    data: data,
    success: callback
  });
}

function getCache(key, callback, failback) { //获取缓存【异步】
  wx.getStorage({
    key: key,
    success: callback,
    fail: failback
  });
}

function removeCache(key, callback) { //移除缓存【异步】
  wx.removeStorage({
    key: key,
    success: callback
  })
}
/**
* @description 导航跳转
* @param {Object} that 当前页面
* @param {Object} pageConfig 后台传过来的配置信息
*/
function golevelToTabBar(that, pageConfig, pageUrl) {
  //判断当前是否为导航页，控制展示底部导航栏
  try {
    if (cf.config.tabBar.list instanceof Array) {
      var isTabBar = false;
      //比对出当前页面
      for (var i = 0; i < cf.config.tabBar.list.length; i++) {
        if (!isTabBar) {
          var _pgconfig = cf.config.tabBar.list[i];
          if (("../../" + _pgconfig.pagePath) == pageConfig) {
            //表示导航页
            isTabBar = true;
          } else {
            isTabBar = false
          }
        }
      }
      if (isTabBar) {
        wx.navigateTo({
          url: pageUrl
        })
      } else {
        wx.redirectTo({
          url: pageUrl
        })
      }
    } else {
      wx.redirectTo({
        url: pageUrl
      })
    }
  } catch (e) {
    wx.redirectTo({
      url: pageUrl
    })
  }
}
//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。  
//调用：accAdd(arg1,arg2)  
//返回值：arg1加上arg2的精确结果   
function accAdd(arg1, arg2) {
  var r1, r2, m;
  try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
  try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2))
  return (arg1 * m + arg2 * m) / m
}

//说明：javascript的减法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的减法结果。  
//调用：accSub(arg1,arg2)  
//返回值：arg1减上arg2的精确结果  
function accSub(arg1, arg2) {
  return accAdd(arg1, -arg2);
}
function doubleNum(num) { //将个位数字变成两位
  if (num < 10) {
    return "0" + num;
  } else {
    return num + "";
  }
}

function formatTime() {
  var date = new Date().getTime();//当前时间
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
//得到时间格式2018-10-02
const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')

}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//todate默认参数是当前日期，可以传入对应时间 todate格式为2018-10-05
function getDates(days, todate) {
  var dateArry = [];
  for (var i = 0; i < days; i++) {
    var dateObj = dateLater(todate, i);
    dateArry.push(dateObj)
  }
  return dateArry;
}
function dateLater(dates, later) {
  let dateObj = {};
  let show_day = new Array('日', '一', '二', '三', '四', '五', '六');
  let date = new Date(dates);
  date.setDate(date.getDate() + later);
  let day = date.getDay();
  let yearDate = date.getFullYear();
  let month = ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1);
  let dayFormate = (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
  dateObj.yearDate = yearDate;
  dateObj.time = dayFormate;
  dateObj.month = month;
  dateObj.week = show_day[day];
  return dateObj;
}


module.exports = {
  isNull: isNull, //判断是否为空
  parseJSON: parseJSON, //转json
  Requestsput: Requestsput, //转json
  Requests, //发起网络请求
  compareTime,
  Requests_json, //发起网络请求
  alert: alert, //弹出框
  loading: loading, //数据加载
  gopage: gopage,
  confirm: confirm,
  gotopage: gotopage,
  backpage: backpage,
  setCache: setCache,
  getCache: getCache,
  removeCache: removeCache,
  hideloading: hideloading,
  formatTime: formatTime,
  doubleNum: doubleNum,
  formatDate: formatDate,
  getDates: getDates,
  golevelToTabBar: golevelToTabBar,
  accAdd: accAdd,
  accSub: accSub,
}
