<template>
  <div class="app-toolbar-item side-sheet">
    <button class="button basic" @click="onClickSideSheetButton">
      <AppIcon name="vertical_split" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onUnmounted } from 'vue';
import store from '../../app/app.store';
import AppIcon from '../../app/components/app-icon.vue';

const onKeyDownWindow = (event) => {
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
