<template>
  <div class="manage-post-edit">
    <PageSideSheetStatus v-if="!hasSelected" content="请选择要编辑的项目" />
    <ManagePostEditSelected v-if="hasSelected" />
    <ManagePostEditForm v-if="hasSelected" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import store from '../../../app/app.store';
import ManagePostEditSelected from '../edit/manage-post-edit-selected.vue';
import PageSideSheetStatus from '../../../app/layout/components/page-side-sheet-status.vue';
import ManagePostEditForm from '../edit/components/manage-post-edit-form.vue';

const hasSelected = computed(() => store.getters['manage/select/hasSelected']);
</script>

<style scoped>
@import './styles/manage-post-edit.css';
</style>
