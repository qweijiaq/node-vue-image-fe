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
import { getStorages, setStorages } from '../../app/app.service';
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
const postShowClasses = computed(() => [
  'post-show',
  layout.value,
  { aside: sideSheetComponent.value },
]);

const onClickPostShowMedia = () => {
  const _layout = `${layout.value ? '' : 'flow'}`;
  store.commit('post/show/setLayout', _layout);
  setStorages('post-show-layout', _layout);
};

// eslint-disable-next-line
const onKeyUpWindow = (event: any) => {
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
</script>

<style scoped>
@import url('./styles/post-show.css');
</style>
