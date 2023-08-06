PostTagField,
<template>
  <div class="post-create">
    <TextField placeholder="标题" v-model="title" />
    <TextareaField
      placeholder="描述"
      class="bordered"
      :rows="1"
      v-model="content"
    />
    <PostTagField :postId="parseInt(postId!, 10)" />
    <button class="button large" @click="onClickSubmitButton">
      {{ submitButtonText }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import store from '../../app/app.store';
import router from '../../app/app.router';
import { useRoute } from 'vue-router';
import TextField from '../../app/components/text-field.vue';
import TextareaField from '../../app/components/textarea-field.vue';
import PostTagField from '../components/post-tag-field.vue';

const title = ref('');
const content = ref('');
const postId = ref(null);

const route = useRoute();

const getPost = async (_postId: any) => {
  try {
    const response = await store.dispatch('post/show/getPostById', _postId);
    const { title: _title, content: _content, tags } = response.data;
    title.value = _title;
    content.value = _content;
    postId.value = _postId;
    store.commit('post/edit/setTags', tags);
  } catch (error: any) {
    store.dispatch('notification/pushMessage', {
      content: error.data.message,
    });
  }
};

const { post: post_id } = route.query;

if (post_id) {
  getPost(post_id);
}

const reset = () => {
  title.value = '';
  content.value = '';
  postId.value = null;
};

watch(
  () => router.currentRoute.value,
  (to) => {
    const { post: postId } = to.query;
    if (postId) {
      getPost(postId);
    } else {
      reset();
    }
  },
  { immediate: true, deep: true },
);

const submitButtonText = computed(() => (post_id ? '更新' : '发布'));

const submitCreatePost = async () => {
  try {
    const response = await store.dispatch('post/create/createPost', {
      data: {
        title: title.value,
        content: content.value,
      },
    });
    postId.value = response.data.insertId;
    router.push({
      name: 'postCreate',
      query: {
        post: postId.value,
      },
    });
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
    store.dispatch('notification/pushMessage', {
      content: '更新内容成功',
    });
  } catch (error: any) {
    store.dispatch('notification/pushMessage', {
      content: error.data.message,
    });
  }
};

const onClickSubmitButton = () => {
  if (!title.value.trim()) return;
  if (post_id) {
    submitUpdatePost();
  } else {
    submitCreatePost();
  }
};
</script>

<style scoped>
@import './styles/post-create.css';
</style>
