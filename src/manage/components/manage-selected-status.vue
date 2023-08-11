<template>
  <div class="manage-selected-status">
    <div class="content">已选择 {{ selectedItems.length }} 个项目</div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import store from '../../app/app.store';

const selectedItems = computed(
  () => store.getters['manage/select/selectedItems'],
);
</script>

<style scoped>
@import url('./styles/manage-selected-status.css');
</style>
