<template>
  <div class="comment-create">
    <div class="small">
      <UserAvatar :user="currentUser" link="login" />
    </div>
    <div class="content">
      <TextareaField
        placeholder="发表评论"
        v-model="content"
        @keyup.stop
        @keydown.stop="onKeyDownCommentTextarea"
      />
      <div class="actions">
        <button
          class="button pill"
          v-if="currentUser"
          @click="onClickCancelButton"
        >
          取消
        </button>
        <button
          class="button pill"
          v-if="currentUser"
          @click="onClickSubmitButton"
        >
          发布
        </button>
        <button
          class="button pill"
          v-if="!currentUser"
          @click="onClickRegisterButton"
        >
          注册
        </button>
        <button
          class="button pill"
          v-if="!currentUser"
          @click="onClickLoginButton"
        >
          登录
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import TextareaField from '@/app/components/textarea-field.vue';
import UserAvatar from '@/user/components/user-avatar.vue';

const store = useStore();
const router = useRouter();

const content = ref('');

const currentUser = computed(() => store.getters['user/currentUser']);
const sideSheetProps = computed(() => store.getters['layout/sideSheetProps']);

const submitComment = async () => {
  if (!content.value.trim()) return;
  if (!currentUser.value) {
    store.dispatch('notification/pushMessage', { content: '请先登录' });
    return;
  }

  try {
    await store.dispatch('comment/create/createComment', {
      postId: sideSheetProps.value.filter.post,
      content: content.value,
    });
    content.value = '';
  } catch (error: any) {
    store.dispatch('notification/pushMessage', {
      content: error,
    });
  }
};

const onClickCancelButton = () => {
  content.value = '';
};

const onClickSubmitButton = () => {
  submitComment();
};

const onClickRegisterButton = () => {
  router.push({ name: 'login' });
};

const onClickLoginButton = () => {
  router.push({ name: 'login' });
};

const onKeyDownCommentTextarea = (event: any) => {
  if (
    (event.ctrlKey && event.key === 'Enter') ||
    (event.metaKey && event.key === 'Enter')
  ) {
    submitComment();
  }
};
</script>

<style scoped>
@import './styles/comment-create.css';
</style>
