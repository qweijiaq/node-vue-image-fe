import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { SubscriptionProduct } from '../show/product-show.store';

export interface ProductSelectStoreState {
  selectedSubscriptionType: string;
  selectedProductType: string;
  name: string;
}

export const productSelectStoreModule: Module<
  ProductSelectStoreState,
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
    selectedSubscriptionType: 'pro',
    selectedProductType: 'license',
    name: 'productSelectStoreModule',
  } as ProductSelectStoreState,

  /**
   * 获取器
   */
  getters: {
    selectedSubscriptionType(state) {
      return state.selectedSubscriptionType;
    },

    selectedProductType(state) {
      return state.selectedProductType;
    },

    selectedProduct(state, getters, rootState, rootGetters) {
      // 许可产品
      const licenseProduct = rootGetters['product/show/licenseProduct'];

      // 订阅产品
      const subscriptionProducts = rootGetters[
        'product/show/subscriptionProducts'
      ] as Array<SubscriptionProduct>;

      // 提供许可产品
      if (state.selectedProductType === 'license') {
        return licenseProduct;
      }

      // 提供订阅产品
      return subscriptionProducts.find(
        (product) =>
          product.meta.subscriptionType === state.selectedSubscriptionType,
      );
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setSelectedSubscriptionType(state, data) {
      state.selectedSubscriptionType = data;
    },

    setSelectedProductType(state, data) {
      state.selectedProductType = data;
    },
  },

  /**
   * 动作
   */
  actions: {},

  /**
   * 模块
   */
  modules: {},
};
