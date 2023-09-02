import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { SubscriptionSignupStoreState, subscriptionSignupStoreModule } from '@/subscription/signup/subscription-signup.store';

export interface SubscriptionStoreState {
  signup: SubscriptionSignupStoreState,
  name: string;
}

export const subscriptionStoreModule: Module<SubscriptionStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    name: 'subscriptionStoreModule',
  } as SubscriptionStoreState,

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
    signup: subscriptionSignupStoreModule,
  },
};
