<template>
  <div class="post-side-sheet">
    <PostSideSheetHeader />
    <PostSideSheetContent />
    <PostSideSheetActions />
    <PostSideSheetFooter />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import PostSideSheetContent from './components/post-side-sheet-content';
import PostSideSheetHeader from './components/post-side-sheet-header';
import PostSideSheetActions from './components/post-side-sheet-actions';
import PostSideSheetFooter from './components/post-side-sheet-footer';
</script>

<style scoped>
@import './styles/post-side-sheet.css';
</style>
