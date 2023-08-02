<template>
  <div class="comment-list-item">
    <div class="small">
      <UserAvatar :user="props.item?.user" link="user" />
    </div>
    <div class="content">
      <CommentListItemMeta :item="props.item" />
      <CommentListItemContent
        :item="params.comment"
        @click="onClickCommentListItemContent"
        v-if="!isEditing"
      />
      <CommentEdit
        v-if="isEditing"
        :comment="props.item"
        @updated="onUpdateComment"
      />
      <CommentListItemActions
        :item="props.item"
        @toggle-replies="onToggleReplies"
        :showOperations="showOperations"
        @editing="onEditingComment"
        :isEditing="isEditing"
        @replying="onReplyingComment"
        :isReplying="isReplying"
      />
      <ReplyCreate
        v-if="isReplying"
        :comment="props.item"
        :showReplies="showReplies"
      />
      <ReplyIndex :comment="props.item" v-if="showReplies" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import UserAvatar from '../../../user/components/user-avatar.vue';
import CommentListItemMeta from './comment-list-item-meta.vue';
import CommentListItemContent from './comment-list-item-content.vue';
import CommentListItemActions from './comment-list-item-actions.vue';
import CommentEdit from '../../edit/comment-edit.vue';
import ReplyIndex from '../../../reply/index/reply-index.vue';
import ReplyCreate from '../../../reply/create/reply-create.vue';
import { ref, reactive } from 'vue';

const props = defineProps({
  item: {
    type: Object,
  },
});

const showReplies = ref(false);
const showOperations = ref(false);

const onToggleReplies = (data: any) => {
  showReplies.value = data;
};

const onClickCommentListItemContent = () => {
  showOperations.value = !showOperations.value;
};

const isEditing = ref(false);
const isReplying = ref(false);

const onEditingComment = () => {
  isEditing.value = !isEditing.value;
};

const onReplyingComment = () => {
  isReplying.value = !isReplying.value;
};

const params = reactive({
  comment: props.item || {},
});

const onUpdateComment = (data: any) => {
  params.comment.content = data;
  isEditing.value = false;
};
</script>

<style scoped>
@import url('./styles/comment-list-item.css');
</style>
