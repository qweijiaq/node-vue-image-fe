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
      title: 'GopherImage | 用户',
    },
    component: UserShow,
    props: true,
    children: [
      {
        name: 'userPosts',
        path: '',
        meta: {
          title: 'GopherImage | 发布作品',
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
          title: 'GopherImage | 点赞作品',
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
          title: 'GopherImage | 评论作品',
        },
        component: () => import('../user/show/components/user-comments.vue'),
      },
      {
        name: 'userReplies',
        path: 'replies',
        meta: {
          title: 'GopherImage | 回复作品',
        },
        component: () => import('../user/show/components/user-replies.vue'),
      },
      {
        name: 'userAccount',
        path: 'account',
        meta: {
          title: 'GopherImage | 个人账户',
        },
        component: () => import('../user/account/user-account.vue'),
      },
    ],
  },
];

/**
 * 默认导出
 */
export default routes;
