import { RouteRecordRaw } from 'vue-router';

/**
 * 定义路由
 */
const routes: Array<RouteRecordRaw> = [
  {
    name: 'manage',
    path: '/manage',
    component: () => import('./manage.vue'),
    props: true,
    children: [
      {
        name: 'managePost',
        path: 'post',
        component: () => import('./post/manage-post.vue'),
      },
    ],
  },
];

/**
 * 默认导出
 */
export default routes;
