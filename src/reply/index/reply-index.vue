<template>
  <div class="reply-index">
    <ReplyList :list="replies(props.comment?.id)" :comment="props.comment" />
  </div>
</template>

<script lang="ts" setup>
import { computed, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import ReplyList from './components/reply-list.vue';
import { socket } from '../../app/app.service';

const store = useStore();

const props = defineProps({
  comment: {
    type: Object,
  },
});

store.dispatch('reply/index/getReplies', props.comment?.id);

const loading = computed(() => store.getters['reply/index/loading']);
const replies = computed(() => store.getters['reply/index/replies']);

const onCommentReplyCreated = ({ reply, socketId }) => {
  if (socket.id === socketId) return;
  store.commit('reply/index/addReplyItem', reply);
};

const onCommentReplyDeleted = ({ reply, socketId }) => {
  if (socket.id === socketId) return;
  const {
    id: replyId,
    repliedComment: { id: commentId },
  } = reply;
  store.commit('reply/index/removeReplyItem', { replyId, commentId });
};

const onCommentReplyUpdated = ({ reply, socketId }) => {
  if (socket.id === socketId) return;

  store.commit('reply/index/setReplyItemContent', reply);
};

socket.on('commentReplyCreated', onCommentReplyCreated);
socket.on('commentReplyDeleted', onCommentReplyDeleted);
socket.on('commentReplyUpdated', onCommentReplyUpdated);

onUnmounted(() => {
  socket.off('commentReplyCreated', onCommentReplyCreated);
  socket.off('commentReplyDeleted', onCommentReplyDeleted);
  socket.off('commentReplyUpdated', onCommentReplyUpdated);
});
</script>

<style scoped>
@import url('./styles/reply-index.css');
</style>
