import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { PostListItem } from '../../post/index/post-index.store';

export interface ManageSelectStoreState {
  selectedPosts: Array<PostListItem>;
  selectedItems: Array<number>;
  name: string;
}

export interface ManageSelectedItemsOptions {
  resourceType: string;
  item: number;
  actionType: string;
}

export const manageSelectStoreModule: Module<
  ManageSelectStoreState,
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
    selectedPosts: [],
    selectedItems: [],
    name: 'manageSelectStoreModule',
  } as ManageSelectStoreState,

  /**
   * 获取器
   */
  getters: {
    selectedPosts(state) {
      return state.selectedPosts;
    },

    selectedItems(state) {
      return state.selectedItems;
    },

    isSelected: (state) => (id: number) => {
      return state.selectedItems.some((item) => item === id);
    },

    isSingleSelect(state) {
      return state.selectedItems.length === 1 ? true : false;
    },

    isMultiSelect(state) {
      return state.selectedItems.length > 1 ? true : false;
    },

    hasSelected(state) {
      return state.selectedItems.length ? true : false;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setSelectedPosts(state, data) {
      state.selectedPosts = data;
    },

    setSelectedItems(state, data) {
      state.selectedItems = data;
    },
  },

  /**
   * 动作
   */
  actions: {
    getSelectedPosts({ state, commit, rootGetters }) {
      const selectedPosts = state.selectedItems.map((item) =>
        rootGetters['post/index/posts'].find(
          (post: PostListItem) => post.id === item,
        ),
      );

      commit('setSelectedPosts', selectedPosts);

      return selectedPosts;
    },

    manageSelectedItems(
      { commit, state, dispatch },
      options: ManageSelectedItemsOptions,
    ) {
      const { resourceType, item, actionType } = options;

      let items: Array<number>;

      switch (actionType) {
        case 'add':
          items = [...state.selectedItems, item];
          break;
        case 'remove':
          items = state.selectedItems.filter(
            (selectedItem) => selectedItem !== item,
          );
          break;
        case 'reset':
          items = [];
          break;
        default:
          items = [item];
          break;
      }

      commit('setSelectedItems', items);

      switch (resourceType) {
        case 'post':
          dispatch('getSelectedPosts');
          break;
      }
    },
  },

  /**
   * 模块
   */
  modules: {},
};
