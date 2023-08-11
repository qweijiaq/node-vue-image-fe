import { Module } from 'vuex';
import { POSTS_PER_PAGE } from '../../app/app.config';
import { apiHttpClient, queryStringProcess } from '../../app/app.service';
import { RootState } from '../../app/app.store';
import { User } from '../../user/show/user-show.store';
import { StringifiableRecord } from 'query-string';
import { postFileProcess, filterProcess } from '../post.service';

export interface PostListItem {
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

export interface PostIndexStoreState {
  loading: boolean;
  posts: PostListItem[];
  layout: string;
  nextPage: number;
  totalPages: number;
  queryString: string;
  filter: { [name: string]: string } | null;
}

export interface GetPostsOptions {
  sort?: string;
  filter?: { [name: string]: string };
}

export interface FilterItem {
  title?: string;
  value?: string;
}

export const postIndexStoreModule: Module<PostIndexStoreState, RootState> = {
  namespaced: true,

  state: {
    loading: false,
    posts: [],
    layout: '',
    nextPage: 1,
    totalPages: 1,
    queryString: '',
    filter: null,
  } as PostIndexStoreState,

  getters: {
    loading(state) {
      return state.loading;
    },

    posts(state) {
      return (
        state.posts &&
        state.posts
          .map((post) => postFileProcess(post))
          .filter((post) => post.file)
      );
    },

    layout(state) {
      return state.layout;
    },

    hasMore(state) {
      return state.totalPages - state.nextPage >= 0;
    },

    filterItems(state) {
      const items: Array<FilterItem> = [];
      if (state.filter) {
        Object.keys(state.filter).forEach((filterName) => {
          const item: FilterItem = {};
          switch (filterName) {
            case 'tag':
              item.title = '标签';
              break;
          }

          if (item.title && state.filter) {
            item.value = state.filter[filterName];
            items.push(item);
          }
        });
      }
      return items;
    },
  },

  mutations: {
    setLoading(state, data) {
      state.loading = data;
    },

    setPosts(state, data) {
      state.posts = data;
    },

    setLayout(state, data) {
      state.layout = data;
    },

    setTotalPages(state, data) {
      state.totalPages = data;
    },

    setNextPage(state, data) {
      if (data) {
        state.nextPage = data;
      } else {
        state.nextPage++;
      }
    },

    setQueryString(state, data) {
      state.queryString = data;
    },

    setFilter(state, data) {
      const filter = filterProcess(data);
      state.filter = filter;
    },

    setPostItemDigged(state, data) {
      const { postId, digged } = data;
      state.posts = state.posts.map((post) => {
        if (post.id === postId) {
          post.digged = digged;
        }
        return post;
      });
    },

    setPostItemTotalDiggs(state, data) {
      const { postId, actionType } = data;
      state.posts = state.posts.map((post) => {
        if (post.id === postId) {
          switch (actionType) {
            case 'increase':
              post.totalDiggs++;
              break;
            case 'decrease':
              post.totalDiggs--;
              break;
          }
        }
        return post;
      });
    },

    setPostItem(state, data) {
      const { id: postId } = data;

      state.posts = state.posts.map((post) => {
        if (post.id === postId) {
          post = { ...post, ...data };
        }
        return post;
      });
    },

    removePostItem(state, data) {
      const { id: postId } = data;

      state.posts = state.posts.filter((post) => post.id !== postId);
    },
  },

  actions: {
    async getPosts({ commit, state, dispatch }, options: GetPostsOptions = {}) {
      let getPostsQueryString = '';

      if (Object.keys(options).length) {
        getPostsQueryString = await dispatch('getPostsPreProcess', options);
      } else {
        getPostsQueryString = state.queryString;
      }

      try {
        const response = await apiHttpClient.get(
          `/posts?page=${state.nextPage}&${getPostsQueryString}`,
        );
        dispatch('getPostsPostProcess', response);

        return response;
      } catch (error: any) {
        commit('setLoading', false);
        throw error.response;
      }
    },

    getPostsPreProcess({ commit, state }, options: GetPostsOptions = {}) {
      commit('setLoading', true);
      commit('setFilter', options.filter);

      const getPostsQueryObject: StringifiableRecord = {
        sort: options.sort,
        ...state.filter,
      };

      const getPostsQueryString = queryStringProcess(getPostsQueryObject);
      if (state.queryString !== getPostsQueryString) {
        commit('setNextPage', 1);
      }
      commit('setQueryString', getPostsQueryString);
      return getPostsQueryString;
    },

    getPostsPostProcess({ commit, state }, response) {
      if (state.nextPage === 1) {
        commit('setPosts', response.data);
      } else {
        commit('setPosts', [...state.posts, ...response.data]);
      }
      commit('setLoading', false);

      const total =
        response.headers['X-total-Count'] || response.headers['x-total-count'];

      const totalPages = Math.ceil(parseInt(total, 10) / POSTS_PER_PAGE);

      commit('setTotalPages', totalPages);
      commit('setNextPage');
    },
  },
};
