<template>
  <div class="comment-list-item-content">
    <div class="qoute" v-if="item.repliedComment">
      {{ item.repliedComment.content }}
    </div>
    <div class="content">
      {{ props.item?.content }}
    </div>
    <div class="meta" v-if="item.post">
      <router-link class="link" :to="postTitleLinkTo">
        # {{ item.post.title }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  item: {
    type: Object,
  },
});

const postTitleLinkTo = computed(() => {
  return {
    name: 'postShow',
    params: {
      postId: props.item.post.id,
    },
  };
});
</script>

<style scoped>
@import url('./styles/comment-list-item-content.css');
</style>
