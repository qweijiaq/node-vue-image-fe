<template>
  <div class="post-side-sheet-content">
    <component :is="contentComponent"></component>
    <PostSideSheetContentMeta v-if="showContentMeta" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import PostSideSheetContentMeta from './post-side-sheet-content-meta.vue';
import PostSideSheetContentLicense from './post-side-sheet-content-license.vue';
import PostSideSheetContentSubscription from './post-side-sheet-content-subscription.vue';
import store from '../../../app/app.store';

const selectedProductType = computed(
  () => store.getters['product/select/selectedProductType'],
);
const canDownload = computed(() => store.getters['download/canDownload']);

const contentComponent = computed(() => {
  let contentComponent;

  if (!canDownload.value) {
    switch (selectedProductType.value) {
      case 'license':
        contentComponent = PostSideSheetContentLicense;
        break;
      case 'subscription':
        contentComponent = PostSideSheetContentSubscription;
        break;
    }
  }

  return contentComponent;
});

const showContentMeta = computed(() => {
  let showContentMeta = true

  if (selectedProductType.value === 'subscription') {
    showContentMeta = false
  }

  return showContentMeta
})
</script>

<style scoped>
@import './styles/post-side-sheet-content.css';
</style>
