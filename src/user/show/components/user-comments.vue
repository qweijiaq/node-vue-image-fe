<template>
  <div class="user-comments">
    <CommentList :filter="filter" />
  </div>
</template>

<script lang="ts" setup>
import CommentList from '../../../comment/index/components/comment-list.vue';

const props = defineProps({
  filter: {
    type: Object,
  },
});
</script>

<style scoped>
@import url('./styles/user-comments.css');
</style>
