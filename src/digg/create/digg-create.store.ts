import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';

export interface DiggCreateStoreState {
  loading: boolean;
}

export interface CreateUserDiggPostOptions {
  postId?: number;
}

export const diggCreateStoreModule: Module<DiggCreateStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    loading: false,
  } as DiggCreateStoreState,

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
    async createUserDiggPost(
      { commit },
      options: CreateUserDiggPostOptions = {},
    ) {
      commit('setLoading', true);

      const { postId } = options;

      try {
        const response = await apiHttpClient.post(`posts/${postId}/digg`);
        commit('setLoading', false);
        commit(
          'post/index/setPostItemDigged',
          { postId, digged: 1 },
          { root: true },
        );
        commit(
          'post/index/setPostItemTotalDiggs',
          { postId, actionType: 'increase' },
          { root: true },
        );

        commit(
          'post/show/setPostDigged',
          { postId, digged: 1 },
          { root: true },
        );

        commit(
          'post/show/setPostTotalDiggs',
          { postId, actionType: 'increase' },
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
