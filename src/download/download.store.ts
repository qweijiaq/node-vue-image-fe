import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import {
  DownloadCreateStoreState,
  downloadCreateStoreModule,
} from '@/download/create/download-create.store';

export interface DownloadStoreState {
  canDownload: boolean;
  create: DownloadCreateStoreState;
  name: string;
}

export const downloadStoreModule: Module<DownloadStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    canDownload: false,
    name: 'downloadStoreModule',
  } as DownloadStoreState,

  /**
   * 获取器
   */
  getters: {
    canDownload(state) {
      return state.canDownload;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setCanDownload(state, data) {
      state.canDownload = data;
    },
  },

  /**
   * 动作
   */
  actions: {
    async getDownloadPermission({ commit, rootGetters, state, dispatch }) {
      // 检查订阅
      if (rootGetters['user/hasValidSubscription']) {
        return commit('setCanDownload', true);
      }

      // 检查许可
      const resourceId = rootGetters['layout/sideSheetProps'].post.id;
      await dispatch(
        'license/valid/getValidLicense',
        {
          resourceType: 'post',
          resourceId,
        },
        { root: true },
      );

      if (rootGetters['license/valid/hasValidLicense']) {
        commit('setCanDownload', true);
      } else {
        commit('setCanDownload', false);
      }
    },
  },

  /**
   * 模块
   */
  modules: {
    create: downloadCreateStoreModule,
  },
};
