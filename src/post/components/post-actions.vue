<template>
  <div class="post-actions">
    <button
      :class="deleteButtonClasses"
      @click="onClickDeleteButton"
      v-if="useDeleteButton"
    >
      {{ deleteButtonText }}
    </button>
    <button :class="submitButtonClasses" @click="onClickSubmitButton">
      {{ submitButtonText }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import store from '../../app/app.store';

const route = useRoute();

const props = defineProps({
  size: {
    type: String,
  },
  useDeleteButton: {
    type: Boolean,
  },
});

const emits = defineEmits(['update', 'create', 'delete']);

// const { post: post_id } = route.query;

const unsaved = computed(() => store.getters['post/create/unsaved']);
const postId = computed(() => store.getters['post/create/postId']);

const submitButtonClasses = computed(() => [
  'button',
  props.size,
  { outline: unsaved.value },
]);

const submitButtonText = computed(() => (postId.value ? '更新' : '发布'));
const title = computed(() => store.getters['post/create/title']);
const content = computed(() => store.getters['post/create/content']);

const onClickSubmitButton = () => {
  if (!title.value.trim()) return;
  if (postId.value) {
    emits('update');
  } else {
    emits('create');
  }
};

const confirmDelete = ref(false);
const timeoutId = ref(null);
const deleteButtonText = computed(() =>
  confirmDelete.value ? '确定删除' : '删除',
);
const deleteButtonClasses = computed(() => [
  'button',
  props.size,
  'red',
  { outline: !confirmDelete.value },
]);

const onClickDeleteButton = () => {
  if (timeoutId.value) {
    clearInterval(timeoutId.value);
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
@import './styles/post-actions.css';
</style>
