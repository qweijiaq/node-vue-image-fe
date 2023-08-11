<template>
  <div class="manage-post-list-item-media">
    <div class="link">
      <img class="image" :src="item?.file.size.medium" alt="" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  item: {
    type: Object,
  },
});

const itemLinkTo = computed(() => ({
  name: 'postShow',
  params: {
    postId: props.item?.id,
  },
}));
</script>

<style scoped>
@import './styles/manage-post-list-item-media.css';
</style>
