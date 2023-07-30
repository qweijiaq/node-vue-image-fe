<template>
  <div :class="postListItemClasses">
    <postListItemMedia :item="props.item" aspectRatio="3-2" />
    <postListItemContent :item="props.item" v-if="showPostListItemContent" />
  </div>
</template>

<script lang="ts" setup>
import postListItemMedia from './post-list-item-media.vue';
import postListItemContent from './post-list-item-content.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const props = defineProps({
  item: Object,
});

const layout = computed(() => store.getters['post/index/layout']);

const postListItemClasses = computed(() => [
  'post-list-item',
  props.item?.file.orientation,
  layout.value,
]);

const showPostListItemContent = computed(
  () => !layout.value.includes('-minimal'),
);
</script>

<style scoped>
@import url('./styles/post-list-item.css');
</style>
