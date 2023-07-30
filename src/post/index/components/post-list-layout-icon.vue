<template>
  <i :class="postListLayoutIconClass" @click="$emit('click', props.name)"></i>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();

const props = defineProps({
  name: {
    type: String,
  },
});

const emits = defineEmits(['click']);

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
</script>

<style scoped>
@import url('./styles/post-list-layout-icon.css');
</style>
