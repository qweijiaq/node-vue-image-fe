import { Module } from 'vuex';
import { RootState } from '@/app/app.store';

import {
  ReplyIndexStoreState,
  replyIndexStoreModule,
} from './index/reply-index.store';

import {
  ReplyCreateStoreState,
  replyCreateStoreModule,
} from '@/reply/create/reply-create.store';

export interface ReplyStoreState {
  create: ReplyCreateStoreState;
  index: ReplyIndexStoreState;
}

export const replyStoreModule: Module<ReplyStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {} as ReplyStoreState,

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

  modules: {
    create: replyCreateStoreModule,
    index: replyIndexStoreModule,
  },
};
