import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';
import { queryStringProcess } from '../../app/app.service';
import { API_BASE_URL } from '../../app/app.config';

export interface Download {
  id: number;
  userId: number;
  licenseId: number;
  token: string;
  resourceType: string;
  resourceId: number;
  created: string;
  used: string;
}

export interface DownloadCreateStoreState {
  fileDownloadUrl: string;
  download: Download | null;
  loading: boolean;
}

export interface CreateDownloadData {
  resourceType: string;
  resourceId: number;
}

export interface CreateDownloadOptions {
  fileId: number;
  data?: CreateDownloadData;
}

export const downloadCreateStoreModule: Module<
  DownloadCreateStoreState,
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
    fileDownloadUrl: '',
    download: null,
    loading: false,
  } as DownloadCreateStoreState,

  /**
   * 获取器
   */
  getters: {
    fileDownloadUrl(state) {
      return state.fileDownloadUrl;
    },

    download(state) {
      return state.download;
    },

    loading(state) {
      return state.loading;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setFileDownloadUrl(state, data) {
      if (data) {
        const { fileId, token, socketId } = data;
        const queryString = queryStringProcess({ token, socketId });
        state.fileDownloadUrl = `${API_BASE_URL}/files/${fileId}/download?${queryString}`;
      } else {
        state.fileDownloadUrl = '';
      }
    },

    setDownload(state, data) {
      state.download = data;
    },

    setLoading(state, data) {
      state.loading = data;
    },
  },

  /**
   * 动作
   */
  actions: {
    async createDownload(
      { commit, rootGetters },
      options: CreateDownloadOptions,
    ) {
      commit('setLoading', true);

      const { fileId, data } = options;

      try {
        const response = await apiHttpClient.post(`downloads`, data);
        commit('setLoading', false);
        commit('setDownload', response.data);
        commit('setFileDownloadUrl', {
          fileId,
          token: response.data.token,
          socketId: rootGetters['user/socketId'],
        });

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
