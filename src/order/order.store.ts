import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { OrderCreateStoreState, orderCreateStoreModule } from '@/order/create/order-create.store';
import { OrderPayStoreState, orderPayStoreModule } from '@/order/pay/order-pay.store';

export interface OrderStoreState {
  pay: OrderPayStoreState,
  create: OrderCreateStoreState,
  name: string;
}

export const orderStoreModule: Module<OrderStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    name: 'orderStoreModule',
  } as OrderStoreState,

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
    pay: orderPayStoreModule,
    create: orderCreateStoreModule,
  },
};
