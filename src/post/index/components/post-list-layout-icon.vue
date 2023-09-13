<template>
  <i :class="postListLayoutIconClass" @click="onClickIcon"></i>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import store from '../../../app/app.store';

const props = defineProps({
  name: {
    type: String,
  },
});

const theme = computed(() => store.getters['layout/theme']);
const layout = computed(() => store.getters['post/index/layout']);

// eslint-disable-next-line
const isActive = (name: any) => layout.value === name;

const postListLayoutIconClass = computed(() => [
  'post-list-layout-icon',
  props.name,
  theme.value,
  { active: isActive(props.name) },
]);

const emits = defineEmits(['click']);

const onClickIcon = () => {
  emits('click', props.name);
};
</script>

<style scoped>
@import url('./styles/post-list-layout-icon.css');
</style>
