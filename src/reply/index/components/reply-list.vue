<template>
  <div class="reply-list">
    <replyListItem
      v-for="reply in props.list"
      :key="reply.id"
      :item="reply"
      :comment="props.comment"
    />
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
  comment: {
    type: Object,
  },
});
</script>

<style scoped></style>
