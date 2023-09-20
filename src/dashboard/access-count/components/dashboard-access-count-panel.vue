<template>
  <div
    :class="dashboardAccessCountPanelClasses"
    @click="onClickDashboardAccessCountPanel"
  >
    <div class="header">
      {{ accessCount.title }}
    </div>
    <div class="content">
      {{ accessCount.value }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import store from '../../../app/app.store';

const props = defineProps({
  accessCount: {
    type: Object,
  },
});

// 当前的 action
const currentAction = computed(
  () => store.getters['dashboard/accessCount/currentAction'],
);

const isActivePanel = computed(
  () => currentAction.value === props.accessCount.action,
);

const dashboardAccessCountPanelClasses = computed(() => [
  'dashboard-access-count-panel',
  { active: isActivePanel.value },
]);

const onClickDashboardAccessCountPanel = () => {
  store.commit(
    'dashboard/accessCount/setCurrentAction',
    props.accessCount.action,
  );
};
</script>

<style scoped>
@import './styles/dashboard-access-count-panel.css';
</style>
