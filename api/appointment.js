var cfExt = wx.getExtConfigSync ? wx.getExtConfigSync() : require('../config.js');
var cf = cfExt.config ? wx.getExtConfigSync() : require('../config.js');

module.exports = {

 appointmentlist: { //我的预约
    url: cf.config.configUrl + 'appointment_common/list',
    get: {
      memberId: '?',
      state: '?',
      page: '?',
      size: '?',
      start: '?',
    }
  }
}