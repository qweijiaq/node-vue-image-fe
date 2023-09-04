import { RouteRecordRaw } from 'vue-router';
import Dashboard from './dashboard.vue';

/**
 * 定义路由
 */
const routes: Array<RouteRecordRaw> = [
  {
    name: 'dashboard',
    path: '/dashboard',
    component: Dashboard,
    props: true,
    children: [
      {
        name: 'dashboardAccessCount',
        path: '',
        meta: {
          title: '拾光者 | 仪表盘',
        },
        component: () => import('./access-count/dashboard-access-count.vue'),
      },
    ],
  },
];

/**
 * 默认导出
 */
export default routes;
