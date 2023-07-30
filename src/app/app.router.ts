import { createRouter, createWebHistory } from 'vue-router';
import appRoutes from './app.routes';
import postRoutes from '@/post/post.routes';
import authRoutes from '@/auth/auth.routes';
import userRoutes from '@/user/user.routes';
import { appToolbarItemGuard } from './app.router.guard';

/**
 * 创建路由器
 */
const router = createRouter({
  history: createWebHistory(),
  routes: [...appRoutes, ...postRoutes, ...authRoutes, ...userRoutes],
});

// 使用路由守卫
router.beforeEach(appToolbarItemGuard);

// 变量所有页面标题
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
  next();
});
/**
 * 默认导出
 */
export default router;
