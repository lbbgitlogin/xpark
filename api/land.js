var cfExt = wx.getExtConfigSync ? wx.getExtConfigSync() : require('../config.js');
var cf = cfExt.config ? wx.getExtConfigSync() : require('../config.js');

module.exports = {

 send: { //门店订单
   url: cf.config.configUrl + 'sms/send',
    get: {
      mobile: '?',
    
    }
  },
  login:{
    url: cf.config.configUrl + 'member/login',
    post: {
      mobile: '?',
      code: '?',
      gender: '?',
      gymId: '?',
      icon: '?',
      memberName: '?',
      openID: '?',

    }

  }
}