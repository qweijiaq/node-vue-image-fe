import { Module } from 'vuex';
import { RootState } from '@/app/app.store';

import {
  DiggCreateStoreState,
  diggCreateStoreModule,
} from '@/digg/create/digg-create.store';

import {
  DiggDestroyStoreState,
  diggDestroyStoreModule,
} from '@/digg/destroy/digg-destroy.store';

export interface DiggStoreState {
  destroy: DiggDestroyStoreState;
  create: DiggCreateStoreState;
  name: string;
}

export const diggStoreModule: Module<DiggStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    name: 'diggStoreModule',
  } as DiggStoreState,

  /**
   * 获取器
   */
  getters: {},

  /**
   * 修改器
   */
  mutations: {},

  /**
   * 动作
   */
  actions: {},

  /**
   * 模块
   */
  modules: {
    destroy: diggDestroyStoreModule,
    create: diggCreateStoreModule,
  },
};
