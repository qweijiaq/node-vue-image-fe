<template>
  <div class="manage-post-list" ref="managePostListRef">
    <ManagePostListItem v-for="post in posts" :key="post.id" :item="post" />
    <template v-if="loading">
      <ManagePostListItemSkeleton v-for="number in 20" :key="number" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed, watch, ref, onUnmounted, onUpdated } from 'vue';
import store from '../../../app/app.store';
import ManagePostListItem from './manage-post-list-item.vue';
import ManagePostListItemSkeleton from './manage-post-list-item-skeleton.vue';

const currentUser = computed(() => store.getters['user/currentUser']);
const loading = computed(() => store.getters['post/index/loading']);
const posts = computed(() => store.getters['post/index/posts']);
const hasMore = computed(() => store.getters['post/index/hasMore']);
const filter = computed(() => ({
  user: currentUser.value ? currentUser.value.id : null,
  action: 'published',
}));

if (currentUser.value) {
  store.dispatch('post/index/getPosts', { filter: filter.value });
}

watch(
  () => filter.value,
  () => {
    store.dispatch('post/index/getPosts', { filter: filter.value });
  },
);

const managePostListRef = ref(null);

onUpdated(() => {
  if (document) {
    const { clientHeight: documentHeight } = document.documentElement;
    if (managePostListRef.value) {
      const { clientHeight: componentHeight } = managePostListRef.value;
      if (componentHeight < documentHeight && hasMore.value && !loading.value) {
        store.dispatch('post/index/getPosts', {
          filter: filter.value,
        });
      }
    }
  }
});

const prevScrollTop = ref(0);

const onScrollWindow = () => {
  if (document) {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const height = clientHeight + scrollTop + 200;
    const touchDown = scrollHeight - height < 0;
    const scrollDown = scrollTop > prevScrollTop.value;

    if (touchDown && scrollDown && !loading.value && hasMore.value) {
      store.dispatch('post/index/getPosts', {
        filter: filter.value,
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
</script>

<style scoped>
@import './styles/manage-post-list.css';
</style>
