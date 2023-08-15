import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';

export interface UserResult {
  id: number;
  name: string;
  avatar: number;
  totalPosts: number;
}

export interface TagResult {
  id: number;
  name: string;
  totalPosts: number;
}

export interface CameraResult {
  camera: Array<string>;
  totalPosts: number;
}

export interface LensResult {
  lens: Array<string>;
  totalPosts: number;
}

export interface SearchOption {
  title: string;
  value: string;
  query: string;
}

export interface AppSearchStoreState {
  searchKeyword: string;
  searchResults: Array<
    UserResult | TagResult | CameraResult | LensResult
  > | null;
  searchOption: SearchOption;
  loading: boolean;
}

export const appSearchStoreModule: Module<AppSearchStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    searchKeyword: '',
    searchResults: null,
    searchOption: {
      title: '标签',
      value: 'tags',
      query: 'name',
    },
    loading: false,
  } as AppSearchStoreState,

  /**
   * 获取器
   */
  getters: {
    searchKeyword(state) {
      return state.searchKeyword;
    },

    searchResults(state) {
      return state.searchResults
        ? state.searchResults.map((result) => {
            let item, title, link, meta, extra;

            switch (state.searchOption.value) {
              case 'tags':
                item = result as TagResult;
                title = item.name;
                meta = item.totalPosts;
                link = `/popular?tag=${item.name}`;
                break;
              case 'users':
                item = result as UserResult;
                title = item.name;
                meta = item.totalPosts;
                link = `/users/${item.id}`;
                extra = {
                  id: item.id,
                  avatar: item.avatar,
                };
                break;
              case 'cameras':
                item = result as CameraResult;
                title = item.camera.join(' ');
                meta = item.totalPosts;
                link = `/popular?cameraMake=${item.camera[0]}&cameraModel=${item.camera[1]}`;
                break;
              case 'lens':
                item = result as LensResult;
                title = item.lens.join(' ');
                meta = item.totalPosts;
                link = `/popular?lensMake=${item.lens[0]}&lensModel=${item.lens[1]}`;
                break;
            }

            return {
              title,
              meta,
              link,
              extra,
            };
          })
        : null;
    },

    searchOption(state) {
      return state.searchOption;
    },

    loading(state) {
      return state.loading;
    },

    hasSearchResults(state) {
      return state.searchResults && state.searchResults.length > 0;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setSearchKeyword(state, data) {
      state.searchKeyword = data;
    },

    setSearchResults(state, data) {
      state.searchResults = data;
    },

    setSearchOption(state, data) {
      state.searchOption = data;
    },

    setLoading(state, data) {
      state.loading = data;
    },
  },

  /**
   * 动作
   */
  actions: {
    async search({ commit, state }) {
      commit('setLoading', true);

      try {
        const {
          searchOption: { value, query },
          searchKeyword,
        } = state;
        const response = await apiHttpClient.get(
          `/search/${value}?${query}=${searchKeyword}`,
        );

        commit('setSearchResults', response.data);

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
