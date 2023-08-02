import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';

export interface CommentEditStoreState {
  loading: boolean;
}

export interface UpdateCommentOptions {
  commentId?: number;
  content?: string;
}

export const commentEditStoreModule: Module<CommentEditStoreState, RootState> =
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
    } as CommentEditStoreState,

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
      async updateComment({ commit }, options: UpdateCommentOptions = {}) {
        commit('setLoading', true);

        const { commentId, content } = options;

        try {
          const response = await apiHttpClient.patch(`comments/${commentId}`, {
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
