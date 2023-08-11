<template>
  <button :class="deleteButtonClasses" @click="onClickDeleteButton">
    {{ deleteButtonText }}
  </button>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';

const emits = defineEmits(['delete']);

const deleteButtonText = computed(() =>
  confirmDelete.value ? '确定删除' : '删除',
);

const deleteButtonClasses = computed(() => [
  'button',
  'red',
  { outline: !confirmDelete.value },
]);

const confirmDelete = ref(false);
const timeoutId = ref();

const onClickDeleteButton = () => {
  if (timeoutId.value) {
    clearTimeout(timeoutId.value);
  }

  if (confirmDelete.value) {
    emits('delete');
  }

  confirmDelete.value = !confirmDelete.value;

  if (confirmDelete.value) {
    timeoutId.value = setTimeout(() => {
      confirmDelete.value = false;
    }, 3000);
  }
};
</script>

<style scoped>
@import './styles/delete-button.css';
</style>
