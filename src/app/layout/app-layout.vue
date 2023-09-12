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
import { computed, ref } from 'vue';
import PageHeader from './components/page-header.vue';
import PageAside from './components/page-aside.vue';
import AppNotification from '../notification/app-notification.vue';
import PageSideSheet from './components/page-side-sheet.vue';
import { getStorages } from '../app.service';
import store from '../app.store';

// 主题
const theme = computed(() => store.getters['layout/theme']);

// 从 localStorage 中获取主题色
const storageTheme = getStorages('theme');

// 如果可以从 localStorage 中获取到，则设置该颜色为主题色
if (storageTheme) {
  store.commit('layout/setTheme', storageTheme);
}

// 获取侧板组件
const pageSideSheet = ref(null);
// 监听侧板的滚动
const onScrollPageSideSheet = () => {
  if (pageSideSheet.value) {
    const { scrollTop, scrollHeight, clientHeight } = pageSideSheet.value;
    // 判断是否触底
    if (clientHeight + scrollTop === scrollHeight) {
      store.commit('layout/setSideSheetTouchdown', true);
    }
  }
};
</script>

<style scoped></style>
