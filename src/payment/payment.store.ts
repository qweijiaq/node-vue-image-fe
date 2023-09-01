import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { PaymentIndexStoreState, paymentIndexStoreModule } from '@/payment/index/payment-index.store';
import { PaymentSelectStoreState, paymentSelectStoreModule } from '@/payment/select/payment-select.store';

export interface PaymentStoreState {
  select: PaymentSelectStoreState,
  index: PaymentIndexStoreState,
  name: string;
}

export const paymentStoreModule: Module<PaymentStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    name: 'paymentStoreModule',
  } as PaymentStoreState,

  /**
   * 获取器
   */
  getters: {
   
  },

  /**
   * 修改器
   */
  mutations: {

  },

  /**
   * 动作
   */
  actions: {

  },

  /**
   * 模块
   */
  modules: {
    select: paymentSelectStoreModule,
    index: paymentIndexStoreModule,
  },
};
