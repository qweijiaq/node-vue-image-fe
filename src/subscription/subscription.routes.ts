import { RouteRecordRaw } from 'vue-router';
import Subscription from './subscription.vue';

/**
 * 定义路由
 */
const routes: Array<RouteRecordRaw> = [
  {
    name: 'subscription',
    path: '/subscription',
    component: Subscription,
    props: true,
  },
];

/**
 * 默认导出
 */
export default routes;
