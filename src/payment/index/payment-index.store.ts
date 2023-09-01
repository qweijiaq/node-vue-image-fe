import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';

export interface Payment {
  id?: number;
  name?: string;
  description?: string;
  index?: string;
  meta?: PaymentMethodData;
  status?: string;
}

export interface PaymentMeta {
  buttonText?: string;
  canOffsite?: boolean;
  color?: string;
}

export interface PaymentIndexStoreState {
  loading: boolean;
  payments: Array<Payment>;
}

export interface GetPaymentsOptions {
  data?: null;
}

export const paymentIndexStoreModule: Module<
  PaymentIndexStoreState,
  RootState
> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    loading: false,
    payments: [],
  } as PaymentIndexStoreState,

  /**
   * 获取器
   */
  getters: {
    loading(state) {
      return state.loading;
    },

    payments(state) {
      return state.payments;
    },

    hasPayments(state) {
      return state.payments.length ? true : false;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setLoading(state, data) {
      state.loading = data;
    },

    setPayments(state, data) {
      state.payments = data;
    },
  },

  /**
   * 动作
   */
  actions: {
    async getPayments({ commit }, options: GetPaymentsOptions = {}) {
      commit('setLoading', true);

      try {
        const response = await apiHttpClient.get(`payments`);

        commit('setPayments', response.data);
        commit('setLoading', false);

        return response;
      } catch (error) {
        commit('setLoading', false);

        throw error.response;
      }
    },
  },
};
