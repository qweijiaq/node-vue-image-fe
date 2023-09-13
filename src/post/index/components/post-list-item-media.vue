<template>
  <div :class="postListItemMediaClasses">
    <router-link class="link" :to="itemLinkTo">
      <img class="image" :src="props.item?.file.size.medium" alt="" />
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  // 单个帖子
  item: {
    type: Object,
  },

  aspectRatio: {
    type: String,
    default: '3-2',
  },
});

// 跳转路由
const itemLinkTo = computed(() => ({
  name: 'postShow',
  params: {
    postId: props.item?.id,
  },
}));

// class 属性
const postListItemMediaClasses = computed(() => [
  'post-list-item-media',
  props.item?.file.orientation,
  `aspect-ratio-${props.aspectRatio}`,
]);
</script>

<style scoped>
@import url('./styles/post-list-item-media.css');
</style>
