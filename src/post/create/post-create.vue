PostActions, PostContentField, PostTitleField, PostTagField,
<template>
  <div class="post-create">
    <PostTitleField />
    <PostContentField />
    <PostTagField :postId="postId" v-if="postId" />
    <PostActions
      @update="submitUpdatePost"
      @create="submitCreatePost"
      size="large"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue';
import store from '../../app/app.store';
import router from '../../app/app.router';
import { useRoute } from 'vue-router';
import PostTagField from '../components/post-tag-field.vue';
import PostTitleField from '../components/post-title-field.vue';
import PostContentField from '../components/post-content-field.vue';
import PostActions from '../components/post-actions.vue';

const title = computed(() => store.getters['post/create/title']);
const content = computed(() => store.getters['post/create/content']);
const postId = computed(() => store.getters['post/create/postId']);
const post = computed(() => store.getters['post/show/post']);

const route = useRoute();

const getPost = async (_postId: any) => {
  try {
    await store.dispatch('post/show/getPostById', _postId);
    const { title, content, tags } = post.value;
    store.commit('post/create/setPostId', _postId);
    store.commit('post/create/setTitle', title);
    store.commit('post/create/setContent', content);
    store.commit('post/edit/setTags', tags);
  } catch (error: any) {
    store.dispatch('notification/pushMessage', {
      content: error.data.message,
    });
  }
};

const { post: post_id } = route.query;

if (post_id) {
  getPost(parseInt(post_id as string, 10));
}

const reset = () => {
  store.commit('post/create/setPostId', null);
  store.commit('post/create/setTitle', '');
  store.commit('post/create/setContent', '');
  store.commit('post/edit/setTags', null);
  store.commit('post/create/setUnsaved', false);
};

watch(
  () => router.currentRoute.value,
  (to) => {
    const { post: postId } = to.query;
    if (postId) {
      getPost(parseInt(postId as string, 10));
    } else {
      reset();
    }
  },
  { immediate: true, deep: true },
);

const submitCreatePost = async () => {
  try {
    await store.dispatch('post/create/createPost', {
      data: {
        title: title.value,
        content: content.value,
      },
    });
    // postId.value = response.data.insertId;
    router.push({
      name: 'postCreate',
      query: {
        post: postId.value,
      },
    });
    store.commit('post/create/setUnsaved', false);
    store.dispatch('notification/pushMessage', {
      content: '发布内容成功',
    });
  } catch (error: any) {
    store.dispatch('notification/pushMessage', {
      content: error.data.message,
    });
  }
};

const submitUpdatePost = () => {
  try {
    store.dispatch('post/edit/updatePost', {
      postId: postId.value,
      data: {
        title: title.value,
        content: content.value,
      },
    });
    store.commit('post/create/setUnsaved', false);
    store.dispatch('notification/pushMessage', {
      content: '更新内容成功',
    });
  } catch (error: any) {
    store.dispatch('notification/pushMessage', {
      content: error.data.message,
    });
  }
};
</script>

<style scoped>
@import './styles/post-create.css';
</style>
