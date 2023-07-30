<template>
  <div :class="postListClasses">
    <postListItem v-for="post in posts" :item="post" :key="post.id" />
    <template v-if="loading">
      <postListItemSkeleton v-for="number in 20" :key="number" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed, onUnmounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import postListItem from './post-list-item.vue';
import postListItemSkeleton from './post-list-item-skeleton.vue';
import { getStorages } from '../../../app/app.service';

const store = useStore();
const router = useRoute();

const props = defineProps({
  sort: {
    type: String,
  },
  filter: {
    type: Object,
  },
});

// const sort = ref('');

// sort.value = router.name === 'postIndexPopular' ? 'most_comments' : 'latest';

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
  props,
  () => {
    store.dispatch('post/index/getPosts', {
      sort: props.sort,
      filter: props.filter,
    });
  },
  {
    deep: true,
  },
);
</script>

<style scoped>
@import url('../../../app/styles/post-list.css');
</style>
