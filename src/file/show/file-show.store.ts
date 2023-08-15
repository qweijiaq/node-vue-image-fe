import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';

export interface FileMetaData {
  id: number;
  size: number;
  width: number;
  height: number;
  metadata: {
    Make: string;
    Model: string;
    LensMake: string;
    LensModel: string;
    Software: string;
    Orientation: string;
    CreateDate: number;
    ModifyDate: number;
    FNumber: number;
    FocalLength: number;
    ExposureTime: number;
    ISO: number;
  };
}

export interface FileShowStoreState {
  loading: boolean;
  fileMetaData: FileMetaData | null;
}

export interface MetaItem {
  title: string;
  value: string;
}

export const fileShowStoreModule: Module<FileShowStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    loading: false,
    fileMetaData: null,
  } as FileShowStoreState,

  /**
   * 获取器
   */
  getters: {
    loading(state) {
      return state.loading;
    },

    fileMetaData(state) {
      return state.fileMetaData;
    },

    kit(state) {
      let kit: Array<MetaItem> = [];
      if (state.fileMetaData) {
        const {
          Make = '',
          Model = '',
          LensMake = '',
          LensModel = '',
        } = state.fileMetaData.metadata;

        const camera = {
          title: '相机',
          value: `${Make} ${Model}`.trim(),
          url: `/popular?cameraMake=${Make}&cameraModel=${Model}`,
        };

        const lens = {
          title: '镜头',
          value: `${LensMake} ${LensModel}`.trim(),
          url: `/popular?lensMake=${LensMake}&lensModel=${LensModel}`,
        };

        kit = [camera, lens];
      }

      return kit.filter((item) => item.value !== '');
    },

    specs(state) {
      let specs: Array<MetaItem> = [];

      if (state.fileMetaData) {
        const { FocalLength, FNumber, ExposureTime, ISO } =
          state.fileMetaData.metadata;

        specs = [
          {
            title: '焦距',
            value: FocalLength ? `${FocalLength}mm` : '',
          },
          {
            title: '光圈',
            value: FocalLength ? `ƒ/${FNumber}` : '',
          },
          {
            title: '曝光',
            value: ExposureTime
              ? ExposureTime > 1
                ? `${ExposureTime}s`
                : `1/${Math.round(1 / ExposureTime)}s`
              : '',
          },
          {
            title: '感光',
            value: `${ISO ? ISO : ''}`,
          },
        ];
      }

      return specs.filter((item) => item.value !== '');
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setLoading(state, data) {
      state.loading = data;
    },

    setFileMetaData(state, data) {
      state.fileMetaData = data;
    },
  },

  /**
   * 动作
   */
  actions: {
    async getFileById({ commit }, fileId) {
      commit('setLoading', true);

      try {
        const response = await apiHttpClient.get(`/files/${fileId}/metadata`);
        commit('setFileMetaData', response.data);
        commit('setLoading', false);

        return response;
      } catch (error: any) {
        commit('setLoading', false);

        throw error.response;
      }
    },
  },
};
