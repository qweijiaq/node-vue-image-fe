import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import {
  fileShowStoreModule,
  FileShowStoreState,
} from './show/file-show.store';

export interface FileStoreState {
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
    show: fileShowStoreModule,
  },
};
