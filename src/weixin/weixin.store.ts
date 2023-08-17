import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { WeixinLoginStoreState, weixinLoginStoreModule } from '@/weixin/login/weixin-login.store';

export interface WeixinStoreState {
  login: WeixinLoginStoreState,
  name: string;
}

export const weixinStoreModule: Module<WeixinStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    name: 'weixinStoreModule',
  } as WeixinStoreState,

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
    login: weixinLoginStoreModule,
  },
};
