import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';

export interface LoginResponseData {
  id: number;
  name: string;
  token: string;
}

export interface AuthLoginStoreState {
  loading: boolean;
  loginResponseData: LoginResponseData | null;
}

export const authLoginStoreModule: Module<AuthLoginStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    loading: false,
    loginResponseData: null,
  } as AuthLoginStoreState,

  /**
   * 获取器
   */
  getters: {
    loading(state) {
      return state.loading;
    },

    loginResponseData(state) {
      return state.loginResponseData;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setLoading(state, data) {
      state.loading = data;
    },

    setLoginResponseData(state, data) {
      state.loginResponseData = data;
    },
  },

  /**
   * 动作
   */
  actions: {
    async login({ commit, dispatch }, data) {
      commit('setLoading', true);

      try {
        const response = await apiHttpClient.post('/login', data);
        commit('setLoginResponseData', response.data);
        commit('setLoading', false);
        commit('auth/setToken', response.data.token, { root: true });
        dispatch('auth/configApiHttpClientAuthHeader', response.data.token, {
          root: true,
        });

        dispatch('user/getCurrentUser', response.data.id, { root: true });

        return response;
      } catch (error: any) {
        commit('setLoading', false);

        throw error.response;
      }
    },
  },
};
