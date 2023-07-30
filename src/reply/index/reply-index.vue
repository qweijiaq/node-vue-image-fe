<template>
  <div class="reply-index">
    <reply-list :list="replies(props.comment?.id)" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import replyList from './components/reply-list.vue';

const store = useStore();

const props = defineProps({
  comment: {
    type: Object,
  },
});

store.dispatch('reply/index/getReplies', props.comment?.id);

const loading = computed(() => store.getters['reply/index/loading']);
const replies = computed(() => store.getters['reply/index/replies']);
</script>

<style scoped>
@import url('./styles/reply-index.css');
</style>
