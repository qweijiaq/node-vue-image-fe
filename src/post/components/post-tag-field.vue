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
    <div class="meta" v-if="hasTags">
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
import { Post } from '../show/post-show.store';

const props = defineProps({
  postId: {
    type: Number,
  },
  posts: {
    type: Array<Post>,
  },
});

const emits = defineEmits(['updated']);

const name = ref('');

const tags = computed(() => store.getters['post/edit/tags']);

const hasTags = computed(() => store.getters['post/edit/hasTags']);

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

const batchCreatePostTag = async () => {
  for (const post of props.posts!) {
    if (
      post.file.tags &&
      post.file.tags.some((tag) => tag.name === name.value.trim())
    )
      continue;

    try {
      await store.dispatch('post/edit/createPostTag', {
        postId: post.id,
        data: {
          name: name.value,
        },
      });
    } catch (error) {
      continue;
    }
  }
  emits('updated');
  name.value = '';
};

const onClickAddButton = () => {
  if (props.posts) {
    batchCreatePostTag();
  } else {
    submitCreatePostTag();
  }
};

const onKeyUpEnterTag = () => {
  if (props.posts) {
    batchCreatePostTag();
  } else {
    submitCreatePostTag();
  }
};

const submitDeletePostTag = async (tagId: number) => {
  try {
    await store.dispatch('post/edit/deletePostTag', {
      postId: props.postId,
      tagId: tagId,
    });
  } catch (error: any) {
    store.dispatch('notification/pushMessage', {
      content: error.data.message,
    });
  }
};

const batchDeletePostTag = async (tagId: number) => {
  for (const post of props.posts) {
    if (post.file.tags && !post.file.tags.some((tag) => tag.id == tagId))
      continue;

    try {
      await store.dispatch('post/edit/deletePostTag', {
        postId: post.id,
        tagId: tagId,
      });
    } catch (error) {
      continue;
    }
  }

  emits('updated');
  name.value = '';
};

const onDeletePostTag = async (tagId: number) => {
  if (props.posts) {
    batchDeletePostTag(tagId);
  } else {
    submitDeletePostTag(tagId);
  }
};
</script>

<style scoped>
@import './styles/post-tag-field.css';
</style>
