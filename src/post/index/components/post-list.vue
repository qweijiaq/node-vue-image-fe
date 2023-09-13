<template>
  <div :class="postListClasses">
    <PostListItem v-for="post in posts" :item="post" :key="post.id" />
    <template v-if="loading">
      <PostListItemSkeleton v-for="number in 20" :key="number" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed, onUnmounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import PostListItem from './post-list-item.vue';
import PostListItemSkeleton from './post-list-item-skeleton.vue';
import { getStorages } from '../../../app/app.service';

const store = useStore();

const props = defineProps({
  sort: {
    type: String,
  },
  filter: {
    type: Object,
  },
});

store.commit('post/index/resetPosts');

store.commit('post/index/setPosts', []);

const loading = computed(() => store.getters['post/index/loading']);

const fn = async () => {
  await store.dispatch('post/index/getPosts', {
    sort: props.sort,
    filter: props.filter,
  });
};
fn();

const posts = computed(() => {
  try {
    return store.getters['post/index/posts'];
  } catch (e) {
    return [];
  }
});

const layout = computed(() => store.getters['post/index/layout']);

const postListClasses = computed(() => ['post-list', layout.value]);

const _layout = getStorages('post-list-layout');
if (_layout) {
  store.commit('post/index/setLayout', _layout);
} else {
  store.commit('post/index/setLayout', 'flow');
}

const prevScrollTop = ref(0);

const hasMore = computed(() => store.getters['post/index/hasMore']);

const onScrollWindow = () => {
  if (document) {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const height = clientHeight + scrollTop + 200;
    const touchDown = scrollHeight - height < 0;
    const scrollDown = scrollTop > prevScrollTop.value;

    if (touchDown && scrollDown && !loading.value && hasMore.value) {
      store.dispatch('post/index/getPosts', {
        sort: props.sort,
        filter: props.filter,
      });
    }

    prevScrollTop.value = scrollTop;
  }
};

if (window) {
  window.addEventListener('scroll', onScrollWindow);
  window.scrollTo({ top: 0 });
}

onUnmounted(() => {
  if (window) {
    window.removeEventListener('scroll', onScrollWindow);
  }
});

watch(
  () => [props.sort, props.filter],
  () => {
    store.dispatch('post/index/getPosts', {
      sort: props.sort,
      filter: props.filter,
    });
  },
);
</script>

<style scoped>
@import url('../../../app/styles/post-list.css');
</style>
