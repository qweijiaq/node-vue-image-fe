<template>
  <div class="manage-post-list-item-media">
    <img class="image" :src="item.file.size.small" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';

const props = defineProps({
  item: {
    type: Object,
  },
});
</script>

<style scoped>
@import './styles/manage-post-list-item-media.css';
</style>
