<template>
  <div class="post-content-field">
    <TextareaField
      placeholder="描述"
      class="bordered"
      :rows="1"
      v-model="postContent"
      @dirty="onDirtyTextarea"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import store from '../../app/app.store';
import TextareaField from '../../app/components/textarea-field.vue';

const content = computed(() => store.getters['post/create/content']);
const postContent = computed({
  get() {
    return content.value;
  },
  set(value) {
    store.commit('post/create/setContent', value);
  },
});

const unsaved = computed(() => store.getters['post/create/unsaved']);
const onDirtyTextarea = () => {
  if (!unsaved.value) {
    store.commit('post/create/setUnsaved', true);
  }
};
</script>

<style scoped>
@import './styles/post-content-field.css';
</style>
