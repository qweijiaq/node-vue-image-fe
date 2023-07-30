<template>
  <div :class="['page', theme]">
    <pageHeader></pageHeader>
    <pageAside></pageAside>
    <div class="page-main">
      <slot></slot>
      <pageSideSheet />
    </div>
    <appNotification />
  </div>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
import pageHeader from './components/page-header.vue';
import pageAside from './components/page-aside.vue';
import appNotification from '../notification/app-notification.vue';
import pageSideSheet from './components/page-side-sheet.vue';
import { getStorages } from '../app.service';

const store = useStore();
const theme = computed(() => store.getters['layout/theme']);

const storageTheme = getStorages('theme');
if (storageTheme) {
  store.commit('layout/setTheme', storageTheme);
}
</script>

<style scoped></style>
