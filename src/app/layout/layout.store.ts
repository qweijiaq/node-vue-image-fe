import { Module } from 'vuex';
import { RootState } from '@/app/app.store';

export interface LayoutStoreState {
  isSideSheetActive: boolean;
  sideSheetTouchdown: boolean;
  theme: string;
  sideSheetComponent: string;
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
    switchSideSheet({ commit, state }) {
      commit('setIsSideSheetActive', !state.isSideSheetActive);
    },

    closeSideSheet({ commit }) {
      commit('setIsSideSheetActive', false);
    },

    openSideSheet({ commit }) {
      commit('setIsSideSheetActive', true);
    },
  },
};
