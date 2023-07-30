<template>
  <div class="comment-list-item-content">{{ props.item?.content }}</div>
</template>

<script lang="ts" setup>
const props = defineProps({
  item: {
    type: Object,
  },
});
</script>

<style scoped>
@import url('./styles/comment-list-item-content.css');
</style>
