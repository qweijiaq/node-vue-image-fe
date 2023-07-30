<template>
  <div :class="postListItemClasses">
    <div class="post-list-item-media"></div>
    <div class="post-list-item-content" v-if="showPostListItemCotent">
      <div class="small"></div>
      <div class="header">
        <div class="text"></div>
        <div class="meta"></div>
      </div>
      <div class="actions">
        <div class="action"></div>
        <div class="action"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const layout = computed(() => store.getters['post/index/layout']);
const postListItemClasses = computed(() => [
  'post-list-item',
  'skeleton',
  layout.value,
]);
const showPostListItemCotent = computed(
  () => !layout.value.includes('-minimal'),
);
</script>

<style scoped>
@import url('./styles/post-list-item-skeleton.css');
</style>
