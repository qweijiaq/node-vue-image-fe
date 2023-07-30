<template>
  <i :class="appLogoClasses" :style="appLogoStyles"></i>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const theme = computed(() => store.getters['layout/theme']);

const props = defineProps({
  name: {
    type: String,
    default: 'w32',
  },
  size: {
    type: [String, Number],
    default: 32,
  },
  color: {
    type: String,
  },
});

const appLogoClasses = computed(() => {
  return ['app-logo', props.name];
});

const appLogoStyles = computed(() => {
  let color;
  if (props.color) {
    color = props.color;
  } else {
    color = theme.value === 'dark' ? '#585858' : '#000000';
  }
  return {
    fontSize: props.size + 'px',
    color,
  };
});
</script>

<style scoped>
@import url('./styles/app-logo.css');
</style>
