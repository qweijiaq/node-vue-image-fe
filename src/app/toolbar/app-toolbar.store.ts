import { Module } from 'vuex';
import { RootState } from '@/app/app.store';

export interface AppToolbarStoreState {
  showAdminItem: boolean;
  showSideSheetItem: boolean;
  showPostListLayoutSwitcher: boolean;
  showPostShowNavigator: boolean;
  showAppSearch: boolean;
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
    showAdminItem: false,
    showSideSheetItem: false,
    showPostListLayoutSwitcher: false,
    showPostShowNavigator: false,
    showAppSearch: false,
  } as AppToolbarStoreState,

  /**
   * 获取器
   */
  getters: {
    showAdminItem(state) {
      return state.showAdminItem;
    },

    showSideSheetItem(state) {
      return state.showSideSheetItem;
    },

    showPostListLayoutSwitcher(state) {
      return state.showPostListLayoutSwitcher;
    },

    showPostShowNavigator(state, _, rootState) {
      return state.showPostShowNavigator && rootState.post.index.posts.length;
    },

    showAppSearch(state) {
      return state.showAppSearch;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setShowAdminItem(state, data) {
      state.showAdminItem = data;
    },

    setShowSideSheetItem(state, data) {
      state.showSideSheetItem = data;
    },

    setShowPostListLayoutSwitcher(state, data) {
      state.showPostListLayoutSwitcher = data;
    },

    setShowPostShowNavigator(state, data) {
      state.showPostShowNavigator = data;
    },

    setShowAppSearch(state, data) {
      state.showAppSearch = data;
    },
  },

  /**
   * 动作
   */
  actions: {},
};
