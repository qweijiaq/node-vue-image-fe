import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '../../app/app.service';

export interface UserAccountStoreState {
  // 加载中
  loading: boolean;
  // 上传头像预览
  avatarPreviewImage: string;
}

export const userAccountStoreModule: Module<UserAccountStoreState, RootState> =
  {
    /**
     * 命名空间
     */
    namespaced: true,

    /**
     * 数据
     */
    state: {
      loading: false,
      avatarPreviewImage: '',
    } as UserAccountStoreState,

    /**
     * 获取器
     */
    getters: {
      loading(state) {
        return state.loading;
      },
      avatarPreviewImage(state) {
        return state.avatarPreviewImage;
      },
    },

    /**
     * 修改器
     */
    mutations: {
      setLoading(state, value) {
        state.loading = value;
      },
      setAvatarPreviewImage(state, value) {
        state.avatarPreviewImage = value;
      },
    },

    /**
     * 动作
     */
    actions: {
      // 创建头像
      async createAvatar({ commit }, file) {
        commit('setLoading', true);
        const formData = new FormData();
        // 构造 key 为 avatar, value 为 file 的 form-data 数据
        formData.append('avatar', file);

        try {
          const response = await apiHttpClient.post('/avatars', formData);
          commit('setLoading', false);
          return response;
        } catch (error: any) {
          commit('setLoading', false);
          throw error.response;
        }
      },

      // 更新用户账户
      async updateUserAccount({ commit, dispatch }, data) {
        commit('setLoading', true);

        const { userId, body } = data;

        try {
          const res = await apiHttpClient.patch('/users', body);
          commit('setLoading', false);
          // 重新获取一次当前用户以更新用户
          dispatch('user/getCurrentUser', userId, {
            root: true,
          });
          return res;
        } catch (error: any) {
          commit('setLoading', false);
          throw error.response;
        }
      },
    },
  };
