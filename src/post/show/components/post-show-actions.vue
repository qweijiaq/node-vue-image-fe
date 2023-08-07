<template>
  <div class="post-show-actions">
    <PostDiggAction class="action" :post="post" />
    <PostCommentAction class="action" :post="post" actionType="switch" />
  </div>
</template>

<script lang="ts" setup>
import PostDiggAction from '../../components/post-digg-action.vue';
import PostCommentAction from '../../components/post-comment-action.vue';
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

store.commit('layout/setSideSheetComponent', 'CommentSideSheet');

if (sideSheetComponent.value) {
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
