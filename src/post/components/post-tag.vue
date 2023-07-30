<template>
  <div class="post-tag">
    <div class="text">
      <router-link class="link" :to="tagNameLinkTo">
        {{ props.tag?.name }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  tag: {
    type: Object,
  },
});

const tagNameLinkTo = computed(() => {
  return {
    name: 'postIndexPopular',
    query: {
      tag: props.tag?.name,
    },
  };
});
</script>

<style scoped>
@import url('./styles/post-tag.css');
</style>
