import { RouteRecordRaw } from 'vue-router';
import PostIndex from './index/post-index.vue';
import PostShow from './show/post-show.vue';
import PostCreate from './create/post-create.vue';

/**
 * 定义路由
 */
const routes: Array<RouteRecordRaw> = [
  {
    name: 'postIndex',
    path: '/posts',
    component: PostIndex,
    props: (route) => {
      return {
        sort: 'latest',
        filter: route.query,
      };
    },
  },
  {
    name: 'postShow',
    path: '/posts/:postId',
    component: PostShow,
    props: true,
  },
  {
    name: 'postIndexPopular',
    path: '/popular',
    meta: {
      title: 'GopherImage | 热门',
    },
    component: PostIndex,
    props: (route) => {
      return {
        sort: 'most_comments',
        filter: route.query,
      };
    },
  },
  {
    name: 'postCreate',
    path: '/create',
    component: PostCreate,
  },
];

/**
 * 默认导出
 */
export default routes;
