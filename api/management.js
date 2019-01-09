var cfExt = wx.getExtConfigSync ? wx.getExtConfigSync() : require('../config.js');
var cf = cfExt.config ? wx.getExtConfigSync() : require('../config.js');

module.exports = {

  member_orderlist: { //门店订单
    url: cf.config.configUrl + 'member_order/list',
    get: {
      memberId: '?',
      orderState: '?',
      page: '?',
      size: '?',
      start: '?',
    }
  }
}