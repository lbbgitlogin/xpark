var cfExt = wx.getExtConfigSync ? wx.getExtConfigSync() : require('../config.js');
var cf = cfExt.config ? wx.getExtConfigSync() : require('../config.js');

module.exports = {

  guide: { //优惠券
    url: cf.config.configUrl + 'using_guide/find/gym',
    get: {
  
    }
  }
}