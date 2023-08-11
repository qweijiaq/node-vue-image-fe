<template>
  <div class="manage-post-edit-selected-list">
    <ManagePostEditSelectedListItem
      v-for="post in selectedPosts"
      :key="post.id"
      :item="post"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import store from '../../../app/app.store';
import ManagePostEditSelectedListItem from './manage-post-edit-selected-list-item.vue';

const selectedPosts = computed(
  () => store.getters['manage/select/selectedPosts'],
);
</script>

<style scoped>
@import './styles/manage-post-edit-selected-list.css';
</style>
