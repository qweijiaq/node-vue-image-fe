import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';

export interface AuditRevokeStoreState {
  loading: boolean;
}

export interface RevokeAuditData {
  resourceType: string;
  resourceId: number;
}

export interface RevokeAuditOptions {
  data?: RevokeAuditData;
}

export const auditRevokeStoreModule: Module<AuditRevokeStoreState, RootState> =
  {
    /**
     * 命名空间
     */
    namespaced: true,

    /**
     * 数据
     */
    state: {
      loading: false,
    } as AuditRevokeStoreState,

    /**
     * 获取器
     */
    getters: {
      loading(state) {
        return state.loading;
      },
    },

    /**
     * 修改器
     */
    mutations: {
      setLoading(state, data) {
        state.loading = data;
      },
    },

    /**
     * 动作
     */
    actions: {
      async revokeAudit({ commit }, options: RevokeAuditOptions = {}) {
        commit('setLoading', true);

        const { data } = options;

        try {
          const response = await apiHttpClient.post(`revoke-audit`, data);
          commit('setLoading', false);

          return response;
        } catch (error) {
          commit('setLoading', false);

          const _error = error as any;

          if (_error.response) {
            throw _error.response;
          }
        }
      },
    },

    /**
     * 模块
     */
    modules: {},
  };
