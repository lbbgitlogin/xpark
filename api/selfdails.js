var cfExt = wx.getExtConfigSync ? wx.getExtConfigSync() : require('../config.js');
var cf = cfExt.config ? wx.getExtConfigSync() : require('../config.js');

module.exports = {

  // 私教预约 
  coach_app: {
    url: cf.config.configUrl + 'coach_appointment/add',
  },
  gymdetails: { //门店订单
    url: cf.config.configUrl + '/gym_fitness/find',
    get: {
     id:''
    }
  },
  member_fitness: { //课程服务私课服务查询列表
    url: cf.config.configUrl + 'member_fitness/find',
    get: {
      areaId: '',
      memberId: ''
    }
  },
  yuenum: { //课程服务私课服务查询列表
    url: cf.config.configUrl + 'member/find/cash',
    get: {
      gymId: '',
      memberId: ''
    }
  },
  balancepay: { //余额支付
    url: cf.config.configUrl + 'member_order/order/self_service',
    get: {
      areaId:"",
      couponEntityId: "",
      gymId: "",
      gymName: "",
      memberId: "",
      memberMobile: "",
      memberName: "",
      orderGoods: [
        {
          numb: "",
          id: "",
          goodsId:"",
        }
      ],
      payType:"",
      remark:"",
    }
  },
 

  ground_appointment: { //预约确定
  url: cf.config.configUrl + 'ground_appointment/add',
    post: {
      appointmentDate: "",
      areaId: "",
      areaName: "",
      commonId: "",
      groundId: "",
      groundName: "",
      gymId: "",
      gymName: "",
      memberFitnessId: "",
      memberId: "",
      memberMobile: "",
      memberName: "",
      numb: "",
      remark: "",
    }
},
groundball: { //球类预约查询门店
  url: cf.config.configUrl + 'ground/find/area',
    get: {
      areaId: ''
  }
},
  appointment: { //门店订单
    url: cf.config.configUrl + 'ground_appointment/find/appointment',
    get: {
      areaId: '',
      groundId:'',
      appointmentDate:'',
    }
  },
  member_course: { //门店订单
    url: cf.config.configUrl + 'member_course/find',
    get: {
      courseId: '',
      courseType: '2',
      gymId: '',
      memberId: '',
    }
  },

  league_schedule: { //门店订单
    url: cf.config.configUrl + 'league_schedule/find',
    get: {
  
    }
},
  member_ordertk: { //门店订单
    url: cf.config.configUrl + 'member_order/order/leagule',
    post: {
      areaId: 0,
      couponEntityId: 0,
      gymId: 0,
      memberId: 0,
      memberMobile: "string",
      memberName: "string",
      orderGoods: [
        {
          numb: 0,
          goodsId: 0,
        }
      ],
      payType: "xj",
      remark: ""
    }
  },

  league_appointment: { //门店订单
    url: cf.config.configUrl + 'league_appointment/add',
    post: {
      memberCourseId:"",
      orderNo:"",
      memberId: 0,
      startTime:"",
      bookingDate: "",
      numb: "",
    }
  },
  coach_course: { //门店订单
    url: cf.config.configUrl + 'coach_course/find',
    post: {
   
    }
  },
  member_order: { //门店订单
    url: cf.config.configUrl + 'member_order/order/coach',
    post: {

    }
  },
  shopdetails: { //门店订单
    url: cf.config.configUrl + 'goods/find',
    get: {

    }
  },
  shopbuy: { //门店订单
    url: cf.config.configUrl + 'member_order/order/place',
    post: {

    }
  },

  addFromID: { //门店订单
    url: cf.config.configUrl + 'Template/addFromID',
    post: {
      formId:"",
    }
  }, 
appointment_common: { //取消订单
  url: cf.config.configUrl + 'appointment_common/cancel/state',
    put: {
    
    }
}, 

  coach_appointment: { //教练预约可预约时间
    url: cf.config.configUrl + 'coach_appointment/find/appointmentAll',
    get: {

    }
  },
  qxorder: { //教练预约可预约时间
    url: cf.config.configUrl + 'member_order/order/cancel',
    get: {

    }
  },
}