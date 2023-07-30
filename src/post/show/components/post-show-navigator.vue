<template>
  <div class="post-show-navigator">
    <button
      class="button basic"
      @click="onClickBackButton"
      :disabled="!canNavigatorBack"
    >
      <appIcon name="arrow_back" />
    </button>
    <button
      class="button basic"
      @click="onClickForwardButton"
      :disabled="!canNavigatorForward"
    >
      <appIcon name="arrow_forward" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import appIcon from '../../../app/components/app-icon.vue';
import { useStore } from 'vuex';
import { computed, onUnmounted } from 'vue';

const store = useStore();

const onClickBackButton = () => {
  store.dispatch('post/show/goGetPrevPost');
};

const onClickForwardButton = () => {
  store.dispatch('post/show/goGetNextPost');
};

const canNavigatorBack = computed(
  () => store.getters['post/show/canNavigatorBack'],
);
const canNavigatorForward = computed(
  () => store.getters['post/show/canNavigatorForward'],
);

// eslint-disable-next-line
const onKeyUpWindow = (event: any) => {
  switch (event.key) {
    case 'ArrowLeft':
      if (canNavigatorBack.value) {
        store.dispatch('post/show/goGetPrevPost');
      } else {
        store.dispatch('notification/pushMessage', {
          content: '前面没有内容了',
        });
      }
      break;
    case 'ArrowRight':
      if (canNavigatorForward.value) {
        store.dispatch('post/show/goGetNextPost');
      } else {
        store.dispatch('notification/pushMessage', {
          content: '后面没有内容了',
        });
      }
      break;
  }
};

if (window) {
  window.addEventListener('keyup', onKeyUpWindow);
}

onUnmounted(() => {
  if (window) {
    window.removeEventListener('keyup', onKeyUpWindow);
  }
});
</script>

<style scoped>
@import url('./styles/post-show-navigator.css');
</style>
