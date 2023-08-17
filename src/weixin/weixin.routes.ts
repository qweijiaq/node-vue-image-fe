import { RouteRecordRaw } from 'vue-router';
import WeixinLogin from './login/weixin-login.vue';

/**
 * 定义路由
 */
const routes: Array<RouteRecordRaw> = [
  {
    name: 'weixinLogin',
    path: '/weixin-login',
    component: WeixinLogin,
    props: true,
  },
];

/**
 * 默认导出
 */
export default routes;
