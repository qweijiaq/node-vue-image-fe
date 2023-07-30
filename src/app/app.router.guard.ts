import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import appStore from './app.store';

export const appToolbarItemGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  let showPostListLayoutSwitcher = false;
  let showPostShowNavigator = false;

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
      break;
  }

  appStore.commit(
    'toolbar/setShowPostListLayoutSwitcher',
    showPostListLayoutSwitcher,
  );
  appStore.commit('toolbar/setShowPostShowNavigator', showPostShowNavigator);

  next();
};
