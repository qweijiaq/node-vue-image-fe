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

const useAdmin = computed(() => store.getters['user/useAdmin']);

const getManagePosts = () => {
  store.dispatch('post/index/getPosts', {
    filter: filter.value,
    manage: 'true',
    admin: '' + useAdmin.value,
  });
};

if (currentUser.value) {
  getManagePosts();
}

watch(
  () => filter.value,
  () => {
    getManagePosts();
  },
);

watch(
  () => useAdmin.value,
  () => {
    getManagePosts();
  },
);

const managePostListRef = ref(null);

onUpdated(() => {
  if (document) {
    const { clientHeight: documentHeight } = document.documentElement;
    if (managePostListRef.value) {
      const { clientHeight: componentHeight } = managePostListRef.value;
      if (
        componentHeight < documentHeight + 200 &&
        hasMore.value &&
        !loading.value
      ) {
        getManagePosts();
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
      getManagePosts();
    }

    prevScrollTop.value = scrollTop;
  }
};

const onKeydownWindow = (event: any) => {
  if ((event.metaKey || event.ctrlKey) && event.key === 'Backspace') {
    store.dispatch('manage/select/deleteSelectedPosts');
  }
};

if (window) {
  window.addEventListener('scroll', onScrollWindow);
  window.scrollTo({ top: 0 });
  window.addEventListener('keydown', onKeydownWindow);
}

onUnmounted(() => {
  if (window) {
    window.removeEventListener('scroll', onScrollWindow);
    window.removeEventListener('keydown', onKeydownWindow);
  }
});
</script>

<style scoped>
@import './styles/manage-post-list.css';
</style>
