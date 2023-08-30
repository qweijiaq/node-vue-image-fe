import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';
import { User } from '../../user/show/user-show.store';

export interface WeixinLoginOptions {
  user: User;
  token: { id: number; name: string; token: string };
}

export interface WeixinUserInfo {
  openid?: string;
  nickname?: string;
  sex?: number;
  language?: string;
  city?: string;
  province?: string;
  country?: string;
  headimgUrl?: string;
  privilege?: Array<string>;
  unionid?: string;
}

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
  weixinUserInfo: WeixinUserInfo | null;
  currentLoginStepName: string;
  loading: boolean;
  loginSteps: Array<loginStep>;
  connectOptions: Array<connectOption>;
}

export interface WeixinLoginConnectOptions {
  data: {
    name: string;
    password: string;
  };
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
      weixinUserInfo: null,
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
          description: '关联您的微信账户和本站账户',
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
        },
      ],
    } as WeixinLoginStoreState,

    /**
     * 获取器
     */
    getters: {
      weixinUserInfo(state) {
        return state.weixinUserInfo;
      },

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
      setWeixinUserInfo(state, data) {
        state.weixinUserInfo = data;
      },

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
      weixinLogin({ commit, dispatch }, options: WeixinLoginOptions) {
        const { user, token } = options;

        commit('auth/setToken', token, { root: true });
        commit('user/setCurrentUser', user, { root: true });
        commit(
          'auth/login/setLoginResponseData',
          { id: user.id, token },
          { root: true },
        );

        dispatch('auth/configApiHttpClientAuthHeader', token, { root: true });
      },

      async weixinLoginConnect(
        { commit, state, dispatch },
        options: WeixinLoginConnectOptions,
      ) {
        commit('setLoading', true);

        const data = {
          ...options.data,
          weixinUserInfo: state.weixinUserInfo,
        };

        try {
          const response = await apiHttpClient.post(
            `weixin-login/connect`,
            data,
          );
          commit('setLoading', false);

          const { user, token } = response.data;

          dispatch('weixinLogin', { user, token });

          dispatch('user/getCurrentUser', user.id, { root: true });

          return response;
        } catch (error) {
          commit('setLoading', false);

          const _error = error as any;

          if (_error.response) {
            throw _error.response;
          }
        }
      },

      async weixinLoginCreateConnect(
        { commit, state, dispatch },
        options: WeixinLoginConnectOptions,
      ) {
        commit('setLoading', true);

        const data = {
          ...options.data,
          weixinUserInfo: state.weixinUserInfo,
        };

        try {
          const response = await apiHttpClient.post(
            `weixin-login/create-connect`,
            data,
          );
          commit('setLoading', false);

          const { user, token } = response.data;

          dispatch('weixinLogin', { user, token });

          dispatch('user/getCurrentUser', user.id, { root: true });

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
