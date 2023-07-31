import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';

export interface CommentCreateStoreState {
  loading: boolean;
}

export interface CreateCommentOptions {
  post_id?: number;
  content?: string;
}

export const commentCreateStoreModule: Module<
  CommentCreateStoreState,
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
  } as CommentCreateStoreState,

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
    async createComment(
      { commit, dispatch },
      options: CreateCommentOptions = {},
    ) {
      commit('setLoading', true);

      const { post_id, content } = options;

      try {
        const response = await apiHttpClient.post(`comments`, {
          post_id,
          content,
        });
        commit('setLoading', false);
        commit('comment/index/setNextPage', 1, { root: true });

        dispatch(
          'comment/index/getComments',
          { filter: { post: post_id } },
          { root: true },
        );

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
