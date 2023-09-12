<template>
  <i :class="appIconClasses" :style="appIconStyles">{{ props.name }}</i>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import store from '../app.store';

// 主题色
const theme = computed(() => store.getters['layout/theme']);

const props = defineProps({
  // 图标名
  name: {
    type: String,
    default: 'favorite',
  },
  // 图标颜色
  color: {
    type: String,
  },
  // 图标尺寸
  // String: large、meduim、small
  size: {
    type: [String, Number],
    default: 24,
  },
});

// class 属性
const appIconClasses = computed(() => {
  return ['app-icon'];
});

// 样式
const appIconStyles = computed(() => {
  let color: string;
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
