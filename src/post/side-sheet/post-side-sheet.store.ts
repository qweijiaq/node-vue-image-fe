import { Module } from 'vuex';
import { RootState } from '@/app/app.store';

export interface PostFileMetadataItem {
  title?: string;
  value?: string;
}

export interface PostSideSheetStoreState {
  name: string;
}

export const postSideSheetStoreModule: Module<
  PostSideSheetStoreState,
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
    name: 'postSideSheetStoreModule',
  } as PostSideSheetStoreState,

  /**
   * 获取器
   */
  getters: {
    postFileMetadata(state, getters, rootState) {
      const metadata: Array<PostFileMetadataItem> = [];

      const { title } = rootState.post.show.post;

      if (title) {
        metadata.push({ title: '标题', value: title });
      }

      if (rootState.file.show.fileMetaData) {
        const {
          size,
          width,
          height,
          metadata: { Make, Model, LensMake, LensModel, Software },
        } = rootState.file.show.fileMetaData;

        if (size) {
          metadata.push({
            title: '大小',
            value: `${Math.ceil(size / 1024 / 1024)} M`,
          });
        }

        if (width) {
          metadata.push({
            title: '尺寸',
            value: `${width} × ${height}`,
          });
        }

        if (Make) {
          metadata.push({
            title: '相机',
            value: `${Make} ${Model}`,
          });
        }

        if (LensMake) {
          metadata.push({
            title: '镜头',
            value: `${LensMake} ${LensModel}`,
          });
        }

        if (Software) {
          metadata.push({
            title: '软件',
            value: Software,
          });
        }
      }

      return metadata;
    },
  },

  /**
   * 修改器
   */
  mutations: {},

  /**
   * 动作
   */
  actions: {},

  /**
   * 模块
   */
  modules: {},
};
