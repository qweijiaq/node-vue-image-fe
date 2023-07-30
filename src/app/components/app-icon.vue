<template>
  <i :class="appIconClasses" :style="appIconStyles">{{ props.name }}</i>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const theme = computed(() => store.getters['layout/theme']);

const props = defineProps({
  name: {
    type: String,
    default: 'favorite',
  },
  color: {
    type: String,
  },
  size: {
    type: [String, Number],
    default: 24,
  },
});

const appIconClasses = computed(() => {
  return ['app-icon'];
});

const appIconStyles = computed(() => {
  let color;
  if (props.color) {
    color = props.color;
  } else {
    color = theme.value === 'dark' ? '#585858' : '#000000';
  }
  return {
    color,
    fontSize: props.size + 'px',
    width: props.size + 'px',
  };
});
</script>

<style scoped>
@import url(./styles/app-icon.css);
</style>
