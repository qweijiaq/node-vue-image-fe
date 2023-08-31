<template>
  <div class="post-side-sheet-content-meta">
    <div class="item" v-for="(item, index) in postFileMetadata" :key="index">
      <div class="title">{{ item?.title }}</div>
      <div class="value">{{ item?.value }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import store from '../../../app/app.store';

const postFileMetadata = computed(
  () => store.getters['post/sideSheet/postFileMetadata'],
);
</script>

<style scoped>
@import './styles/post-side-sheet-content-meta.css';
</style>
