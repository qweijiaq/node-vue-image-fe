<template>
  <div class="comment-list">
    <commentListItem
      v-for="comment in comments"
      :key="comment.id"
      :item="comment"
    />
  </div>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex';
import { computed, watch } from 'vue';
import commentListItem from './comment-list-item.vue';

const store = useStore();

const props = defineProps({
  filter: {
    type: Object,
  },
});

const loading = computed(() => store.getters['comment/index/loading']);
const comments = computed(() => store.getters['comment/index/comments']);

store.dispatch('comment/index/getComments', { filter: props.filter });

watch(
  props,
  () => {
    store.dispatch('comment/index/getComments', { filter: props.filter });
  },
  { deep: true },
);
</script>

<style scoped>
@import url('./styles/comment-list.css');
</style>
