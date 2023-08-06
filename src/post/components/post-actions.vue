<template>
  <div class="post-actions">
    <button :class="submitButtonClasses" @click="onClickSubmitButton">
      {{ submitButtonText }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import store from '../../app/app.store';

const route = useRoute();

const props = defineProps({
  size: {
    type: String,
  },
});

const emits = defineEmits(['update', 'create']);

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
  if (post_id) {
    emits('update');
  } else {
    emits('create');
  }
};
</script>

<style scoped>
@import './styles/post-actions.css';
</style>
