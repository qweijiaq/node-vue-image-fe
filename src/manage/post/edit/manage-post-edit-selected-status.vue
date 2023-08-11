<template>
  <div class="manage-post-edit-selected-status">
    <ManageSelectedStatus />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import ManageSelectedStatus from '../../components/manage-selected-status.vue';
</script>

<style scoped>
@import './styles/manage-post-edit-selected-status.css';
</style>
