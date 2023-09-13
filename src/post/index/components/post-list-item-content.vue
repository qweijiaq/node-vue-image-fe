<template>
  <div class="post-list-item-content">
    <div class="small">
      <userAvatar :user="props.item?.user" link="user" />
    </div>
    <div class="header">
      <div class="text">
        <router-link class="link" :to="itemLinkTo">{{
          props.item?.title
        }}</router-link>
      </div>
      <div class="meta">
        <userName :user="props.item?.user" />
      </div>
    </div>
    <div class="actions">
      <PostDiggAction class="action" :post="item" />
      <PostCommentAction class="action" :post="item" actionType="switch" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import userAvatar from '../../../user/components/user-avatar.vue';
import userName from '../../../user/components/user-name.vue';
import PostDiggAction from '../../components/post-digg-action.vue';
import PostCommentAction from '../../components/post-comment-action.vue';

const props = defineProps({
  // 单个帖子
  item: {
    type: Object,
  },
});

// 跳转路由
const itemLinkTo = computed(() => {
  return {
    name: 'postShow',
    params: {
      postId: props.item?.id,
    },
  };
});
</script>

<style scoped>
@import url('./styles/post-list-item-content.css');
</style>
