<template>
  <div :class="postShowMediaClasses">
    <img class="image" :src="image" @load="onLoadImage" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { getImageBase64 } from '../../../file/file.service';

const props = defineProps({
  post: {
    type: Object,
  },
});

const image = ref(null) as any;
const getImage = async () => {
  image.value = await getImageBase64(props.post?.file.size.large);
};
getImage();

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
