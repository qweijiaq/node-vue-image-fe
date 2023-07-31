<template>
  <div class="comment-side-sheet">
    <CommentCreate />
    <CommentIndex />
  </div>
</template>

<script lang="ts" setup>
import CommentIndex from '../index/comment-index.vue';
import CommentCreate from '../create/comment-create.vue';
</script>

<style scoped>
@import url('./styles/comment-side-sheet.css');
</style>
