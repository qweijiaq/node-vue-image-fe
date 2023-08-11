<template>
  <div class="manage-post">
    <ManagePostList />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import store from '../../app/app.store';

import ManagePostList from './components/manage-post-list.vue';

store.commit('layout/setSideSheetComponent', 'ManagePostSideSheet');
</script>

<style scoped>
@import './styles/manage-post.css';
</style>
