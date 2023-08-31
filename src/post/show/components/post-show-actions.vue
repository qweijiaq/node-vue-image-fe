<template>
  <div class="post-show-actions">
    <PostDiggAction class="action" :post="post" />
    <PostCommentAction class="action" :post="post" />
    <PostDownloadAction class="action" :post="post" />
  </div>
</template>

<script lang="ts" setup>
import PostDiggAction from '../../components/post-digg-action.vue';
import PostCommentAction from '../../components/post-comment-action.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';
import PostDownloadAction from '../../components/post-download-action.vue';

const store = useStore();

const props = defineProps({
  post: {
    type: Object,
  },
});

const sideSheetComponent = computed(
  () => store.getters['layout/sideSheetComponent'],
);

if (!sideSheetComponent.value) {
  store.commit('layout/setSideSheetComponent', 'PostSideSheet');
}

if (sideSheetComponent.value === 'PostSideSheet') {
  store.commit('layout/setSideSheetProps', {
    post: props.post,
    disableCloseButton: true,
  });
}

if (sideSheetComponent.value === 'CommentSideSheet') {
  store.commit('layout/setSideSheetProps', {
    filter: {
      post: props.post?.id,
    },
  });
}
</script>

<style scoped>
@import url('./styles/post-show-actions.css');
</style>
