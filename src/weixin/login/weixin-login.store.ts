import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';

export interface loginStep {
  name: string;
  title: string;
  description: string;
  component?: string;
}

export interface connectOption {
  title: string;
  value: string;
  icon: string;
}

export interface WeixinLoginStoreState {
  currentLoginStepName: string;
  loading: boolean;
  loginSteps: Array<loginStep>;
  connectOptions: Array<connectOption>;
}

export interface WeixinLoginConnectOptions {
  data?: null;
}

export const weixinLoginStoreModule: Module<WeixinLoginStoreState, RootState> =
  {
    /**
     * 命名空间
     */
    namespaced: true,

    /**
     * 数据
     */
    state: {
      connectOptions: [
        {
          title: '关联本站已有账户',
          value: 'verifyAccount',
          icon: 'merge_type',
        },
        {
          title: '创建并关联新账户',
          value: 'createAccount',
          icon: 'person_add',
        },
      ],
      currentLoginStepName: 'waitForUserConfirmation',
      loading: false,
      loginSteps: [
        {
          name: 'waitForUserConfirmation',
          title: '微信登录',
          description: '用微信扫码下面的二维码',
          component: 'WeixinLoginIframe',
        },
        {
          name: 'connectAccount',
          title: '关联账户',
          description: '关联您的微信账户和本账户',
          component: 'WeixinLoginConnect',
        },
        {
          name: 'verifyAccount',
          title: '关联已有账户',
          description: '请输入本站已有用户相关信息并确定关联',
          component: 'WeixinLoginAccount',
        },
        {
          name: 'createAccount',
          title: '关联新账户',
          description: '创建新的账户并与您的账户关联',
          component: 'WeixinLoginAccount',
        },
        {
          name: 'connectAccountCompleted',
          title: '关联成功',
          description: '成功地关联了您的微信账户与本站账户 :)',
          component: 'WeixinLoginAccount',
        },
      ],
    } as WeixinLoginStoreState,

    /**
     * 获取器
     */
    getters: {
      connectOptions(state) {
        return state.connectOptions;
      },

      selectedConnectOption(state) {
        return state.connectOptions.find(
          (option) => option.value === state.currentLoginStepName,
        );
      },

      currentLoginStepName(state) {
        return state.currentLoginStepName;
      },

      loading(state) {
        return state.loading;
      },

      currentLoginStep(state) {
        return state.loginSteps.find(
          (step) => step.name === state.currentLoginStepName,
        );
      },
    },

    /**
     * 修改器
     */
    mutations: {
      setCurrentLoginStepName(state, data) {
        state.currentLoginStepName = data;
      },

      setLoading(state, data) {
        state.loading = data;
      },

      resetLoginStep(state) {
        state.currentLoginStepName = 'waitForUserConfirmation';
      },
    },

    /**
     * 动作
     */
    actions: {
      async weixinLoginConnect(
        { commit },
        options: WeixinLoginConnectOptions = {},
      ) {
        commit('setLoading', true);

        try {
          const response = await apiHttpClient.get(`resources`);
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
