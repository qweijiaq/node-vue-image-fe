import { Module } from 'vuex';
import { RootState } from '@/app/app.store';

export interface LayoutStoreState {
  // 是否展示侧板（点击侧板按钮实现）
  isSideSheetActive: boolean;
  // 侧板是否滚动触底
  sideSheetTouchdown: boolean;
  // 主题色
  theme: string;
  // 侧板展示的组件类型
  sideSheetComponent: string;
  // 侧板传入的属性
  // eslint-disable-next-line
  sideSheetProps: any;
}

export const layoutStoreModule: Module<LayoutStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    isSideSheetActive: false,
    sideSheetTouchdown: false,
    theme: 'light',
    sideSheetComponent: '',
    sideSheetProps: null,
  } as LayoutStoreState,

  /**
   * 获取器
   */
  getters: {
    isSideSheetActive(state) {
      return state.isSideSheetActive;
    },

    sideSheetTouchdown(state) {
      return state.sideSheetTouchdown;
    },

    theme(state) {
      return state.theme;
    },

    sideSheetComponent(state) {
      return state.sideSheetComponent;
    },

    sideSheetProps(state) {
      return state.sideSheetProps;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setIsSideSheetActive(state, data) {
      state.isSideSheetActive = data;
    },

    setSideSheetTouchdown(state, data) {
      state.sideSheetTouchdown = data;
    },

    setTheme(state, data) {
      state.theme = data;
    },

    setSideSheetComponent(state, data) {
      state.sideSheetComponent = data;
    },

    resetSideSheetComponent(state) {
      state.sideSheetComponent = '';
      state.sideSheetProps = null;
    },

    setSideSheetProps(state, data) {
      state.sideSheetProps = data;
    },
  },

  /**
   * 动作
   */
  actions: {
    // 切换侧板是否展示（点击侧板按钮实现）
    switchSideSheet({ commit, state }) {
      commit('setIsSideSheetActive', !state.isSideSheetActive);
    },

    // 关闭侧板
    closeSideSheet({ commit }) {
      commit('setIsSideSheetActive', false);
    },

    // 打开侧板
    openSideSheet({ commit }) {
      commit('setIsSideSheetActive', true);
    },
  },
};
