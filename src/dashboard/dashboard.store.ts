import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import {
  DashboardAccessCountStoreState,
  dashboardAccessCountStoreModule,
} from '@/dashboard/access-count/dashboard-access-count.store';

export interface DashboardStoreState {
  accessCount: DashboardAccessCountStoreState;
  name: string;
}

export const dashboardStoreModule: Module<DashboardStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    name: 'dashboardStoreModule',
  } as DashboardStoreState,

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
    accessCount: dashboardAccessCountStoreModule,
  },
};
