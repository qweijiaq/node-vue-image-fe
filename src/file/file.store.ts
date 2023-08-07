import { Module } from 'vuex';
import { RootState } from '@/app/app.store';

import {
  fileShowStoreModule,
  FileShowStoreState,
} from './show/file-show.store';

import { FileCreateStoreState, fileCreateStoreModule } from '@/file/create/file-create.store';

export interface FileStoreState {
  create: FileCreateStoreState,
  show: FileShowStoreState;
}

export const fileStoreModule: Module<FileStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {} as FileStoreState,

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
    create: fileCreateStoreModule,
    show: fileShowStoreModule,
  },
};
