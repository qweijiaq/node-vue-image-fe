import { Module } from 'vuex';
import { RootState } from '@/app/app.store';

import {
  CommentIndexStoreState,
  commentIndexStoreModule,
} from './index/comment-index.store';

import {
  CommentCreateStoreState,
  commentCreateStoreModule,
} from '@/comment/create/comment-create.store';

export interface CommentStoreState {
  create: CommentCreateStoreState;
  index: CommentIndexStoreState;
}

export const commentStoreModule: Module<CommentStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {} as CommentStoreState,

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
    create: commentCreateStoreModule,
    index: commentIndexStoreModule,
  },
};
