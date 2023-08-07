<template>
  <div class="manage-post">
    <ManagePostList />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import ManagePostList from './components/manage-post-list.vue';
</script>

<style scoped>
@import './styles/manage-post.css';
</style>
