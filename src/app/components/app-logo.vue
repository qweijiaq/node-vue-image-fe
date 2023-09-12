<template>
  <i :class="appLogoClasses" :style="appLogoStyles"></i>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import store from '../app.store';

// 主题色
const theme = computed(() => store.getters['layout/theme']);

const props = defineProps({
  // logo 颜色
  color: {
    type: String,
  },
  // logo 名
  name: {
    type: String,
    default: 'w32',
  },
  // logo 尺寸
  // String: large、meduim、small
  size: {
    type: [String, Number],
    default: 32,
  },
});

// class 属性
const appLogoClasses = computed(() => {
  return ['app-logo', props.name];
});

// 样式
const appLogoStyles = computed(() => {
  let color: string;
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
