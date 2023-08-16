import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';
import { queryStringProcess } from '../../app/app.service';

export interface GetAccessCountByActionOptions {
  dateTimeRange?: string;
  action?: string;
}

export interface AccessCountListItem {
  action: string;
  title: string;
  value: number;
}

export interface AccessCount {
  title: string;
  action: string;
  dataset: [Array<string>, Array<number>];
}

export interface DashboardAccessCountStoreState {
  currentAction: string;
  dateTimeRange: string;
  accessCount: AccessCount | null;
  accessCountList: Array<AccessCountListItem>;
  loading: boolean;
}

export interface GetAccessCountsOptions {
  dateTimeRange?: string;
}

export const dashboardAccessCountStoreModule: Module<
  DashboardAccessCountStoreState,
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
    currentAction: 'getPosts',
    dateTimeRange: '1-day',
    accessCount: null,
    accessCountList: [],
    loading: false,
  } as DashboardAccessCountStoreState,

  /**
   * 获取器
   */
  getters: {
    currentAction(state) {
      return state.currentAction;
    },

    dateTimeRange(state) {
      return state.dateTimeRange;
    },

    accessCount(state) {
      const { accessCount } = state;
      if (accessCount) {
        const [datetime] = accessCount.dataset;
        accessCount.dataset[0] = datetime.map((item) => item.slice(-2));
      }
      return accessCount;
    },

    accessCountList(state) {
      return state.accessCountList;
    },

    loading(state) {
      return state.loading;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setCurrentAction(state, data) {
      state.currentAction = data;
    },

    setDateTimeRange(state, data) {
      state.dateTimeRange = data;
    },

    setAccessCount(state, data) {
      state.accessCount = data;
    },

    setAccessCountList(state, data) {
      state.accessCountList = data;
    },

    setLoading(state, data) {
      state.loading = data;
    },

    increaseAccessCount(state, data) {
      state.accessCountList = state.accessCountList.map((accessCount) => {
        if (accessCount.action === data) {
          accessCount.value++;
        }

        return accessCount;
      });

      if (state.accessCount && state.accessCount.action === data) {
        const [labels, values] = state.accessCount.dataset;
        values[values.length - 1]++;
        state.accessCount = {
          ...state.accessCount,
          dataset: [labels, values],
        };
      }
    },
  },

  /**
   * 动作
   */
  actions: {
    async getAccessCounts({ commit }, options: GetAccessCountsOptions = {}) {
      commit('setLoading', true);

      const { dateTimeRange = '1-day' } = options;
      const getAccessCountsQueryString = queryStringProcess({ dateTimeRange });

      try {
        const response = await apiHttpClient.get(
          `dashboard/access-counts?${getAccessCountsQueryString}`,
        );
        commit('setLoading', false);
        commit('setAccessCountList', response.data);

        return response;
      } catch (error) {
        commit('setLoading', false);

        const _error = error as any;

        if (_error.response) {
          throw _error.response;
        }
      }
    },

    async getAccessCountByAction(
      { commit },
      options: GetAccessCountByActionOptions = {},
    ) {
      commit('setLoading', true);

      const { dateTimeRange = '1-day', action } = options;
      const getAccessCountByActionQueryString = queryStringProcess({
        dateTimeRange,
      });

      try {
        const response = await apiHttpClient.get(
          `dashboard/access-counts/${action}?${getAccessCountByActionQueryString}`,
        );
        commit('setLoading', false);
        commit('setAccessCount', response.data);

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
