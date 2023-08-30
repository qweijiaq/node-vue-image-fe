<template>
  <postListFilters v-if="filterItems.length" :filters="filterItems" />
  <postList :sort="sort" :filter="filter" />
</template>

<script lang="ts" setup>
import { useStore } from 'vuex';
import { computed, onUnmounted } from 'vue';
import postList from './components/post-list.vue';
import postListFilters from './components/post-list-filters.vue';
import { socket } from '../../app/app.service';

const store = useStore();

const props = defineProps({
  sort: {
    type: String,
  },
  filter: {
    type: Object,
  },
});

const filterItems = computed(() => store.getters['post/index/filterItems']);

const onUserDiggPostCreated = ({ postId, socketId }) => {
  if (socket.id === socketId) return;

  store.commit('post/index/setPostItemTotalDiggs', {
    postId,
    actionType: 'increase',
  });
};

const onUserDiggPostDeleted = ({ postId, socketId }) => {
  if (socket.id === socketId) return;

  store.commit('post/index/setPostItemTotalDiggs', {
    postId,
    actionType: 'decrease',
  });
};

const onCommentCreated = ({ comment }) => {
  store.commit('post/index/setPostItemTotalComments', {
    postId: comment.post.id,
    actionType: 'increase',
  });
};

const onCommentDeleted = ({ comment }) => {
  store.commit('post/index/setPostItemTotalComments', {
    postId: comment.post.id,
    actionType: 'decrease',
  });
};

socket.on('userDiggPostCreated', onUserDiggPostCreated);
socket.on('userDiggPostDeleted', onUserDiggPostDeleted);
socket.on('commentCreated', onCommentCreated);
socket.on('commentDeleted', onCommentDeleted);

onUnmounted(() => {
  socket.off('userDiggPostCreated', onUserDiggPostCreated);
  socket.off('userDiggPostDeleted', onUserDiggPostDeleted);
  socket.off('commentCreated', onCommentCreated);
  socket.off('commentDeleted', onCommentDeleted);
});
</script>
