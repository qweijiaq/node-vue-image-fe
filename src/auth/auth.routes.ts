import { RouteRecordRaw } from 'vue-router';
import AuthLogin from './login/auth-login.vue';

/**
 * 定义路由
 */
const routes: Array<RouteRecordRaw> = [
  {
    name: 'login',
    path: '/login',
    component: AuthLogin,
    props: true,
    meta: {
      title: '拾光者 | 用户登录',
    },
  },
];

/**
 * 默认导出
 */
export default routes;
