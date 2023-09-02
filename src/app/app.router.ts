import { createRouter, createWebHistory } from 'vue-router';
import appRoutes from './app.routes';
import postRoutes from '@/post/post.routes';
import authRoutes from '@/auth/auth.routes';
import userRoutes from '@/user/user.routes';
import manageRoutes from '@/manage/manage.routes';
import dashboardRoutes from '@/dashboard/dashboard.routes';
import weixinRoutes from '@/weixin/weixin.routes';
import subscriptionRoutes from '@/subscription/subscription.routes';
import { appToolbarItemGuard, authGuard } from './app.router.guard';

/**
 * 创建路由器
 */
const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...appRoutes,
    ...postRoutes,
    ...authRoutes,
    ...userRoutes,
    ...manageRoutes,
    ...dashboardRoutes,
    ...weixinRoutes,
    ...subscriptionRoutes,
  ],
});

// 工具栏项目守卫
router.beforeEach(appToolbarItemGuard);

// 变量所有页面标题
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
  next();
});

// 身份验证守卫
router.beforeEach(authGuard);

export default router;
