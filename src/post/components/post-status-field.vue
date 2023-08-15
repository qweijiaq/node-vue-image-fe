<template>
  <div class="post-status-field">
    <CheckboxField
      v-for="{ value, text } in statusFields"
      :key="value"
      :value="value"
      :text="text"
      name="status"
      type="radio"
      v-model="postStatus"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import store from '../../app/app.store';
import CheckboxField from '../../app/components/checkbox-field.vue';

const statusFields = ref([
  {
    value: 'draft',
    text: '私有',
  },
  {
    value: 'published',
    text: '公开',
  },
]);

const status = computed(() => store.getters['post/create/status']);
const unsaved = computed(() => store.getters['post/create/unsaved']);

const postStatus = computed({
  get() {
    return status.value;
  },
  set(value) {
    store.commit('post/create/setStatus', value);
    store.commit('post/create/setUnsaved', true);
  },
});
</script>

<style scoped>
@import './styles/post-status-field.css';
</style>
