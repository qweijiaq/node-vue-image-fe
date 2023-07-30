<template>
  <div :class="['page-header', { shadow: data.shadow }]">
    <div class="container">
      <appToolbar />
    </div>
  </div>
</template>

<script lang="ts" setup>
import appToolbar from '@/app/toolbar/app-toolbar.vue';
import { onUnmounted, reactive } from 'vue';

const data = reactive({
  shadow: false,
});

const onScrollWindow = () => {
  if (document) {
    const { scrollTop } = document.documentElement;
    data.shadow = scrollTop > 120 ? true : false;
  }
};

if (window) {
  window.addEventListener('scroll', onScrollWindow);
}

onUnmounted(() => {
  if (window) {
    window.removeEventListener('scroll', onScrollWindow);
  }
});
</script>

<style scoped></style>
