<template>
  <div class="post-comment-action">
    <div class="icon">
      <button class="button basic" @click="onClickCommentsBtn">
        <AppIcon name="comment" />
      </button>
    </div>
    <div class="text" v-if="post?.totalComments">
      {{ post?.totalComments }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import store from '../../app/app.store';
import AppIcon from '../../app/components/app-icon.vue';

const props = defineProps({
  post: {
    type: Object,
  },
  actionType: {
    type: String,
  },
});

const onClickCommentsBtn = () => {
  store.commit('layout/setSideSheetComponent', 'CommentSideSheet');
  store.commit('layout/setSideSheetProps', {
    filter: {
      post: props.post?.id,
    },
  });
  if (props.actionType === 'switch') {
    store.dispatch('layout/switchSideSheet');
  } else {
    store.dispatch('layout/openSideSheet');
  }
};
</script>

<style scoped>
@import './styles/post-comment-action.css';
</style>
