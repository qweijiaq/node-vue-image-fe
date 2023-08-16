<template>
  <div class="post-create">
    <PostAuditAction
      v-if="postId"
      :post="{ id: postId, audit }"
      @change="onChangePostAuditAction"
    />
    <FileCreate @change="onChangeFileCreate" />
    <PostTitleField />
    <PostContentField />
    <PostTagField :postId="postId" v-if="postId" />
    <PostStatusField />
    <PostActions
      @update="submitUpdatePost"
      @create="submitCreatePost"
      @delete="onDeletePost"
      size="large"
      :useDeleteButton="postId ? true : false"
    />
    <PostMeta v-if="postCache" :post="postCache" />
  </div>
</template>

<script lang="ts" setup>
import { computed, watch, ref } from 'vue';
import store from '../../app/app.store';
import router from '../../app/app.router';
import { useRoute } from 'vue-router';
import PostTagField from '../components/post-tag-field.vue';
import PostTitleField from '../components/post-title-field.vue';
import PostContentField from '../components/post-content-field.vue';
import PostActions from '../components/post-actions.vue';
import PostMeta from '../components/post-meta.vue';
import FileCreate from '../../file/create/file-create.vue';
import PostStatusField from '../components/post-status-field.vue';
import PostAuditAction from '../components/post-audit-action.vue';
import { getImageBase64 } from '../../file/file.service';

const title = computed(() => store.getters['post/create/title']);
const content = computed(() => store.getters['post/create/content']);
const postId = computed(() => store.getters['post/create/postId']);
const post = computed(() => store.getters['post/show/post']);

const route = useRoute();

const status = computed(() => store.getters['post/create/status']);

const audit = computed(() => store.getters['post/create/audit']);

const getPost = async (_postId: any) => {
  try {
    await store.dispatch('post/show/getPostById', _postId);
    const { title, content, tags, file, status, audit } = post.value;
    store.commit('post/create/setPostId', _postId);
    store.commit('post/create/setTitle', title);
    store.commit('post/create/setContent', content);
    store.commit('post/edit/setTags', tags);
    store.commit('post/create/setStatus', status);
    store.commit('post/create/setAudit', audit);
    if (file) {
      const imageData = await getImageBase64(file.size.large);
      // store.commit('file/create/setSelectedFile');
      store.commit('file/create/setPreviewImage', imageData);
    }
  } catch (error: any) {
    store.dispatch('notification/pushMessage', {
      content: error.data.message,
    });
  }
};

const { post: post_id } = route.query;

const postCache = ref(null);

if (post_id) {
  getPost(parseInt(post_id as string, 10));
}

const reset = () => {
  store.commit('post/create/setPostId', null);
  store.commit('post/create/setTitle', '');
  store.commit('post/create/setContent', '');
  store.commit('post/edit/setTags', null);
  store.commit('post/create/setUnsaved', false);
  store.commit('file/create/setSelectedFile', null);
  store.commit('file/create/setPreviewImage', null);
  postCache.value = null;
  store.commit('post/create/setStatus', null);
  store.commit('post/create/setAudit', null);
};

watch(
  () => postCache.value,
  (newValue) => {
    if (newValue) {
      postCache.value = newValue;
    }
  },
);

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

const selectedFile = computed(() => store.getters['file/create/selectedFile']);

const isLogin = computed(() => store.getters['auth/isLogin']);

const submitCreatePost = async () => {
  if (!isLogin.value) {
    store.dispatch('notification/pushMessage', {
      content: '请先登录',
    });
  }

  try {
    const _status = status.value ? status.value : 'draft';

    await store.dispatch('post/create/createPost', {
      data: {
        title: title.value,
        content: content.value,
        status: _status,
      },
      file: selectedFile.value,
    });
    // postId.value = response.data.insertId;
    router.push({
      name: 'postCreate',
      query: {
        post: postId.value,
      },
    });
    store.commit('post/create/setUnsaved', false);
    getPost(postId.value);
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
    const _status = status.value ? status.value : 'draft';

    store.dispatch('post/edit/updatePost', {
      postId: postId.value,
      data: {
        title: title.value,
        content: content.value,
        status: _status,
      },
    });
    store.commit('post/create/setUnsaved', false);
    getPost(postId.value);
    store.dispatch('notification/pushMessage', {
      content: '更新内容成功',
    });
  } catch (error: any) {
    store.dispatch('notification/pushMessage', {
      content: error.data.message,
    });
  }
};

const onDeletePost = async () => {
  try {
    await store.dispatch('post/destroy/deletePost', { postId: postId.value });
    router.push({
      name: 'postCreate',
    });
  } catch (error: any) {
    store.dispatch('notification/pushMessage', {
      content: error.data.message,
    });
  }
};

const submitCreateFile = async () => {
  if (!isLogin.value) {
    store.dispatch('notification/pushMessage', {
      content: '请先登录',
    });
  }

  try {
    await store.dispatch('file/create/createFile', {
      postId: postId.value,
      file: selectedFile.value,
    });
  } catch (error: any) {
    store.dispatch('notification/pushMessage', {
      content: error.data.message,
    });
  }
};

const onChangeFileCreate = (files: any) => {
  const file = files[0];
  if (!file) return;

  if (!title.value) {
    store.commit('post/create/setTitle', file.name.split('.')[0]);
  }

  if (postId.value) {
    submitCreateFile();
  } else {
    submitCreatePost();
  }
};

const onChangePostAuditAction = (audit: string) => {
  store.commit('post/create/setAudit', audit);
};
</script>

<style scoped>
@import './styles/post-create.css';
</style>
