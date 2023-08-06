<template>
  <div class="post-show-edit" v-if="canEdit">
    <router-link class="button pill" :to="editLinkTo">编辑</router-link>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import store from '../../../app/app.store';

const props = defineProps({
  post: {
    type: Object,
  },
});

const currentUser = computed(() => store.getters['user/currentUser']);

const editLinkTo = computed(() => {
  return {
    name: 'postCreate',
    query: {
      post: props.post?.id,
    },
  };
});

const canEdit = computed(() => {
  const ownPost =
    currentUser.value && currentUser.value?.id === props.post?.user.id;
  const isAdmin = currentUser.value && currentUser.value?.id === 1;
  return ownPost || isAdmin;
});
</script>

<style scoped>
@import './styles/post-show-edit.css';
</style>
