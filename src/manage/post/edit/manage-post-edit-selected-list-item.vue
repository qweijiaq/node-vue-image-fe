<template>
  <div class="manage-post-edit-selected-list-item">
    <div class="small">
      <img class="image" :src="item?.file.size.medium" />
    </div>
    <div class="actions">
      <button class="button basic circle" @click="onClickRemoveButton(item)">
        <AppIcon name="remove_circle_outline" color="#fff" size="16" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import store from '../../../app/app.store';
import AppIcon from '../../../app/components/app-icon.vue';

const props = defineProps({
  item: {
    type: Object,
  },
});

const onClickRemoveButton = (post) => {
  store.dispatch('manage/select/manageSelectedItems', {
    resourceType: 'post',
    item: post.id,
    actionType: 'remove',
  });
};
</script>

<style scoped>
@import './styles/manage-post-edit-selected-list-item.css';
</style>
