<template>
  <div class="post-tag-field">
    <div class="content">
      <TextField
        placeholder="标签"
        v-model="name"
        @keyup.enter="onKeyUpEnterTag"
      />
      <button class="button basic" @click="onClickAddButton">
        <AppIcon name="add" />
      </button>
    </div>
    <div class="meta" v-if="tags">
      <transition-group name="post-tag">
        <PostTag
          v-for="tag in tags"
          :key="tag.id"
          :tag="tag"
          useDeleteButton
          @delete="onDeletePostTag"
        />
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import store from '../../app/app.store';
import TextField from '../../app/components/text-field.vue';
import AppIcon from '../../app/components/app-icon.vue';
import PostTag from './post-tag.vue';

const props = defineProps({
  postId: {
    type: Number,
  },
});

const name = ref('');

const tags = computed(() => store.getters['post/edit/tags']);

const submitCreatePostTag = async () => {
  if (!name.value) return;

  try {
    await store.dispatch('post/edit/createPostTag', {
      postId: props.postId,
      data: {
        name: name.value,
      },
    });
    name.value = '';
  } catch (error: any) {
    store.dispatch('notification/pushMessage', {
      content: error.data.message,
    });
  }
};

const onClickAddButton = () => {
  submitCreatePostTag();
};

const onKeyUpEnterTag = () => {
  submitCreatePostTag();
};

const onDeletePostTag = async (tagId: number) => {
  try {
    await store.dispatch('post/edit/deletePostTag', {
      postId: props.postId,
      tag_id: tagId,
    });
  } catch (error: any) {
    store.dispatch('notification/pushMessage', {
      content: error.data.message,
    });
  }
};
</script>

<style scoped>
@import './styles/post-tag-field.css';
</style>
