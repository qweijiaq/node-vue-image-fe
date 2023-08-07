<template>
  <div :class="fileCreateClasses">
    <FileCreateMedia v-if="previewImage" />
    <FileCreateDragZone @change="onChangeDragZone" v-if="!uploading" />
    <FileCreateStatus v-if="uploading" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import FileCreateDragZone from './components/file-create-drag-zone.vue';
import FileCreateMedia from '../components/file-create-media.vue';
import FileCreateStatus from './components/file-create-status.vue';
import store from '../../app/app.store';

const emits = defineEmits(['change']);

const previewImage = computed(() => store.getters['file/create/previewImage']);
const fileCreateClasses = computed(() => [
  'file-create',
  { active: previewImage.value },
]);

const createPreviewImage = (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (event) => {
    store.commit('file/create/setPreviewImage', event.target?.result);
  };
};

const onChangeDragZone = (files) => {
  const file = files[0];
  if (file) {
    store.commit('file/create/setSelectedFile', file);
    createPreviewImage(file);
  }
  emits('change', files);
};

const uploading = computed(() => store.getters['file/create/uploading']);
</script>

<style scoped>
@import './styles/file-create.css';
</style>
