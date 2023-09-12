<template>
  <div :class="['page-header', { shadow: data.shadow }]">
    <div class="container">
      <AppToolbar />
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppToolbar from '@/app/toolbar/app-toolbar.vue';
import { onUnmounted, reactive } from 'vue';

const data = reactive({
  // 滚动时的头部阴影是否显示
  shadow: false,
});

// 滚动事件
const onScrollWindow = () => {
  if (document) {
    const { scrollTop } = document.documentElement;
    // 当页面滚动大于 120px 时，设置阴影
    data.shadow = scrollTop > 120 ? true : false;
  }
};

// 监听 scroll 事件
if (window) {
  window.addEventListener('scroll', onScrollWindow);
}

// 取消监听 scroll 事件
onUnmounted(() => {
  if (window) {
    window.removeEventListener('scroll', onScrollWindow);
  }
});
</script>

<style scoped></style>
