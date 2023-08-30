import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';

export interface TagItem {
  id?: number;
  name?: string;
}

export interface PostEditStoreState {
  tags: Array<TagItem>;
  loading: boolean;
}

export interface UpdatePostData {
  title?: string;
  content?: string;
  status?: string;
}

export interface UpdatePostOptions {
  postId?: null;
  data?: UpdatePostData;
}

export interface CreatePostTagOptions {
  postId?: number;
  data?: TagItem;
}

export interface DeletePostTagOptions {
  postId?: number;
  tagId?: number;
}

export const postEditStoreModule: Module<PostEditStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    tags: [],
    loading: false,
  } as PostEditStoreState,

  /**
   * 获取器
   */
  getters: {
    tags(state) {
      return state.tags;
    },

    loading(state) {
      return state.loading;
    },

    hasTags(state) {
      return state.tags && state.tags.length ? true : false;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setTags(state, data) {
      state.tags = data;
    },

    setLoading(state, data) {
      state.loading = data;
    },
  },

  /**
   * 动作
   */
  actions: {
    async updatePost({ commit }, options: UpdatePostOptions = {}) {
      commit('setLoading', true);

      const { postId, data } = options;

      try {
        const response = await apiHttpClient.patch(`posts/${postId}`, data);
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

    async createPostTag(
      { commit, dispatch },
      options: CreatePostTagOptions = {},
    ) {
      commit('setLoading', true);

      const { postId, data } = options;

      try {
        const response = await apiHttpClient.post(`posts/${postId}/tag`, data);

        const { data: post } = await dispatch('post/show/getPostById', postId, {
          root: true,
        });

        commit('setLoading', false);
        commit('setTags', post.tags);
        commit('post/index/setPostItem', post, { root: true });

        return response;
      } catch (error) {
        commit('setLoading', false);

        const _error = error as any;

        if (_error.response) {
          throw _error.response;
        }
      }
    },

    async deletePostTag(
      { commit, dispatch },
      options: DeletePostTagOptions = {},
    ) {
      commit('setLoading', true);

      const { postId, tagId } = options;

      try {
        const response = await apiHttpClient.delete(`posts/${postId}/tag`, {
          data: { tagId },
        });

        const { data: post } = await dispatch('post/show/getPostById', postId, {
          root: true,
        });

        commit('setLoading', false);
        commit('setTags', post.tags);
        commit('post/index/setPostItem', post, { root: true });

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
