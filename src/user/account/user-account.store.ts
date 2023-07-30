import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '../../app/app.service';
import axios from 'axios';
import { API_BASE_URL } from '../../app/app.config';

export interface UserAccountStoreState {
  loading: boolean;
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
      async createAvatar({ commit }, file) {
        commit('setLoading', true);
        const formData = new FormData();
        //   file.destination = 'uploads/avatar';
        //   file.filename = file.name;
        formData.append('avatar', file);

        try {
          const response = await apiHttpClient.post('/avatars', formData);
          commit('setLoading', false);
          return response;
        } catch (e: any) {
          commit('setLoading', false);
          throw e.response;
        }
      },

      async updateUserAccount({ commit, dispatch }, data) {
        commit('setLoading', true);
        try {
          const res = await apiHttpClient.patch('/users', data.body);
          commit('setLoading', false);
          dispatch('user/getCurrentUser', data.userId, {
            root: true,
          });
          return res;
        } catch (e: any) {
          commit('setLoading', false);
          throw e.response;
        }
      },
    },
  };
