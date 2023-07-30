<template>
  <div class="user-posts">
    <post-list :sort="props.sort" :filter="props.filter" />
  </div>
</template>

<script lang="ts" setup>
import postList from '../../../post/index/components/post-list.vue';

const props = defineProps({
  sort: {
    type: String,
  },
  filter: {
    type: Object,
  },
});
</script>

<style scoped></style>
