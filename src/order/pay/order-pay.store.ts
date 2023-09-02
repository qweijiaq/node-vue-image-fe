import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';

export interface PrePay {
  codeUrl?: string;
  payment?: string;
  offsiteUrl?: string;
}

export interface OrderPayStoreState {
  loading: boolean;
  prePay: PrePay | null;
}

export const orderPayStoreModule: Module<OrderPayStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    loading: false,
    prePay: null,
  } as OrderPayStoreState,

  /**
   * 获取器
   */
  getters: {
    loading(state) {
      return state.loading;
    },

    prePay(state) {
      return state.prePay;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setLoading(state, data) {
      state.loading = data;
    },

    setPrepay(state, data) {
      state.prePay = data;
    },
  },

  /**
   * 动作
   */
  actions: {
    async payOrder({ commit }, orderId: number) {
      commit('setLoading', true);

      try {
        const response = await apiHttpClient.post(`orders/${orderId}/pay`);

        commit('setPrepay', response.data);
        commit('setLoading', false);

        return response;
      } catch (error) {
        commit('setLoading', false);
        const _error = error as any;

        if (_error.response) {
          throw _error.response;
        }
      }
    },
  },

  /**
   * 模块
   */
  modules: {},
};
