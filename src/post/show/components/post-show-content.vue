<template>
  <div class="post-show-content">{{ props.post?.content }}</div>
</template>

<script lang="ts" setup>
const props = defineProps({
  post: {
    type: Object,
  },
});
</script>

<style scoped>
@import url('./styles/post-show-content.css');
</style>
