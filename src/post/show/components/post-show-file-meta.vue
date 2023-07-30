<template>
  <div class="post-show-file-meta">
    <postShowFileMetaKit :kit="kit" />
    <postShowFileMetaSpecs :specs="specs" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import postShowFileMetaKit from './post-show-file-meta-kit.vue';
import postShowFileMetaSpecs from './post-show-file-meta-specs.vue';

const store = useStore();
const props = defineProps({
  post: {
    type: Object,
  },
});

store.dispatch('file/show/getFileById', props.post?.file.id);

const loading = computed(() => store.getters['file/show/loading']);
const kit = computed(() => store.getters['file/show/kit']);
const specs = computed(() => store.getters['file/show/specs']);
</script>

<style scoped>
@import url('./styles/post-show-file-meta.css');
</style>
