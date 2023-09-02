<template>
  <div class="post-side-sheet">
    <PostSideSheetHeader />
    <PostSideSheetTab />
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
import PostSideSheetTab from './components/post-side-sheet-tab';
import store from '../../app/app.store';

const sideSheetProps = computed(() => store.getters['layout/sideSheetProps']);
const selectedProduct = computed(
  () => store.getters['product/select/selectedProduct'],
);

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
    await store.dispatch('post/sideSheet/initialize');
  },
);

watch(
  () => selectedProduct.value,
  async (value, oldValue) => {
    if (oldValue !== null) {
      await store.dispatch('post/sideSheet/initialize');
    }
  },
);
</script>

<style scoped>
@import './styles/post-side-sheet.css';
</style>
