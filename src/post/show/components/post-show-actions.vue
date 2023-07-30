<template>
  <div class="post-show-actions">
    <div class="action">
      <div class="icon">
        <appIcon name="favorite" />
      </div>
      <div class="text">{{ props.post?.totalDiggs }}</div>
    </div>
    <div class="action">
      <div class="icon">
        <button class="button basic" @click="onClickCommentsBtn">
          <appIcon name="comment" />
        </button>
      </div>
      <div class="text">{{ props.post?.totalComments }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import appIcon from '../../../app/components/app-icon.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();

const props = defineProps({
  post: {
    type: Object,
  },
});

const sideSheetComponent = computed(
  () => store.getters['layout/sideSheetComponent'],
);

if (sideSheetComponent.value) {
  store.commit('layout/setSideSheetProps', {
    filter: {
      post: props.post?.id,
    },
  });
}

const onClickCommentsBtn = () => {
  if (sideSheetComponent.value) {
    store.commit('layout/resetSideSheetComponent');
  } else {
    store.commit('layout/setSideSheetComponent', 'CommentSideSheet');
    store.commit('layout/setSideSheetProps', {
      filter: {
        post: props.post?.id,
      },
    });
  }
};
</script>

<style scoped>
@import url('./styles/post-show-actions.css');
</style>
