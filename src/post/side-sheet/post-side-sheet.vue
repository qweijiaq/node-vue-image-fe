<template>
  <div class="post-side-sheet">
    <PostSideSheetHeader />
    <PostSideSheetContent />
    <PostSideSheetActions />
    <PostSideSheetFooter />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive, watch } from 'vue';
import PostSideSheetContent from './components/post-side-sheet-content';
import PostSideSheetHeader from './components/post-side-sheet-header';
import PostSideSheetActions from './components/post-side-sheet-actions';
import PostSideSheetFooter from './components/post-side-sheet-footer';
import store from '../../app/app.store';

const canDownload = computed(() => store.getters['download/canDownload']);
const sideSheetProps = computed(() => store.getters['layout/sideSheetProps']);

const fn = async () => {
  await store.dispatch('download/getDownloadPermission');
  console.log(canDownload.value);
};
fn();

watch(
  () => sideSheetProps.value,
  async () => {
    await store.dispatch('download/getDownloadPermission');
    console.log(canDownload.value);
  },
);
</script>

<style scoped>
@import './styles/post-side-sheet.css';
</style>
