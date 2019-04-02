import Vue from 'vue'
import Router from 'vue-router'
import Home from './layout/Home.vue'
import App from './App.vue'

Vue.use(Router)


export const constantRouterMap = [
  {
    path: '',
    name: '首页',
    redirect: '/index',
    component: Home,
    children: [{
      path: '/index',
      component: () => import('@/views/index'),
      name : '系统首页',
      meta : {
        icon: 'fa fa-home',
        title: '系统首页'
      }
    }]
  },
  {
    path: '/login',
    hidden: true,
    component: () => import('./views/login')
  }

  
];

export const asyncRouterMap = [
  // {
  //   path: 'index',
  //   name: '系统首页',
  //   component: Home,
  //   children: [{
  //     path: 'index',
  //     component: () => import('@/views/index'),
  //     name : '系统首页',
  //     meta : {
  //       icon: 'fa fa-gamepad',
  //       title: '系统首页'
  //     }
  //   }]
  // },
  // {
  //   path: '',
  //   name: '系统首页',
  //   redirect: 'index',
  //   component: Home,
  //   children: [{
  //     path: 'index',
  //     component: () => import('@/views/index'),
  //     name : '系统首页',
  //     meta : {
  //       icon: 'fa fa-gamepad',
  //       title: '系统首页'
  //     }
  //   }]
  // },
  // {
  //   path: '/index',
  //   name: '系统首页',
  //   component:  import('/views/index'),
  //     meta : {
  //       icon: 'fa fa-gamepad',
  //       title: '系统首页'
  //     }
  // },
  
  {
    path: '/system',
    component: Home,
    hidden: false,
    name: '系统管理',
    meta: {
      title: '系统管理',
      icon: 'fa fa-cog'
    },
    children: [{
      path: 'limit',
      component: () => import('./views/system/Permission.vue'),
      name: '权限管理',
      meta: {
        title: '权限管理',
        icon: 'fa fa-folder-o'
      }
    },{
      path: 'operationDetail',
      component: () => import('./views/system/OperationDetail.vue'),
      name: '操作日志',
      meta: {
        
        title: '操作日志',
        icon: 'fa fa-id-badge'
      }
    },{
      path: '/EditionRelease',
      component: () => import('./views/system/systemManage/EditionRelease.vue'),
      name: '版本发布',
      meta: {
        title: '版本发布',
        icon: 'fa fa-id-badge'
      }
    },{
      path: '/otherSet',
      component: () => import('./views/system/otherSet.vue'),
      name: '其他设置',
      meta: {
        title: '其他设置',
        icon: 'fa fa-id-badge'
      }
    }]
  },
  {
    path: '/form',
    name: '订单管理',
    component: Home,
    alwaysShow: true,
    meta: {
      title: "订单管理",
      icon: "fa fa-laptop"
    },
    children: [
      {
        path: 'detail',
        name: '订单管理',
        component: () => import('./views/OrderDetail.vue'),
        meta: {
          title: '订单管理',
          icon: 'fa fa-laptop'
        }
      }
    ]
  },
  
  {
    path: '/member',
    component: Home,
    name: '会员管理',
    hidden: false,
    meta: {
      title: "会员管理",
      icon: "fa fa-user-o"
    },
    children : [
      {
        path: 'memberManage',
        hidden: false,
        component: () => import('./views/member/memberManage'),
        name: '会员管理',
        meta: {
          title: '会员管理',
          icon: 'fa fa-users'
        },
      },
      {
        path: 'memberDetail',
        hidden: true,
        component: () => import('./views/member/memberDetail/MemberDetail'),
        name: '会员详情',
        meta: {
          title: '会员详情',
          icon: 'fa fa-users'
        },
      },
      {
        path: 'lei',
        component: () => import('./views/member/memberLei'),
        name: '会员分类',
        meta: {
          title: '会员分类',
          icon: 'fa fa-users'
        },
      },
      
    ]
  },
  {
    path: '/operate',
    component: Home,
    name: '运营管理',
    hidden: false,
    meta: {
      title: "运营管理",
      icon: "fa fa-user-o"
    },
    children : [
      {
        path: '/banner',
        component: () => import('./views/operate/bannerManage'),
        name: 'banner管理',
        meta: {
          title: 'banner管理',
          icon: 'fa fa-users'
        },
    },
    {
      path: '/article',
      component: () => import('./views/operate/articleManage'),
      name: '文章管理',
      meta: {
        title: '文章管理',
        icon: 'fa fa-users'
      },
    
    },
    {
      path: '/articleAdd',
      component: () => import('./views/operate/addArticle'),
      name: '文章添加',
      hidden: true,
      meta: {
        title: '文章添加',
        icon: 'fa fa-users'
      },
    
    }, {
      path: '/articleShenhe',
      component: () => import('./views/operate/articleShenhe'),
      name: '审核文章',
      hidden: true,
      meta: {
        title: '审核文章',
        icon: 'fa fa-users'
      },
    },
      {
        path: '/articleLook',
        component: () => import('./views/operate/lookArticle'),
        name: '查看文章',
        hidden: true,
        meta: {
          title: '查看文章',
          icon: 'fa fa-users'
        },
    
    },{
      path: '/articleEdit',
      component: () => import('./views/operate/editArticle'),
      name: '文章编辑',
      hidden: true,
      meta: {
        title: '文章编辑',
        icon: 'fa fa-users'
      },
    
    },
    {
      path: '/activity',
      component: () => import('./views/operate/activityManage'),
      name: '活动管理',
      meta: {
        title: '活动管理',
        icon: 'fa fa-users'
      },
    },
    {
      path: '/user',
      component: () => import('./views/operate/userFeedback'),
      name: '用户反馈',
      meta: {
        title: '用户反馈',
        icon: 'fa fa-users'
      },
      
    },
    {
      path: '/business',
      component: () => import('./views/operate/BusinessCooperation'),
      name: '商务合作',
      meta: {
        title: '商务合作',
        icon: 'fa fa-users'
      },
      
    },
    {
      path: '/discount',
      component: () => import('./views/operate/DiscountManage'),
      name: '优惠券管理',
      meta: {
        title: '优惠券管理',
        icon: 'fa fa-users'
      },
      
    },
    {
      path: '/gener',
            component: () => import('./views/operate/generOrder'),
            name : '生成记录',
            hidden: true,
            meta : {
              icon: 'fa fa-gamepad',
              title: '生成记录'
            }
      
    },
    {
      path: '/redcode',
      component: () => import('./views/operate/RedCodeManage'),
      name: '兑换码管理',
      meta: {
        title: '兑换码管理',
        icon: 'fa fa-users'
      },
    },
    {
      path: '/changeCode',
      component: () => import('./views/operate/changeCodeManage'),
      name: '兑换记录',
      hidden: true,
      meta: {
        title: '兑换记录',
        icon: 'fa fa-users'
      },
    },
    {
      path: '/adverment',
      component: () => import('./views/operate/advermentManage'),
      name: '广告管理',
      meta: {
        title: '广告管理',
        icon: 'fa fa-users'
      },
    },
     
    ]
  },
  // {
  //   path: '/statistical',
  //   component: Home,
  //   name: '统计分析',
  //   hidden: false,
  //   meta: {
  //     title: "统计分析",
  //     icon: "fa fa-user-o"
  //   },
  //   children : [
  //     {
  //       path: '/userStatistical',
  //       component: () => import('./views/statistical/userStatistical'),
  //       name: '用户统计',
  //       meta: {
  //         title: '用户统计',
  //         icon: 'fa fa-users'
  //       },
  //   },
  //   {
  //     path: '/orderStatistical',
  //     component: () => import('./views/statistical/orderStatistical'),
  //     name: '订单统计',
  //     meta: {
  //       title: '订单统计',
  //       icon: 'fa fa-users'
  //     },
    
  //   },
  //   {
  //     path: '/activityStatistical',
  //     component: () => import('./views/statistical/activityStatistical'),
  //     name: '活动统计',
  //     meta: {
  //       title: '活动统计',
  //       icon: 'fa fa-users'
  //     },
  //   },
  //   {
  //     path: '/downStatistical',
  //     component: () => import('./views/statistical/downStatistical'),
  //     name: '下载安装统计',
  //     meta: {
  //       title: '下载安装统计',
  //       icon: 'fa fa-users'
  //     },
      
  //   },
  //   {
  //     path: '/undownStatistical',
  //     component: () => import('./views/statistical/undownStatistical'),
  //     name: '卸载统计',
  //     meta: {
  //       title: '卸载统计',
  //       icon: 'fa fa-users'
  //     },
      
  //   },
  //   {
  //     path: '/onlineStatistical',
  //     component: () => import('./views/statistical/onlineStatistical'),
  //     name: '在线统计',
  //     meta: {
  //       title: '在线统计',
  //       icon: 'fa fa-users'
  //     },
      
  //   },
  //   {
  //     path: '/userDistribution',
  //     component: () => import('./views/statistical/userDistribution'),
  //     name: '用户分布',
  //     meta: {
  //       title: '用户分布',
  //       icon: 'fa fa-users'
  //     },
     
  //   },
  //   {
  //     path: '/flowStatistical',
  //     component: () => import('./views/statistical/flowStatistical'),
  //     name: '官网流量统计',
  //     meta: {
  //       title: '官网流量统计',
  //       icon: 'fa fa-users'
  //     },
     
  //   },
     
  //   ]
  // },
  {
    path: '/goods',
    name: '商品管理',
    component: Home,
    alwaysShow: true,
    meta: {
      title: "商品管理",
      icon: "fa fa-user-o"
    },
    children: [{
      path: 'goodsManage',
      component: () => import('./views/goods/goodsManage'),
      name : '商品管理',
      meta : {
        icon: 'fa fa-gamepad',
        title: '商品管理'
      }
    }]
  },
  {
    path: '/gameManage',
    name: '游戏管理',
    component: Home,
    alwaysShow: true,
    meta: {
      title: "游戏管理",
      icon: "fa fa-user-o"
    },
    children: [{
      path: 'gameManage',
      component: () => import('./views/gameManage/gameManage'),
      name : '游戏管理',
      meta : {
        icon: 'fa fa-gamepad',
        title: '游戏管理'
      }
    },
    {
      path: 'gameClassify',
      component: () => import('./views/gameManage/gameClassify'),
      name : '游戏分类',
      meta : {
        icon: 'fa fa-gamepad',
        title: '游戏分类'
      },
   
    },{
        path: 'classify',
        name: '二级分类',
        hidden: true,
        component: () => import('./views/gameManage/secondClassify'),
        meta: {
          title: '二级分类',
          icon: 'fa fa-laptop'
        }
      }
  ]
  },




  {
    path: '*',
    redirect: '/404',
    hidden: true
  },
  
  // {
  //   path: '/game',
  //   name: '游戏管理详情',
  //   component: Home,
  //   children: [{
  //     path: 'index',
  //     component: () => import('@/views/GameManager'),
  //     name : '游戏管理',
  //     meta : {
  //       icon: 'fa fa-gamepad',
  //       title: '游戏管理'
  //     }
  //   }]
  // }

]

const routes = [...asyncRouterMap,...constantRouterMap];

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})
export default router;
