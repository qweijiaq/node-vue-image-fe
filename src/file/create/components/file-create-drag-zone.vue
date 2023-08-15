<template>
  <div
    :class="fileCreateDragZoneClasses"
    @dragover.prevent
    @drop.prevent="onDropDragZone"
    @dragenter="onDragEnterDragZone"
    @dragleave="onDragLeaveDragZone"
  >
    <FileField
      name="file"
      @change="onChangeFile"
      fileType="image/jpg,image/jpeg,iamge/png"
      :text="fileFieldText"
    />
    <div class="description">直接把图像拖放到这里</div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import store from '../../../app/app.store';
import FileField from '../../../app/components/file-field.vue';

const emits = defineEmits(['change']);

const fileFieldText = computed(() => '选择文件');

const previewImage = computed(() => store.getters['file/create/previewImage']);

const onChangeFile = (files) => {
  emits('change', files);
};

const isOverlay = ref(false);

const fileCreateDragZoneClasses = computed(() => [
  'file-create-drag-zone',
  { overlay: isOverlay.value },
  { active: previewImage.value },
]);

const onDropDragZone = (event) => {
  const allowedFileTypes = ['image/jpg', 'image/jpeg', 'image/png'];
  const selectedFile = event.dataTransfer.files[0];

  if (allowedFileTypes.some((type) => type === selectedFile.type)) {
    emits('change', event.dataTransfer.files);
  } else {
    store.dispatch('notification/pushMessage', {
      content: '不支持上传此类型的文件',
    });
  }

  isOverlay.value = false;
};

const onDragEnterDragZone = () => {
  isOverlay.value = true;
};

const onDragLeaveDragZone = () => {
  isOverlay.value = false;
};
</script>

<style scoped>
@import './styles/file-create-drag-zone.css';
</style>
