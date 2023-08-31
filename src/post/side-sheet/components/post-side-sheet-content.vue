<template>
  <div class="post-side-sheet-content">
    <PostSideSheetContentMeta />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import PostSideSheetContentMeta from './post-side-sheet-content-meta.vue';
</script>

<style scoped>
@import './styles/post-side-sheet-content.css';
</style>
