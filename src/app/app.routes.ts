import { RouteRecordRaw } from 'vue-router';
import AppHome from './components/app-home.vue';

/**
 * 定义路由
 */
const routes: Array<RouteRecordRaw> = [
  {
    name: 'home',
    path: '/',
    component: AppHome,
    meta: {
      title: 'GopherImage | 照片分享平台',
    },
    props: (route) => {
      return {
        sort: 'latest',
        filter: route.query,
      };
    },
  },
];

/**
 * 默认导出
 */
export default routes;
