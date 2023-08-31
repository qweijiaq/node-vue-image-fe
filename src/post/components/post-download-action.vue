<template>
  <div class="post-download-action">
    <button class="button basic" @click="onClickDownloadButton">
      <AppIcon name="cloud_download" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import AppIcon from '../../app/components/app-icon.vue';
import store from '../../app/app.store';

const props = defineProps({
  post: {
    type: Object,
  },
});

const onClickDownloadButton = () => {
  // 设置页面侧边栏组件
  store.commit('layout/setSideSheetComponent', 'PostSideSheet');
  // 设置页面侧边栏属性
  store.commit('layout/setSideSheetProps', {
    post: props.post,
    disableCloseButton: true,
  });
  // 显示页面侧板
  store.dispatch('layout/openSideSheet');
};
</script>

<style scoped>
@import './styles/post-download-action.css';
</style>
