<template>
  <div :class="managePostListItemClasses">
    <ManagePostListItemMedia
      :item="item"
      @click="onClickPostListItemMedia($event, item)"
    />
    <ManagePostListItemContent :item="item" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import store from '../../../app/app.store';
import ManagePostListItemMedia from './manage-post-list-item-media.vue';
import ManagePostListItemContent from './manage-post-list-item-content.vue';

const props = defineProps({
  item: {
    type: Object,
  },
});

const isSelected = computed(() => store.getters['manage/select/isSelected']);

const managePostListItemClasses = computed(() => [
  'manage-post-list-item',
  { selected: isSelected.value(props.item?.id) },
]);

const onClickPostListItemMedia = (event: any, post: any) => {
  let actionType;

  if (event.metaKey || event.ctrlKey) {
    actionType = 'add';
  }

  if (isSelected.value(post.id)) {
    actionType = 'remove';
  }

  store.dispatch('manage/select/manageSelectedItems', {
    resourceType: 'post',
    item: post.id,
    actionType,
  });
};
</script>

<style scoped>
@import './styles/manage-post-list-item.css';
</style>
