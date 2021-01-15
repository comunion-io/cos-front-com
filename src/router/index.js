import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';
import permissions from './permission';
import request from './request';
import title from './title';

Vue.use(VueRouter);
require('nprogress/nprogress.css');

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: 'basic-layout' */ '@/layouts/BasicLayout.vue'),
    children: [
      {
        path: '/',
        name: 'square',
        meta: {
          title: 'Home',
          skipAuth: true
        },
        component: () => import(/* webpackChunkName: 'square' */ '@/views/square/List.vue')
      },
      {
        path: '/bounty',
        name: 'bounty',
        meta: {
          title: 'Bounty',
          skipAuth: true
        },
        component: () => import(/* webpackChunkName: 'bounty' */ '@/views/bounty/List.vue')
      },
      // new bounty
      {
        path: '/bounty/new',
        name: 'newBounty',
        meta: {
          title: 'New Bounty',
          skipAuth: false
        },
        component: () => import(/* webpackChunkName: 'bounty' */ '@/views/bounty/NewBounty.vue')
      },
      // bounty detail
      {
        path: '/bounty/detail/:id',
        name: 'bountyDetail',
        meta: {
          title: 'Bounty Detail',
          skipAuth: true
        },
        component: () => import(/* webpackChunkName: 'bounty' */ '@/views/bounty/BountyDetail.vue')
      },
      {
        path: '/disco',
        name: 'disco',
        meta: {
          title: 'DISCO',
          skipAuth: true
        },
        component: () => import(/* webpackChunkName: 'disco' */ '@/views/disco/Disco.vue')
      },
      {
        path: '/exchange',
        name: 'exchange',
        meta: {
          title: 'Exchange',
          skipAuth: true
        },
        component: () => import(/* webpackChunkName: 'exchange' */ '@/views/exchange/List.vue')
      },
      {
        path: '/governance',
        name: 'governance',
        meta: {
          title: 'Governance',
          skipAuth: true
        },
        component: () => import(/* webpackChunkName: 'governance' */ '@/views/governance/List.vue')
      },
      {
        path: '/startup/:id',
        name: 'startupDetail',
        meta: {
          title: 'Start-Up Detail',
          skipAuth: true
        },
        component: () =>
          import(/* webpackChunkName: 'startupDetail' */ '@/views/startup/Detail.vue')
      },
      // 'startupManagement'
      {
        path: '/startup/:id/management',
        name: 'startupManagement',
        meta: {
          title: 'Start-Up Management',
          skipAuth: false
        },
        redirect: '/startup/:id/management/perference',
        component: () =>
          import(
            /* webpackChunkName: 'startManagement' */ '@/views/startup-management/StartupManagement.vue'
          ),
        children: ['perference', 'settings', 'bounty', 'team', 'operation', 'DISCOSwap'].map(
          key => {
            const upCaseName = key[0].toUpperCase() + key.slice(1);
            let route = {
              path: key,
              name: `startupManagement${upCaseName}`,
              meta: {
                title: `Start-Up Management ${upCaseName}`,
                breadcrumb: upCaseName, // 面包屑
                skipAuth: false
              },
              component: () =>
                import(
                  /* webpackChunkName: 'startManagement' */ `@/views/startup-management/tabs/Tab${upCaseName}.vue`
                )
            };
            if (key === 'DISCOSwap') {
              route.children = [
                {
                  path: 'discoForm',
                  name: 'startupManagementDiscoForm',
                  meta: {
                    title: 'Start-Up Management DISCO',
                    breadcrumb: 'DISCO',
                    skipAuth: false
                  },
                  component: () =>
                    import(
                      /* webpackChunkName: 'startManagement' */ `@/views/startup-management/tabs/DISCOSwap/CreateContract.vue`
                    )
                },
                {
                  path: 'discoDetail',
                  name: 'startupManagementDiscoDetail',
                  meta: {
                    title: 'Start-Up Management DISCO Detail',
                    breadcrumb: 'DISCO',
                    skipAuth: false
                  },
                  component: () =>
                    import(
                      /* webpackChunkName: 'startManagement' */ `@/views/startup-management/tabs/DISCOSwap/DISCODetail.vue`
                    )
                },
                {
                  path: 'createExchange',
                  name: 'startupManagementCreateExchange',
                  meta: {
                    title: 'Start-Up Management Create Exchange',
                    breadcrumb: 'Create Exchange',
                    skipAuth: false
                  },
                  component: () =>
                    import(
                      /* webpackChunkName: 'startManagement' */ `@/views/startup-management/tabs/DISCOSwap/CreateExchange.vue`
                    )
                }
              ];
            }
            return route;
          }
        )
      },
      {
        path: '/startup/new',
        name: 'newStartup',
        meta: {
          title: 'New Start-Up',
          skipAuth: false
        },
        component: () => import(/* webpackChunkName: 'newStartup' */ '@/views/startup/New.vue')
      },
      {
        path: '/startup/setting',
        name: 'startupSetting',
        meta: {
          title: 'Setting Start-Up'
        },
        component: () =>
          import(/* webpackChunkName: 'newStartup' */ '@/views/startup/SettingList.vue')
      },
      {
        path: '/startup/setting/:id',
        name: 'startupSettingDetail',
        meta: {
          title: 'Start-Up Setting'
        },
        component: () =>
          import(/* webpackChunkName: 'startupSetting' */ '@/views/startup/SettingDetail.vue')
      },
      // welcome 页面， 未登录metamas情况下，点击new startup 进入欢迎页
      {
        path: '/welcome',
        name: 'welcome',
        meta: {
          title: 'welcome'
        },
        component: () =>
          import(/* webpackChunkName: 'startupSetting' */ '@/views/welcome/Welcome.vue')
      },
      //  hunter manage
      {
        path: '/hunter/manage',
        name: 'hunterManage',
        meta: {
          title: 'Hunter Management'
        },
        component: () =>
          import(/* webpackChunkName: 'hunterManage' */ '@/views/hunter-manage/HunterManage')
      },
      // Transform Hunter
      {
        path: '/hunter/transform',
        name: 'transformHunter',
        meta: {
          title: 'TransformHunter',
          skipAuth: false
        },
        component: () =>
          import(/* webpackChunkName: 'hunter' */ '@/views/hunter/TransformHunter.vue')
      },
      // hunter的bounty主页
      {
        path: '/hunter/bounty-home/:userId',
        name: 'bountyHome',
        meta: {
          title: 'BountyHome',
          skipAuth: true
        },
        component: () =>
          import(/* webpackChunkName: 'bountyHome' */ '@/views/hunter/BountyHome.vue')
      }
    ]
  },
  // 蓝色背景布局
  {
    path: '/b',
    component: () => import(/* webpackChunkName: 'welcome' */ '@/layouts/BlueLayout.vue'),
    children: [
      {
        path: 'guide',
        name: 'guide',
        meta: {
          title: 'Guide',
          skipAuth: true
        },
        component: () => import(/* webpackChunkName: 'guide' */ '@/views/guide/Guide.vue')
      }
    ]
  },
  {
    path: '*',
    component: {
      render: h => h('div', '404')
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({
    y: 0
  }),
  linkActiveClass: 'active',
  routes
});

// 路由回调注入
const routerInjections = {
  before: [permissions.before, request.before],
  after: [title.after]
};

// 页面跳转前
router.beforeEach((to, from, next) => {
  let passed = true;
  for (const func of routerInjections.before) {
    func(to, from, (...args) => {
      if (args) {
        passed = false;
        NProgress.start();
        next(...args);
      }
    });
    if (!passed) {
      break;
    }
  }
  if (passed) {
    NProgress.start();
    next();
  }
});

// 页面跳转后
router.afterEach((to, from) => {
  for (const func of routerInjections.after) {
    func(to, from);
  }
  NProgress.done();
});

export default router;
