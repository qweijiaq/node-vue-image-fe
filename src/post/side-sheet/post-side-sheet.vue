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

const sideSheetProps = computed(() => store.getters['layout/sideSheetProps']);

const fn = async () => {
  try {
    await store.dispatch('post/sideSheet/initialize');
  } catch (error) {
    store.dispatch('notification/pushMessage', {
      content: error.data.message,
    });
  }
};
fn();

watch(
  () => sideSheetProps.value,
  async () => {
    try {
      await store.dispatch('post/sideSheet/initialize');
    } catch (error) {
      store.dispatch('notification/pushMessage', {
        content: error.data.message,
      });
    }
  },
);
</script>

<style scoped>
@import './styles/post-side-sheet.css';
</style>
