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
import userAvatar from '../../../user/components/user-avatar.vue';
import userName from '../../../user/components/user-name.vue';
import PostDiggAction from '../../components/post-digg-action.vue';
import PostCommentAction from '../../components/post-comment-action.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const props = defineProps({
  item: {
    type: Object,
  },
});

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
