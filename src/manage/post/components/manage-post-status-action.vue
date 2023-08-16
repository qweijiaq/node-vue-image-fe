<template>
  <div class="manage-post-status-action">
    <CircleButton
      :icon="postStatusIcon"
      :active="isActive"
      @click="onClickStatusButton"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import store from '../../../app/app.store';
import CircleButton from '../../../app/components/circle-button.vue';

const props = defineProps({
  post: {
    type: Object,
  },
});

const hasSelected = computed(() => store.getters['manage/select/hasSelected']);

const isActive = computed(
  () => props.post && props.post.status === 'published',
);

const postStatusIcon = computed(() => {
  let icon;

  switch (props.post?.status) {
    case 'draft':
      icon = 'public_off';
      break;
    case 'published':
      icon = 'public';
      break;
  }

  return icon;
});

const onClickStatusButton = async () => {
  const status = props.post?.status === 'draft' ? 'published' : 'draft';

  try {
    await store.dispatch('post/edit/updatePost', {
      postId: props.post?.id,
      data: {
        status,
      },
    });
    store.commit('post/index/setPostItem', {
      id: props.post?.id,
      status,
    });

    if (hasSelected.value) {
      store.dispatch('manage/select/getSelectedPosts');
    }
  } catch (error: any) {
    store.dispatch('notification/pushMessage', {
      content: error.data.message,
    });
  }
};
</script>

<style scoped>
@import './styles/manage-post-status-action.css';
</style>
