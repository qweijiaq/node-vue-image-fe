<template>
  <div class="dashboard-access-count-panels">
    <DashboardAccessCountPanelChart />
    <DashboardAccessCountPanel
      v-for="accessCount in accessCountList"
      :key="accessCount.action"
      :accessCount="accessCount"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import router from '../../../app/app.router';
import store from '../../../app/app.store';
import DashboardAccessCountPanel from './dashboard-access-count-panel.vue';
import DashboardAccessCountPanelChart from './dashboard-access-count-panel-chart.vue';

const route = useRoute();

const accessCountList = computed(
  () => store.getters['dashboard/accessCount/accessCountList'],
);

const _dateTimeRange = computed(
  () => store.getters['dashboard/accessCount/dateTimeRange'],
);

const currentAction = computed(
  () => store.getters['dashboard/accessCount/currentAction'],
);

const {
  query: { dateTimeRange, action },
} = route;

if (dateTimeRange && dateTimeRange !== '1-day') {
  store.commit('dashboard/accessCount/setDateTimeRange', dateTimeRange);
}

if (action) {
  store.commit('dashboard/accessCount/setCurrentAction', action);
}

const submitGetAccessCounts = async () => {
  try {
    await store.dispatch('dashboard/accessCount/getAccessCounts', {
      dateTimeRange: _dateTimeRange.value,
      action: currentAction.value,
    });
  } catch (error) {
    store.dispatch('notification/pushMessage', {
      content: error.data.message,
    });
  }
};
submitGetAccessCounts();
// router.replace({ query: { dateTimeRange, action } });

const updateRouteQuery = () => {
  router.replace({
    query: {
      dateTimeRange: _dateTimeRange.value,
      action: currentAction.value,
    },
  });
};

updateRouteQuery();

watch(
  () => _dateTimeRange.value,
  () => {
    updateRouteQuery();
    submitGetAccessCounts();
  },
);

watch(
  () => currentAction.value,
  () => {
    updateRouteQuery();
    submitGetAccessCounts();
  },
);

watch(
  () => route,
  (value) => {
    const {
      name,
      query: { dateTimeRange },
    } = value;

    if (name === 'dashboardAccessCount' && !dateTimeRange) {
      store.commit('dashboard/accessCount/setDateTimeRange', '1-day');
    }
  },
);
</script>

<style scoped>
@import './styles/dashboard-access-count-panels.css';
</style>
