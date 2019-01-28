var cfExt = wx.getExtConfigSync ? wx.getExtConfigSync() : require('../config.js');
var cf = cfExt.config ? wx.getExtConfigSync() : require('../config.js');

module.exports = {

  couponlist: { //优惠券
    url: cf.config.configUrl + 'coupon_entity/find/member',
    get: {
      memberId: '?',
    }
  },
  exchange: { //优惠券
    url: cf.config.configUrl + 'coupon_entity/exchange',
    post: {
      memberId: '?',
      gymId: '?',
      redeemCode: '?'
    }
  },
  coupon_entity: { //查询有效优惠券
    url: cf.config.configUrl + 'coupon_entity/find/member/effective',
    post: {
      memberId: '?',
      gymId: '?'
    }
  }
}