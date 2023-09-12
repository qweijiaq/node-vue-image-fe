import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '../app/app.service';
import {
  authLoginStoreModule,
  AuthLoginStoreState,
} from './login/auth-login.store';

export interface AuthStoreState {
  login: AuthLoginStoreState;
  token: string | null;
}

export const authStoreModule: Module<AuthStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    token: null,
  } as AuthStoreState,

  /**
   * 获取器
   */
  getters: {
    // 是否登录
    isLogin(state) {
      return state.token ? true : false;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setToken(state, data) {
      state.token = data;
    },
  },

  /**
   * 动作
   */
  actions: {
    // 将 bearer token 设置在头部
    configApiHttpClientAuthHeader(_, data) {
      apiHttpClient.defaults.headers.common['Authorization'] = `Bearer ${data}`;
    },

    // 退出登录
    logout({ commit }) {
      commit('setToken', null);
      commit('user/setCurrentUser', null, {
        root: true,
      });
      commit('auth/login/setLoginResponseData', null, { root: true });
      apiHttpClient.defaults.headers.common['Authorization'] = null;
    },
  },

  modules: {
    login: authLoginStoreModule,
  },
};
