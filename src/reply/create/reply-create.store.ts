import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';

export interface ReplyCreateStoreState {
  loading: boolean;
}

export interface CreateReplyOptions {
  commentId?: number;
  post_id?: number;
  content?: string;
}

export const replyCreateStoreModule: Module<ReplyCreateStoreState, RootState> =
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
    } as ReplyCreateStoreState,

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
      async createReply({ commit }, options: CreateReplyOptions = {}) {
        commit('setLoading', true);

        const { commentId, post_id, content } = options;

        try {
          const response = await apiHttpClient.post(`comments/${commentId}`, {
            post_id,
            content,
          });
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
