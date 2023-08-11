<template>
  <div class="manage-post-side-sheet">
    <ManagePostEdit />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import ManagePostEdit from '../edit/manage-post-edit.vue';
</script>

<style scoped>
@import './styles/manage-post-side-sheet.css';
</style>
