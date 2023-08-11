<template>
  <div class="comment-list">
    <CommentListItem
      v-for="comment in comments"
      :key="comment.id"
      :item="comment"
    />
  </div>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex';
import { computed, watch, ref } from 'vue';
import CommentListItem from './comment-list-item.vue';

const store = useStore();

const props = defineProps({
  filter: {
    type: Object,
  },
});

const loading = computed(() => store.getters['comment/index/loading']);
const comments = computed(() => {
  try {
    return store.getters['comment/index/comments'];
  } catch (e) {
    return [];
  }
});

const hasMore = computed(() => store.getters['comment/index/hasMore']);
const sideSheetTouchdown = computed(
  () => store.getters['layout/sideSheetTouchdown'],
);

const useShowTouchdown = computed(() => store.getters['user/show/touchdown']);

store.dispatch('comment/index/getComments', { filter: props.filter });

watch(
  props,
  () => {
    store.dispatch('comment/index/getComments', { filter: props.filter });
  },
  { deep: true },
);

watch(sideSheetTouchdown, (newValue) => {
  if (newValue && hasMore.value && !loading.value) {
    try {
      store.dispatch('comment/index/getComments', { filter: props.filter });
    } catch (error: any) {
      store.dispatch('notification/pushMessage', {
        content: error.data.message,
      });
    }
  }
});

watch(useShowTouchdown, (newValue) => {
  if (newValue && hasMore.value && !loading.value) {
    try {
      store.dispatch('comment/index/getComments', { filter: props.filter });
    } catch (error: any) {
      store.dispatch('notification/pushMessage', {
        content: error.data.message,
      });
    }
  }
});
</script>

<style scoped></style>
