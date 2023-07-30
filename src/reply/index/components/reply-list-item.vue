<template>
  <div class="reply-list-item">
    <div class="small">
      <userAvatar :user="props.item?.user" link="user" />
    </div>
    <div class="content">
      <replyListItemMeta :item="props.item" />
      <replyListItemContent :item="props.item" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import userAvatar from '../../../user/components/user-avatar.vue';
import replyListItemMeta from './reply-list-item-meta.vue';
import replyListItemContent from './reply-list-item-content.vue';

const props = defineProps({
  item: {
    type: Object,
  },
});
</script>

<style scoped>
@import url('./styles/reply-list-item.css');
</style>
