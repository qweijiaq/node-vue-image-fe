<template>
  <div class="app-toolbar-item side-sheet">
    <button class="button basic" @click="onClickSideSheetButton">
      <AppIcon name="vertical_split" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onUnmounted } from 'vue';
import store from '../../app.store';
import AppIcon from '../../components/app-icon.vue';

const onKeyDownWindow = (event: any) => {
  const isCommandB = event.metaKey && event.key === 'b';
  const isCtrlB = event.ctrlKey && event.key === 'b';
  if (isCommandB || isCtrlB) {
    store.dispatch('layout/switchSideSheet');
  }
};

const onClickSideSheetButton = () => {
  store.dispatch('layout/switchSideSheet');
};

if (window) {
  window.addEventListener('keydown', onKeyDownWindow);
}

onUnmounted(() => {
  if (window) {
    window.removeEventListener('keydown', onKeyDownWindow);
  }
});
</script>

<style scoped>
@import './styles/app-toolbar-item-side-sheet.css';
</style>
