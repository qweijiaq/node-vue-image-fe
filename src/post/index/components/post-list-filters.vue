<template>
  <div class="post-list-filters">
    <div
      class="post-list-filter"
      v-for="(filter, index) in filters"
      :key="index"
    >
      <div class="title">{{ filter.title }}</div>
      <div class="value">{{ filter.value }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  filters: {
    type: Object,
  },
});
</script>

<style scoped>
@import url('./styles/post-list-filters.css');
</style>
