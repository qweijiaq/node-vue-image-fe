<template>
  <div class="post-title-field">
    <TextField placeholder="标题" v-model="postTitle" @dirty="onDirtyText" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import TextField from '../../app/components/text-field.vue';
import store from '../../app/app.store';

const title = computed(() => store.getters['post/create/title']);
const unsaved = computed(() => store.getters['post/create/unsaved']);
const postTitle = computed({
  get() {
    return title.value;
  },
  set(value) {
    store.commit('post/create/setTitle', value);
  },
});

const onDirtyText = () => {
  if (!unsaved.value) {
    store.commit('post/create/setUnsaved', true);
  }
};
</script>

<style scoped>
@import './styles/post-title-field.css';
</style>
