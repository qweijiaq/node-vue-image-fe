import { Module } from 'vuex';
import { RootState } from '@/app/app.store';

export interface AppToolbarStoreState {
  showSideSheetItem: boolean;
  showPostListLayoutSwitcher: boolean;
  showPostShowNavigator: boolean;
}

export const appToolbarStoreModule: Module<AppToolbarStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    showSideSheetItem: false,
    showPostListLayoutSwitcher: false,
    showPostShowNavigator: false,
  } as AppToolbarStoreState,

  /**
   * 获取器
   */
  getters: {
    showSideSheetItem(state) {
      return state.showSideSheetItem;
    },

    showPostListLayoutSwitcher(state) {
      return state.showPostListLayoutSwitcher;
    },

    showPostShowNavigator(state, _, rootState) {
      return state.showPostShowNavigator && rootState.post.index.posts.length;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setShowSideSheetItem(state, data) {
      state.showSideSheetItem = data;
    },

    setShowPostListLayoutSwitcher(state, data) {
      state.showPostListLayoutSwitcher = data;
    },

    setShowPostShowNavigator(state, data) {
      state.showPostShowNavigator = data;
    },
  },

  /**
   * 动作
   */
  actions: {},
};
