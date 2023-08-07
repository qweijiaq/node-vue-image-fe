<template>
  <transition name="page-side-sheet">
    <div class="page-side-sheet" v-if="isSideSheetActive">
      <closeButton @click="onClickCloseBtn" />
      <commentSideSheet />
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { computed, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import commentSideSheet from '@/comment/components/comment-side-sheet.vue';
import closeButton from '../../components/close-button.vue';

const store = useStore();

const sideSheetComponent = computed(
  () => store.getters['layout/sideSheetComponent'],
);

const onClickCloseBtn = () => {
  store.dispatch('layout/closeSideSheet');
};

// eslint-disable-next-line
const onKeyUpWindow = (event: any) => {
  if (event.key === 'Escape') {
    store.dispatch('layout/closeSideSheet');
  }
};

if (window) {
  window.addEventListener('keyup', onKeyUpWindow);
}

onUnmounted(() => {
  if (window) {
    window.removeEventListener('keyup', onKeyUpWindow);
  }
});

const isSideSheetActive = computed(
  () => store.getters['layout/isSideSheetActive'],
);
</script>

<style scoped>
@import url('./styles/page-side-sheet.css');
</style>
