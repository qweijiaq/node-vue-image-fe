<template>
  <div class="comment-index">
    <CommentList :filter="filter" />
  </div>
</template>

<script lang="ts" setup>
import CommentList from './components/comment-list.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();

const sideSheetProps = computed(() => store.getters['layout/sideSheetProps']);
const filter = computed(() => sideSheetProps.value.filter);
</script>

<style scoped>
@import url('./styles/comment-index.css');
</style>
