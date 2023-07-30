<template>
  <div :class="postShowMediaClasses">
    <img class="image" :src="props.post?.file.size.large" @load="onLoadImage" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

const props = defineProps({
  post: {
    type: Object,
  },
});

const loading = ref(true);

const postShowMediaClasses = computed(() => [
  'post-show-media',
  { loading: loading.value },
]);

const onLoadImage = () => {
  loading.value = false;
};
</script>

<style scoped>
@import url('./styles/post-show-media.css');
</style>
