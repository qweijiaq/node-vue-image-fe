import { Module } from 'vuex';
import { RootState } from '@/app/app.store';

export interface SubscriptionStep {
  name: string;
  title: string;
  description: string;
}

export interface SubscriptionSignupStoreState {
  currentStepName: string;
  steps: Array<SubscriptionStep>;
  name: string;
}

export const subscriptionSignupStoreModule: Module<
  SubscriptionSignupStoreState,
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
    currentStepName: 'select',
    steps: [
      {
        name: 'select',
        title: '选择订阅',
        description: '订阅后可以获得所有照片的商业许可',
      },
      {
        name: 'payment',
        title: '确认支付',
        description: '选择支付方式并完成支付',
      },
      {
        name: 'complete',
        title: '完成订阅',
        description: '恭喜，您成功地完成了订阅！',
      },
    ],
    name: 'subscriptionSignupStoreModule',
  } as SubscriptionSignupStoreState,

  /**
   * 获取器
   */
  getters: {
    currentStepName(state) {
      return state.currentStepName;
    },

    steps(state) {
      return state.steps;
    },

    currentStep(state) {
      return state.steps.find((step) => step.name === state.currentStepName);
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setCurrentStepName(state, data) {
      state.currentStepName = data;
    },

    setSteps(state, data) {
      state.steps = data;
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
