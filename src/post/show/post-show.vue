<template>
  <postShowSkeleton :class="postShowClasses" v-if="!showPost" />
  <div :class="postShowClasses" v-if="showPost">
    <postShowMedia :post="post" @click="onClickPostShowMedia" />
    <div class="section meta actions">
      <postShowFileMeta :post="post" />
      <postShowActions :post="post" />
    </div>
    <postShowHeader :post="post" @click="onClickPostHandle" />
    <postShowContent :post="post" />
    <postShowTags v-if="post.tags" :tags="post.tags" />
    <PostShowEdit :post="post" v-if="showPostEdit" />
  </div>
</template>

<script lang="ts" setup>
import { computed, onUnmounted, ref } from 'vue';
import { useStore } from 'vuex';
import postShowMedia from './components/post-show-media.vue';
import postShowHeader from './components/post-show-header.vue';
import postShowContent from './components/post-show-content.vue';
import postShowActions from './components/post-show-actions.vue';
import postShowFileMeta from './components/post-show-file-meta.vue';
import postShowTags from './components/post-show-tags.vue';
import postShowSkeleton from './components/post-show-skeleton.vue';
import PostShowEdit from './components/post-show-edit.vue';
import { getStorages, setStorages, socket } from '../../app/app.service';
import router from '../../app/app.router';

const store = useStore();

const props = defineProps({
  postId: {
    type: String,
  },
});

store.dispatch('post/show/getPostById', props.postId);

const _layout = getStorages('post-show-layout');
if (_layout) {
  store.commit('post/show/setLayout', _layout);
}

const loading = computed(() => store.getters['post/show/loading']);
const post = computed(() => store.getters['post/show/post']);
const layout = computed(() => store.getters['post/show/layout']);
const sideSheetComponent = computed(
  () => store.getters['layout/sideSheetComponent'],
);
const posts = computed(() => store.getters['post/index/posts']);
const showPost = computed(() => !loading.value && post.value);
const isSideSheetActive = computed(
  () => store.getters['layout/isSideSheetActive'],
);
const postShowClasses = computed(() => [
  'post-show',
  layout.value,
  { aside: isSideSheetActive.value },
]);

const onClickPostShowMedia = () => {
  const _layout = `${layout.value ? '' : 'flow'}`;
  store.commit('post/show/setLayout', _layout);
  setStorages('post-show-layout', _layout);
};

// eslint-disable-next-line
const onKeyUpWindow = (event: any) => {
  if (event.ctrlKey || event.metaKey) return;
  switch (event.key) {
    case 'b':
      if (posts.value.length) {
        router.back();
      }
      break;
  }
};

if (window) {
  window.addEventListener('keyup', onKeyUpWindow);
}

onUnmounted(() => {
  if (window) {
    window.removeEventListener('keyup', onKeyUpWindow);
  }
});

const showPostEdit = ref(false);
const onClickPostHandle = () => {
  showPostEdit.value = !showPostEdit.value;
};

const filterItems = computed(() => store.getters['post/index/filterItems']);

const onUserDiggPostCreated = ({ post_id, socketId }) => {
  // console.log(post_id, socketId);
  if (socket.id === socketId) return;

  store.commit('post/show/setPostTotalDiggs', {
    post_id,
    actionType: 'increase',
  });
};

const onUserDiggPostDeleted = ({ post_id, socketId }) => {
  // console.log(post_id, socketId);
  if (socket.id === socketId) return;

  store.commit('post/show/setPostTotalDiggs', {
    post_id,
    actionType: 'decrease',
  });
};

const onCommentCreated = ({ comment }) => {
  store.commit('post/show/setPostTotalComments', {
    postId: comment.post.id,
    actionType: 'increase',
  });
};

const onCommentDeleted = ({ comment }) => {
  store.commit('post/show/setPostTotalComments', {
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

<style scoped>
@import url('./styles/post-show.css');
</style>
