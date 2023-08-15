<template>
  <div class="comment-index">
    <CommentList :filter="filter" />
  </div>
</template>

<script lang="ts" setup>
import CommentList from './components/comment-list.vue';
import { useStore } from 'vuex';
import { computed, onUnmounted } from 'vue';
import { socket } from '../../app/app.service';

const store = useStore();

const sideSheetProps = computed(() => store.getters['layout/sideSheetProps']);
const filter = computed(() => sideSheetProps.value.filter);

const onCommentCreated = ({ comment, socketId }) => {
  if (socket.id === socketId) return;

  store.commit('comment/index/addCommentItem', comment);
};

const onCommentUpdated = ({ comment, socketId }) => {
  if (socket.id === socketId) return;

  store.commit('comment/index/setCommentItemContent', comment);
};

const onCommentDeleted = ({ comment, socketId }) => {
  if (socket.id === socketId) return;

  store.commit('comment/index/removeCommentItem', comment.id);
};

const onCommentReplyCreated = ({ reply, socketId }) => {
  if (socket.id === socketId) return;
  store.commit('comment/index/increaseTotalReplies', reply.repliedComment.id);
};

const onCommentReplyDeleted = ({ reply, socketId }) => {
  if (socket.id === socketId) return;
  store.commit('comment/index/decreaseTotalReplies', reply.repliedComment.id);
};

socket.on('commentCreated', onCommentCreated);
socket.on('commentUpdated', onCommentUpdated);
socket.on('commentDeleted', onCommentDeleted);
socket.on('commentReplyCreated', onCommentReplyCreated);
socket.on('commentReplyDeleted', onCommentReplyDeleted);

onUnmounted(() => {
  socket.off('commentCreated', onCommentCreated);
  socket.off('commentUpdated', onCommentUpdated);
  socket.off('commentDeleted', onCommentDeleted);
  socket.off('commentReplyCreated', onCommentReplyCreated);
  socket.off('commentReplyDeleted', onCommentReplyDeleted);
});
</script>

<style scoped>
@import url('./styles/comment-index.css');
</style>
