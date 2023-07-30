<template>
  <div class="reply-list">
    <replyListItem v-for="reply in props.list" :key="reply.id" :item="reply" />
  </div>
</template>

<script lang="ts" setup>
import replyListItem from './reply-list-item.vue';

interface ListItem {
  id: number;
  content: string;
}

const props = defineProps({
  list: {
    type: Array<ListItem>,
  },
});
</script>

<style scoped>
@import url('./styles/reply-list.css');
</style>
