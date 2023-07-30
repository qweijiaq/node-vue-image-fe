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
      <div class="action">
        <div class="icon">
          <appIcon name="favorite" />
        </div>
        <div class="text">
          {{ props.item?.totalDiggs }}
        </div>
      </div>
      <div class="action">
        <div class="icon">
          <button class="button basic" @click="onClickCommentBtn">
            <appIcon name="comment" />
          </button>
        </div>
        <div class="text">
          {{ props.item?.totalComments }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import userAvatar from '../../../user/components/user-avatar.vue';
import userName from '../../../user/components/user-name.vue';
import appIcon from '../../../app/components/app-icon.vue';
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

const onClickCommentBtn = () => {
  store.commit('layout/setSideSheetComponent', 'CommentSideSheet');
  store.commit('layout/setSideSheetProps', {
    filter: {
      post: props.item?.id,
    },
  });
};
</script>

<style scoped>
@import url('./styles/post-list-item-content.css');
</style>
