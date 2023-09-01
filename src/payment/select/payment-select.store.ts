import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { Payment } from '../index/payment-index.store';

export interface PaymentSelectStoreState {
  selectedPaymentName: string;
  name: string;
}

export const paymentSelectStoreModule: Module<
  PaymentSelectStoreState,
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
    selectedPaymentName: '',
    name: 'paymentSelectStoreModule',
  } as PaymentSelectStoreState,

  /**
   * 获取器
   */
  getters: {
    selectedPaymentName(state, getters, rootState, rootGetters) {
      const payments = rootGetters['payment/index/payments'];
      return state.selectedPaymentName
        ? state.selectedPaymentName
        : payments[0].name;
    },

    selectedPayment(state, getters, rootState, rootGetters) {
      const payments = rootGetters['payment/index/payments'] as Array<Payment>;
      return payments.find(
        (payment) => payment.name === getters.selectedPaymentName,
      );
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setSelectedPaymentName(state, data) {
      state.selectedPaymentName = data;
    },
  },

  /**
   * 动作
   */
  actions: {},

  /**
   * 模块
   */
  modules: {},
};
