<template>
  <div :class="fileCreateMediaClasses">
    <img :src="previewImage" class="image" @load="onLoadImage" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import store from '../../app/app.store';

const loaded = ref(false);
const previewImage = computed(() => store.getters['file/create/previewImage']);
const fileCreateMediaClasses = computed(() => [
  'file-create-media',
  { loading: !loaded.value },
]);

const onLoadImage = () => {
  loaded.value = true;
};
</script>

<style scoped>
@import './styles/file-create-media.css';
</style>
