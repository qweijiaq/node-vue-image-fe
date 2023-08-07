<template>
  <div class="file-create-status">
    <div class="upload-progress">
      <div class="content">
        <div class="text" :style="{ width: textWidth }">
          {{ uploadProgress }}
        </div>
        <div class="symbol">%</div>
      </div>
      <div class="overlay" :style="{ width: overlayWidth }"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import store from '../../../app/app.store';

const uploadProgress = computed(
  () => store.getters['file/create/uploadProgress'],
);
const overlayWidth = computed(() => `${100 - uploadProgress.value}%`);
const textWidth = computed(() => (uploadProgress.value > 9 ? '120px' : '60px'));
</script>

<style scoped>
@import './styles/file-create-status.css';
</style>
