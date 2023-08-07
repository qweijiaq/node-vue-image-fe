import { Module } from 'vuex';
import appRouter from '../../app/app.router';
import { apiHttpClient } from '../../app/app.service';
import { RootState } from '../../app/app.store';
import { User } from '../../user/show/user-show.store';
import { postFileProcess } from '../post.service';

export interface Post {
  id: number;
  title: string;
  content: string;
  user: User;
  totalComments: number;
  totalDiggs: number;
  digged: number;
  file: {
    id: number;
    width: number;
    height: number;
    orientation: string;
    size: {
      small: string;
      medium: string;
      large: string;
    };
    tags: [
      {
        id: number;
        name: string;
      },
    ];
  };
}

export interface PostShowStoreState {
  loading: boolean;
  post: Post;
  layout: string;
}

export const postShowStoreModule: Module<PostShowStoreState, RootState> = {
  namespaced: true,

  state: {
    loading: false,
    post: {},
    layout: '',
  } as PostShowStoreState,

  getters: {
    loading(state) {
      return state.loading;
    },

    post(state) {
      return Object.keys(state.post).length
        ? postFileProcess(state.post)
        : null;
    },

    layout(state) {
      return state.layout;
    },

    currentPostIndex(state, _, rootState) {
      return rootState.post.index.posts.findIndex(
        (item) => item.id === state.post.id,
      );
    },

    prevPost(state, getters, rootState) {
      return rootState.post.index.posts[getters.currentPostIndex - 1];
    },

    nextPost(state, getters, rootState) {
      return rootState.post.index.posts[getters.currentPostIndex + 1];
    },

    canNavigatorBack(_, getters, rootState) {
      return (
        rootState.post.index.posts.length > 0 && getters.currentPostIndex !== 0
      );
    },

    canNavigatorForward(_, getters, rootState) {
      return (
        rootState.post.index.posts.length > 0 &&
        rootState.post.index.posts.length !== getters.currentPostIndex + 1
      );
    },

    canGetMorePosts(_, getters, rootState, rootGetters) {
      return (
        rootGetters['post/index/hasMore'] &&
        rootState.post.index.posts.length - getters.currentPostIndex < 3
      );
    },
  },

  mutations: {
    setLoading(state, data) {
      state.post = data;
    },

    setPost(state, data) {
      state.post = data;
    },

    setLayout(state, data) {
      state.layout = data;
    },

    setPostDigged(state, data) {
      const { postId, digged } = data;
      if (state.post.id === postId) {
        state.post.digged = digged;
      }
    },

    setPostTotalDiggs(state, data) {
      const { postId, actionType } = data;
      if (state.post.id === postId) {
        switch (actionType) {
          case 'increase':
            state.post.totalDiggs++;
            break;
          case 'decrease':
            state.post.totalDiggs--;
            break;
        }
      }
    },
  },

  actions: {
    async getPostById({ commit }, postId) {
      commit('setLoading', true);

      try {
        const response = await apiHttpClient.get(`/posts/${postId}`);
        commit('setLoading', false);
        commit('setPost', response.data);

        return response;
        // eslint-disable-next-line
      } catch (error: any) {
        commit('setLoading', false);

        throw error.response;
      }
    },

    async goGetPrevPost({ getters, dispatch }) {
      if (!getters.canNavigatorBack) return;
      try {
        const prevPostId = getters.prevPost.id;
        const res = await dispatch('getPostById', prevPostId);
        appRouter.replace({
          name: 'postShow',
          params: {
            postId: prevPostId,
          },
        });

        return res;
        // eslint-disable-next-line
      } catch (error: any) {
        throw error.response;
      }
    },

    async goGetNextPost({ getters, dispatch }) {
      if (!getters.canNavigatorForward) return;
      if (getters.canGetMorePosts) {
        dispatch('post/index/geetPosts', {}, { root: true });
      }
      try {
        const nextPostId = getters.nextPost.id;
        const res = await dispatch('getPostById', nextPostId);
        appRouter.replace({
          name: 'postShow',
          params: {
            postId: nextPostId,
          },
        });

        return res;
        // eslint-disable-next-line
      } catch (error: any) {
        throw error.response;
      }
    },
  },
};
