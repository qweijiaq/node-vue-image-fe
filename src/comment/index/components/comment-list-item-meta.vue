<template>
  <div class="comment-list-item-meta">
    <userName :user="item?.user" />
  </div>
</template>

<script lang="ts" setup>
import userName from '../../../user/components/user-name.vue';

const props = defineProps({
  item: {
    type: Object,
  },
});
</script>

<style scoped>
@import url('./styles/comment-list-item-meta.css');
</style>
