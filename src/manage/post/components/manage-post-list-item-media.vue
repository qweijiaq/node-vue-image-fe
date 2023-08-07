<template>
  <div class="manage-post-list-item-media">
    <router-link class="link" :to="itemLinkTo">
      <img class="image" :src="item?.file.size.medium" alt="" />
    </router-link>
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
