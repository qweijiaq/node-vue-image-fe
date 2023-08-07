import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';

export interface DiggDestroyStoreState {
  loading: boolean;
}

export interface DeleteUserDiggPostOptions {
  postId?: number;
}

export const diggDestroyStoreModule: Module<DiggDestroyStoreState, RootState> =
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
    } as DiggDestroyStoreState,

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
      async deleteUserDiggPost(
        { commit },
        options: DeleteUserDiggPostOptions = {},
      ) {
        commit('setLoading', true);

        const { postId } = options;

        try {
          const response = await apiHttpClient.delete(`posts/${postId}/digg`);
          commit('setLoading', false);
          commit(
            'post/index/setPostItemDigged',
            { postId, digged: 0 },
            { root: true },
          );
          commit(
            'post/index/setPostItemTotalDiggs',
            { postId, actionType: 'decrease' },
            { root: true },
          );
          commit(
            'post/show/setPostDigged',
            { postId, digged: 0 },
            { root: true },
          );

          commit(
            'post/show/setPostTotalDiggs',
            { postId, actionType: 'decrease' },
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
