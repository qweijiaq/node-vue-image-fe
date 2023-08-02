<template>
  <div :class="['page', theme]">
    <PageHeader></PageHeader>
    <PageAside></PageAside>
    <div class="page-main">
      <slot></slot>
      <PageSideSheet @scroll="onScrollPageSideSheet" ref="pageSideSheet" />
    </div>
    <AppNotification />
  </div>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import PageHeader from './components/page-header.vue';
import PageAside from './components/page-aside.vue';
import AppNotification from '../notification/app-notification.vue';
import PageSideSheet from './components/page-side-sheet.vue';
import { getStorages } from '../app.service';

const store = useStore();
const theme = computed(() => store.getters['layout/theme']);

const storageTheme = getStorages('theme');
if (storageTheme) {
  store.commit('layout/setTheme', storageTheme);
}

const pageSideSheet = ref(null);
const onScrollPageSideSheet = () => {
  const { scrollTop, scrollHeight, clientHeight } = pageSideSheet.value.$el;
  if (clientHeight + scrollTop === scrollHeight) {
    store.commit('layout/setSideSheetTouchdown', true);
  }
};
</script>

<style scoped></style>
