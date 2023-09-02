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
  actions: {
    async initialize({ dispatch, rootGetters }) {
      // 检查下载权限
      await dispatch('download/getDownloadPermission', null, { root: true });
      if (rootGetters['download/canDownload']) return;

      // 获取支付方法
      if (!rootGetters['payment/index/hasPayments']) {
        await dispatch('payment/index/getPayments', null, { root: true });
      }

      // 获取许可产品
      if (!rootGetters['product/show/hasLicenseProduct']) {
        await dispatch('product/show/getLicenseProduct', null, { root: true });
      }

      // 获取订阅产品
      if (!rootGetters['product/show/hasSubscriptionProducts']) {
        await dispatch('product/show/getSubscriptionProducts', null, {
          root: true,
        });
      }

      // 处理订单
      const order = await dispatch('order/create/createOrderResolver', null, {
        root: true,
      });

      // 支付订单
      try {
        await dispatch('order/pay/payOrder', order.id, { root: true });
      } catch (error) {
        dispatch(
          'notification/pushMessage',
          {
            content: error.data.message,
          },
          { root: true },
        );

        return;
      }
    },
  },

  /**
   * 模块
   */
  modules: {},
};
