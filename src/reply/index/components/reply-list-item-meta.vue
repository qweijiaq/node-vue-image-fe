<template>
  <div class="reply-list-item-meta">
    <userName :user="props.item?.user" />
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
@import url('./styles/reply-list-item-meta.css');
</style>
