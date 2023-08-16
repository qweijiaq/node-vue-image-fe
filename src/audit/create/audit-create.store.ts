import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';

export interface AuditCreateStoreState {
  loading: boolean;
}

export interface CreateAuditData {
  resourcetype: string;
  resourceid: number;
  note?: string;
  status: string;
}

export interface CreateAuditOptions {
  data?: CreateAuditData;
}

export const auditCreateStoreModule: Module<AuditCreateStoreState, RootState> =
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
    } as AuditCreateStoreState,

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
      async createAudit({ commit }, options: CreateAuditOptions = {}) {
        commit('setLoading', true);

        const { data } = options;

        try {
          const response = await apiHttpClient.post(`audit-logs`, data);
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
