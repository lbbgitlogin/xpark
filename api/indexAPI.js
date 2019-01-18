var cfExt = wx.getExtConfigSync ? wx.getExtConfigSync() : require('../config.js');
var cf = cfExt.config ? wx.getExtConfigSync() : require('../config.js');

module.exports = {

  province_city: { //获取门店列表 
    url: cf.config.configUrl + 'gym/find_province_city/list',
    post: {
      province: '?',//省
      city: '?',//市
      
    }
  },
  province: { //自助健身产品查询
  url: cf.config.configUrl + 'gym/find/province',
    get: {
     


    }
  },
  city: { //自助健身产品查询
    url: cf.config.configUrl + 'gym/find/city',
    get: {
      province:""


    }
  },



  classification: { //自助健身产品查询
    url: cf.config.configUrl + 'gym_fitness/list',
    get: {
      gymId: '?',
  

    }
  },
  categorylist: { //配套服务子分类产品查询
    url: cf.config.configUrl + 'goods_category/list',
    get: {
      areaId: '?',
      page: '?',
      size: '?',
      start: '?'
    }
  },

  ptitemlist: { //配套服务选择子菜单
    url: cf.config.configUrl + '/area/find/item',
    get: {
      gymId: '?',
      itemNo: 'SI-GOODS'
    }
  },
  fitnesslist: { //自助健身
    url: cf.config.configUrl + 'fitness/list',
    get: {
      page: '?',
      size: '?',
      start: '?'
    }
  },
  league_schedulelist: { //课程服务团课服务查询列表
    url: cf.config.configUrl + 'league_schedule/list_all',
    get: {
      gymId: '',
      scheduleDate: '?'
    }
  },
  coach_schedulelist: { //课程服务私课服务查询列表
    url: cf.config.configUrl + 'coach_schedule/list_all',
    get: {
      gymId: '',
      scheduleDate: '?'
    }
  },
  nearshop: { //课程服务私课服务查询列表
    url: cf.config.configUrl + 'gym/find_province_city/location',
    post: {
      province: '', //省
      city: '', //市
      latitude: '',
      longitude: '',

    }
  },
  xparkshop: { //获取门店信息
    url: cf.config.configUrl + 'gym/find',
    get: {
    
    }
  },
  member: { //查询会员卡
    url: cf.config.configUrl + 'member/find/member/vip',
    get: {

    }
  },
  memberinformation: { //查询会员卡
    url: cf.config.configUrl + 'member/find',
    get: {

    }
  },
  openid: { //获取openijd
    url: cf.config.configUrl + 'change/code/to/openid',
    get: {

    }
  },
  modify: { //获取openijd
    url: cf.config.configUrl + 'member/modify',
    put: {

    }
  }

}