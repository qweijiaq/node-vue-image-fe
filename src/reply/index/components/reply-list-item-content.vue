<template>
  <div class="reply-list-item-content">
    {{ props.item?.content }}
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  item: {
    type: Object,
  },
});
</script>

<style scoped>
@import url('./styles/reply-list-item-content.css');
</style>
