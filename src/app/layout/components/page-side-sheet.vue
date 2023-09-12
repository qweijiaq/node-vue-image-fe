<template>
  <transition name="page-side-sheet">
    <div class="page-side-sheet" v-if="isSideSheetActive">
      <CloseButton @click="onClickCloseBtn" v-if="showCloseButton" />
      <CommentSideSheet v-if="sideSheetComponent === 'CommentSideSheet'" />
      <ManagePostSideSheet
        v-if="sideSheetComponent === 'ManagePostSideSheet'"
      />
      <PostSideSheet v-if="sideSheetComponent === 'PostSideSheet'" />
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { computed, onUnmounted } from 'vue';
import store from '../../app.store';
import CommentSideSheet from '@/comment/components/comment-side-sheet.vue';
import CloseButton from '../../components/close-button.vue';
import ManagePostSideSheet from '../../../manage/post/components/manage-post-side-sheet.vue';
import PostSideSheet from '../../../post/side-sheet/post-side-sheet.vue';

const sideSheetComponent = computed(
  () => store.getters['layout/sideSheetComponent'],
);

// 点击关闭按钮
const onClickCloseBtn = () => {
  store.dispatch('layout/closeSideSheet');
};

// 点击键盘上的 Escape 键，等价于点击关闭按钮
// eslint-disable-next-line
const onKeyUpWindow = (event: any) => {
  if (event.key === 'Escape') {
    store.dispatch('layout/closeSideSheet');
  }
};

// 绑定键盘事件的监听
if (window) {
  window.addEventListener('keyup', onKeyUpWindow);
}

// 解绑键盘事件的监听
onUnmounted(() => {
  if (window) {
    window.removeEventListener('keyup', onKeyUpWindow);
  }
});

// 侧板是否展示
const isSideSheetActive = computed(
  () => store.getters['layout/isSideSheetActive'],
);

// 侧板传入的 props 属性
const sideSheetProps = computed(() => store.getters['layout/sideSheetProps']);

// 是否显示"关闭按钮"
const showCloseButton = computed(() => {
  return sideSheetProps.value && sideSheetProps.value.disableCloseButton
    ? false
    : true;
});
</script>

<style scoped>
@import url('./styles/page-side-sheet.css');
</style>
