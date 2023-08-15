AppSearchOption,
<template>
  <div class="app-search-options">
    <AppSearchOption
      v-for="option in options"
      :key="option.type"
      :option="option"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import AppSearchOption from './app-search-option.vue';

const options = ref([
  {
    title: '标签',
    value: 'tags',
    query: 'name',
  },
  {
    title: '用户',
    value: 'users',
    query: 'name',
  },
  {
    title: '相机',
    value: 'cameras',
    query: 'makeModel',
  },
  {
    title: '镜头',
    value: 'lens',
    query: 'makeModel',
  },
]);
</script>

<style scoped>
@import './styles/app-search-options.css';
</style>
