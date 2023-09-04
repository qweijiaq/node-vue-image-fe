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
    meta: {
      requireAuth: true,
    },
    children: [
      {
        name: 'managePost',
        path: 'post',
        meta: {
          title: '拾光者 | 作品管理',
        },
        component: () => import('./post/manage-post.vue'),
      },
    ],
  },
];

/**
 * 默认导出
 */
export default routes;
