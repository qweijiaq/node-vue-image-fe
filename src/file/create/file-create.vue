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
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const image = new Image();
      image.src = event.target?.result;

      image.onload = () => {
        if (image.width > 1280) {
          resolve(event.target?.result);
        } else {
          reject('图像宽度小于 1280px');
        }
      };
    };
  });
};

const onChangeDragZone = async (files) => {
  const file = files[0];

  if (!file) return;

  try {
    const result = await createPreviewImage(file);
    store.commit('file/create/setSelectedFile', file);
    store.commit('file/create/setPreviewImage', result);
    emits('change', files);
  } catch (error) {
    store.dispatch('notification/pushMessage', { content: error });
  }
};

const uploading = computed(() => store.getters['file/create/uploading']);
</script>

<style scoped>
@import './styles/file-create.css';
</style>
