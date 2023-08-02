import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';

export interface CommentDestroyStoreState {
  loading: boolean;
}

export interface DeleteCommentOptions {
  commentId?: number;
}

export const commentDestroyStoreModule: Module<
  CommentDestroyStoreState,
  RootState
> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    loading: false,
  } as CommentDestroyStoreState,

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
    async deleteComment({ commit }, options: DeleteCommentOptions = {}) {
      commit('setLoading', true);

      const { commentId } = options;

      try {
        const response = await apiHttpClient.delete(`comments/${commentId}`);
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
