<template>
  <div class="comment-list-item">
    <div class="small">
      <user-avatar :user="item?.user" link="user" />
    </div>
    <div class="content">
      <commentListItemMeta :item="props.item" />
      <commentListItemContent :item="props.item" />
      <commentListItemActions
        :item="props.item"
        @toggle-replies="onToggleReplies"
      />
      <replyIndex :comment="props.item" v-if="showReplies" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import userAvatar from '../../../user/components/user-avatar.vue';
import commentListItemMeta from './comment-list-item-meta.vue';
import commentListItemContent from './comment-list-item-content.vue';
import commentListItemActions from './comment-list-item-actions.vue';
import replyIndex from '../../../reply/index/reply-index.vue';
import { ref } from 'vue';

const props = defineProps({
  item: {
    type: Object,
  },
});

const showReplies = ref(false);

const onToggleReplies = (data) => {
  showReplies.value = data;
};
</script>

<style scoped>
@import url('./styles/comment-list-item.css');
</style>
