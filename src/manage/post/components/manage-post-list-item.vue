<template>
  <div :class="managePostListItemClasses">
    <ManagePostListItemMedia :item="item" />
    <ManagePostListItemContent :item="item" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import store from '../../../app/app.store';
import ManagePostListItemMedia from './manage-post-list-item-media.vue';
import ManagePostListItemContent from './manage-post-list-item-content.vue';

const props = defineProps({
  item: {
    type: Object,
  },
});

const managePostListItemClasses = computed(() => [
  'manage-post-list-item',
  { selected: false },
]);
</script>

<style scoped>
@import './styles/manage-post-list-item.css';
</style>
