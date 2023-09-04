import { RouteRecordRaw } from 'vue-router';
import UserShow from './show/user-show.vue';

/**
 * 定义路由
 */
const routes: Array<RouteRecordRaw> = [
  {
    name: 'userShow',
    path: '/users/:userId',
    meta: {
      title: '拾光者 | 用户',
    },
    component: UserShow,
    props: true,
    children: [
      {
        name: 'userPosts',
        path: '',
        meta: {
          title: '拾光者 | 发布作品',
        },
        component: () => import('../user/show/components/user-posts.vue'),
        props: (route) => {
          return {
            sort: 'latest',
            filter: {
              user: route.params.userId,
              action: 'published',
            },
          };
        },
      },
      {
        name: 'userDigged',
        path: 'digged',
        meta: {
          title: '拾光者 | 点赞作品',
        },
        component: () => import('../user/show/components/user-digged.vue'),
        props: (route) => {
          return {
            sort: 'latest',
            filter: {
              user: route.params.userId,
              action: 'digged',
            },
          };
        },
      },
      {
        name: 'userComments',
        path: 'comments',
        meta: {
          title: '拾光者 | 评论作品',
        },
        component: () => import('../user/show/components/user-comments.vue'),
        props: (route) => {
          return {
            filter: { user: route.params.userId, action: 'published' },
          };
        },
      },
      {
        name: 'userReplies',
        path: 'replies',
        meta: {
          title: '拾光者 | 回复作品',
        },
        component: () => import('../user/show/components/user-replies.vue'),
        props: (route) => {
          return {
            filter: { user: route.params.userId, action: 'replied' },
          };
        },
      },
      {
        name: 'userAccount',
        path: 'account',
        meta: {
          title: '拾光者 | 个人账户',
        },
        component: () => import('../user/account/user-account.vue'),
      },
    ],
  },
  {
    name: 'userCreate',
    path: '/register',
    meta: {
      title: '拾光者 | 注册用户',
    },
    component: () => import('./create/user-create.vue'),
  },
];

/**
 * 默认导出
 */
export default routes;
