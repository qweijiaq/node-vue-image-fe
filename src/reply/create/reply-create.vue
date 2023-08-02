<template>
  <div class="reply-create">
    <div class="small"><UserAvatar :user="currentUser" /></div>
    <div class="content">
      <TextField
        placeholder="回复评论"
        v-model="content"
        @keydown="onKeyDownReplyTextarea"
      />
      <div class="actions">
        <button class="button pill" @click="onClickCancelBtn">取消</button>
        <button class="button pill" @click="onClickReplyBtn">回复</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import store from '../../app/app.store';
import UserAvatar from '../../user/components/user-avatar.vue';
import TextField from '../../app/components/text-field.vue';

const props = defineProps({
  comment: {
    type: Object,
  },
  showReplies: {
    type: Boolean,
  },
});

const emits = defineEmits(['replied']);

const content = ref('');

const currentUser = computed(() => store.getters['user/currentUser']);

const submitReply = async () => {
  if (!content.value.trim()) return;
  try {
    await store.dispatch('reply/create/createReply', {
      commentId: props.comment.id,
      post_id: props.comment.post.id,
      content: content.value,
    });
    content.value = '';
    emits('replied', props.comment.id);
    store.commit('comment/index/increaseTotalReplies', props.comment.id);
    if (props.showReplies) {
      store.dispatch('reply/index/getReplies', props.comment.id);
    }
  } catch (error: any) {
    store.dispatch('notification/pushMessage', { content: error.data.message });
  }
};

const onClickCancelBtn = () => {
  content.value = '';
};

const onClickReplyBtn = () => {
  submitReply();
};

const onKeyDownReplyTextarea = (event) => {
  if (
    (event.ctrlKey && event.key === 'Enter') ||
    (event.metaKey && event.key === 'Enter')
  ) {
    submitReply();
  }
};
</script>

<style scoped>
@import './styles/reply-create.css';
</style>
