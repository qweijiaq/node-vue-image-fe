<template>
  <div class="manage-post-status-action">
    <button class="button basic circle" @click.stop="onClickStatusButton">
      <AppIcon color="#fff" size="16" :name="postStatusIcon" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import store from '../../../app/app.store';
import AppIcon from '../../../app/components/app-icon.vue';

const props = defineProps({
  post: {
    type: Object,
  },
});

const hasSelected = computed(() => store.getters['manage/select/hasSelected']);

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
