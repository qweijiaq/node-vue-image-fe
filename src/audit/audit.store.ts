import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import {
  AuditCreateStoreState,
  auditCreateStoreModule,
} from '@/audit/create/audit-create.store';
import {
  AuditRevokeStoreState,
  auditRevokeStoreModule,
} from '@/audit/revoke/audit-revoke.store';

export interface AuditAuditStoreState {
  revoke: AuditRevokeStoreState;
  create: AuditCreateStoreState;
  name: string;
}

export const auditAuditStoreModule: Module<AuditAuditStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    name: 'auditAuditStoreModule',
  } as AuditAuditStoreState,

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
    revoke: auditRevokeStoreModule,
    create: auditCreateStoreModule,
  },
};
