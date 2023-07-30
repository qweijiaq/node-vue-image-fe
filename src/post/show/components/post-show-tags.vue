<template>
  <div class="post-show-tags">
    <postTag v-for="tag in props.tags" :key="tag?.id" :tag="tag" />
  </div>
</template>

<script lang="ts" setup>
import postTag from '../../components/post-tag.vue';

interface TagType {
  id?: number;
}

const props = defineProps({
  tags: {
    type: Array<TagType>,
  },
});
</script>

<style scoped>
@import url('./styles/post-show-tags.css');
</style>
