ManagePostEditSelectedList, ManagePostEditSelectedStatus,
<template>
  <div class="manage-post-edit-selected">
    <ManagePostEditSelectedStatus />
    <ManagePostEditSelectedList />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import ManagePostEditSelectedList from './manage-post-edit-selected-list.vue';
import ManagePostEditSelectedStatus from './manage-post-edit-selected-status.vue';
</script>

<style scoped>
@import './styles/manage-post-edit-selected.css';
</style>
