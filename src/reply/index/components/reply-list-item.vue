<template>
  <div class="reply-list-item">
    <div class="small">
      <UserAvatar :user="props.item?.user" link="user" />
    </div>
    <div class="content">
      <ReplyListItemMeta :item="props.item" />
      <ReplyListItemContent
        :item="reply"
        @click="onClickReplyListItemContent"
        v-if="!isEditing"
      />
      <CommentEdit
        v-if="isEditing"
        :comment="props.item"
        @updated="onUpdatedReply"
      />
      <ReplyListItemActions
        :item="props.item"
        :showOperations="showOperations"
        :comment="props.comment"
        :isEditing="isEditing"
        @editing="onEditingReply"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import UserAvatar from '../../../user/components/user-avatar.vue';
import ReplyListItemMeta from './reply-list-item-meta.vue';
import ReplyListItemContent from './reply-list-item-content.vue';
import ReplyListItemActions from './reply-list-item-actions.vue';
import CommentEdit from '../../../comment/edit/comment-edit.vue';
import { ref } from 'vue';

const props = defineProps({
  item: {
    type: Object,
  },

  comment: {
    type: Object,
  },
});

const showOperations = ref(false);

const reply = ref(props.item);
const isEditing = ref(false);

const onClickReplyListItemContent = () =>
  (showOperations.value = !showOperations.value);

const onEditingReply = () => (isEditing.value = !isEditing.value);

const onUpdatedReply = (data) => {
  reply.value.content = data;
  isEditing.value = false;
};
</script>

<style scoped>
@import url('./styles/reply-list-item.css');
</style>
