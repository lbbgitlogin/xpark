var cfExt = wx.getExtConfigSync ? wx.getExtConfigSync() : require('../config.js');
var cf = cfExt.config ? wx.getExtConfigSync() : require('../config.js');

module.exports = {

  qrCode: { //优惠券
    url: cf.config.configUrl + 'member/generate/qrCode',
    get: {
      memberId: '?',
    }
  }
}