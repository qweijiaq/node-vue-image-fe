import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import appStore from './app.store';

export const appToolbarItemGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  let showPostListLayoutSwitcher = false;
  let showPostShowNavigator = false;
  let showSideSheetItem = false;

  switch (to.name) {
    case 'home':
    case 'postIndex':
    case 'postIndexPopular':
    case 'userPosts':
    case 'userDigged':
      showPostListLayoutSwitcher = true;
      break;
    case 'postShow':
      showPostShowNavigator = true;
      showSideSheetItem = true;
      break;
    case 'managePost':
      showSideSheetItem = true;
      break;
  }

  appStore.commit(
    'toolbar/setShowPostListLayoutSwitcher',
    showPostListLayoutSwitcher,
  );
  appStore.commit('toolbar/setShowPostShowNavigator', showPostShowNavigator);

  appStore.commit('toolbar/setShowSideSheetItem', showSideSheetItem);

  next();
};

/**
 *  身份验证守卫
 */
export const authGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  if (to.matched.some((record) => record.meta.requireAuth)) {
    if (!appStore.getters['auth/isLogin']) {
      appStore.dispatch('notification/pushMessage', {
        content: '请先登录',
      });

      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
};
